/**
 * POST /api/career
 * Delivers job application + resume to company inbox and thank-you to candidate.
 */

import { validateCareerPayload } from '../src/lib/validateCareer.js'
import {
  deliverCareerEmails,
  getMailConfig,
  isPrimaryMailConfigured,
} from './lib/mailer.js'

const RATE_WINDOW_MS = 15 * 60 * 1000
const RATE_MAX = 6
const rateMap = new Map()
const REAL_DELIVERY = new Set(['gmail', 'smtp', 'api'])

function json(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.end(JSON.stringify(body))
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length) {
    return forwarded.split(',')[0].trim()
  }
  return req.socket?.remoteAddress || 'unknown'
}

function allowRequest(ip) {
  const now = Date.now()
  const entry = rateMap.get(ip) || { count: 0, start: now }
  if (now - entry.start > RATE_WINDOW_MS) {
    rateMap.set(ip, { count: 1, start: now })
    return true
  }
  if (entry.count >= RATE_MAX) return false
  entry.count += 1
  rateMap.set(ip, entry)
  return true
}

async function readJsonBody(req) {
  const contentLength = Number(req.headers['content-length'] || 0)
  // Base64 expands files; reject oversized bodies early
  if (contentLength > 5.5 * 1024 * 1024) {
    const err = new Error('PAYLOAD_TOO_LARGE')
    err.code = 'PAYLOAD_TOO_LARGE'
    throw err
  }

  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body
  }

  const chunks = []
  let total = 0
  for await (const chunk of req) {
    total += chunk.length
    if (total > 5.5 * 1024 * 1024) {
      const err = new Error('PAYLOAD_TOO_LARGE')
      err.code = 'PAYLOAD_TOO_LARGE'
      throw err
    }
    chunks.push(chunk)
  }
  const raw = Buffer.concat(chunks).toString('utf8').trim()
  if (!raw) return {}
  return JSON.parse(raw)
}

function shouldDropAsBot(body = {}) {
  const honeypotFilled = [body.ax_hp_token, body.website_url, body.fax_number].some(
    (value) => String(value || '').trim().length > 0,
  )
  const openedAt = Number(body.form_opened_at) || 0
  const elapsed = openedAt > 0 ? Date.now() - openedAt : null

  if (elapsed != null && elapsed >= 0 && elapsed < 1200) return true
  if (honeypotFilled) {
    if (elapsed == null || elapsed < 4000) return true
    return false
  }
  return false
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Origin', '*')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.method === 'GET') {
    const config = getMailConfig()
    const primary = isPrimaryMailConfigured(config)
    json(res, 200, {
      ok: true,
      service: 'axevro-career',
      mailReady: primary,
      primaryTransport: primary,
      inbox: config.inbox,
    })
    return
  }

  if (req.method !== 'POST') {
    json(res, 405, { ok: false, error: 'Method not allowed.' })
    return
  }

  if (!allowRequest(getClientIp(req))) {
    json(res, 429, {
      ok: false,
      error: 'Too many requests. Please wait a few minutes and try again.',
    })
    return
  }

  let body
  try {
    body = await readJsonBody(req)
  } catch (error) {
    if (error?.code === 'PAYLOAD_TOO_LARGE') {
      json(res, 413, {
        ok: false,
        error: 'Please fix the highlighted fields.',
        errors: { resume: 'Resume must be under 3 MB.' },
      })
      return
    }
    json(res, 400, { ok: false, error: 'Invalid request body.' })
    return
  }

  if (shouldDropAsBot(body)) {
    json(res, 200, {
      ok: true,
      delivered: false,
      message: 'Accepted.',
    })
    return
  }

  const validated = validateCareerPayload(body)
  if (!validated.ok) {
    json(res, 400, {
      ok: false,
      error: 'Please fix the highlighted fields.',
      errors: validated.errors,
    })
    return
  }

  const config = getMailConfig()
  if (!isPrimaryMailConfigured(config)) {
    json(res, 503, {
      ok: false,
      delivered: false,
      error:
        'Applications are temporarily unavailable by form. Please email axevro9@gmail.com with your resume.',
    })
    return
  }

  try {
    const delivery = await deliverCareerEmails(validated.value)

    if (!REAL_DELIVERY.has(delivery.inboxVia)) {
      json(res, 502, {
        ok: false,
        delivered: false,
        error:
          'We could not confirm delivery. Please email axevro9@gmail.com with your resume.',
      })
      return
    }

    json(res, 200, {
      ok: true,
      delivered: true,
      message:
        'Thank you — we will connect with you shortly.',
      meta: {
        inboxVia: delivery.inboxVia,
        replyVia: delivery.replyVia,
        replySent: Boolean(delivery.replyId),
      },
    })
  } catch (error) {
    const detail =
      process.env.NODE_ENV === 'development' || process.env.AXEVRO_DEBUG_MAIL === '1'
        ? error?.message
        : undefined

    json(res, 502, {
      ok: false,
      delivered: false,
      error:
        'We could not submit your application right now. Please email axevro9@gmail.com with your resume.',
      ...(detail ? { detail } : {}),
    })
  }
}
