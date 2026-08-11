/**
 * POST /api/contact
 * Delivers inquiry to company inbox + thank-you to visitor.
 * Works locally with .env.local and on Vercel with env vars,
 * with a production-safe fallback when secrets are not set yet.
 */

import { validateContactPayload } from '../src/lib/validateContact.js'
import {
  deliverContactEmails,
  getMailConfig,
  isPrimaryMailConfigured,
} from './lib/mailer.js'

const RATE_WINDOW_MS = 15 * 60 * 1000
const RATE_MAX = 8
const rateMap = new Map()

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
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body
  }

  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const raw = Buffer.concat(chunks).toString('utf8').trim()
  if (!raw) return {}
  return JSON.parse(raw)
}

function isBotSubmission(body = {}) {
  const traps = [body.ax_hp_token, body.website_url, body.fax_number]
  return traps.some((value) => String(value || '').trim().length > 0)
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
    json(res, 200, {
      ok: true,
      service: 'axevro-contact',
      mailReady: true,
      primaryTransport: isPrimaryMailConfigured(config),
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
  } catch {
    json(res, 400, { ok: false, error: 'Invalid request body.' })
    return
  }

  if (isBotSubmission(body)) {
    json(res, 200, {
      ok: true,
      delivered: true,
      message: 'Message delivered to Axevro. We will get back to you shortly.',
    })
    return
  }

  const validated = validateContactPayload(body)
  if (!validated.ok) {
    json(res, 400, {
      ok: false,
      error: 'Please fix the highlighted fields.',
      errors: validated.errors,
    })
    return
  }

  try {
    const delivery = await deliverContactEmails(validated.value)

    json(res, 200, {
      ok: true,
      delivered: true,
      message: 'Message delivered to Axevro. We will get back to you shortly.',
      meta: {
        inboxVia: delivery.inboxVia,
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
      error:
        'We could not deliver your message right now. Please email axevro9@gmail.com or try again shortly.',
      ...(detail ? { detail } : {}),
    })
  }
}
