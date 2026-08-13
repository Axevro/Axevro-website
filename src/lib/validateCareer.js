import {
  validateEmail,
  validateName,
  validatePhone,
} from './validateContact.js'
import { getCareerRoleById } from '../data/careers.js'

// Keep under ~3MB so JSON+base64 stays within Vercel serverless body limits (~4.5MB)
const MAX_RESUME_BYTES = 3 * 1024 * 1024
const MIN_RESUME_BYTES = 8 * 1024
const ALLOWED_RESUME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])
const ALLOWED_RESUME_EXT = new Set(['.pdf', '.doc', '.docx'])

const DUMMY_NOTE_PHRASES = new Set([
  'test',
  'testing',
  'dummy',
  'asdf',
  'qwerty',
  'xxx',
  'hello',
  'hi',
  'hey',
  'abc',
  'sample',
  'demo',
])

const DUMMY_FILENAMES = new Set([
  'test',
  'testing',
  'dummy',
  'sample',
  'fake',
  'asdf',
  'untitled',
  'document1',
  'newdocument',
])

function looksLikeGibberish(text = '') {
  const cleaned = String(text)
    .toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (!cleaned) return true

  const words = cleaned.split(' ').filter(Boolean)
  if (!words.length) return true

  let suspicious = 0
  for (const word of words) {
    if (word.length <= 2) continue
    const vowels = (word.match(/[aeiou]/g) || []).length
    const vowelRatio = vowels / word.length
    const uniqueRatio = new Set(word).size / word.length
    const onlyConsonants = /^[bcdfghjklmnpqrstvwxyz]+$/.test(word)
    if (word.length >= 5 && vowelRatio < 0.18) suspicious += 1
    else if (word.length >= 6 && onlyConsonants) suspicious += 1
    else if (word.length >= 8 && uniqueRatio <= 0.4) suspicious += 1
  }

  const scored = words.filter((w) => w.length > 2)
  if (!scored.length) return true
  return suspicious / scored.length >= 0.55
}

function getExtension(filename = '') {
  const lower = String(filename).trim().toLowerCase()
  const dot = lower.lastIndexOf('.')
  if (dot <= 0 || dot === lower.length - 1) return ''
  return lower.slice(dot)
}

function isDummyFilename(filename = '') {
  const lower = String(filename).trim().toLowerCase()
  const ext = getExtension(lower)
  const base = lower.replace(ext, '').replace(/[^a-z0-9]/g, '')
  if (!base) return true
  if (DUMMY_FILENAMES.has(base)) return true
  return /^(test|dummy|fake|sample|asdf)/i.test(base)
}

function isValidBase64(value = '') {
  if (!value || value.length < 32) return false
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(value)) return false
  if (value.length % 4 !== 0) return false
  return true
}

/**
 * Verify file signatures so renamed images/exe are rejected.
 * Works in browser and Node.
 */
export function looksLikeValidResumeContent(ext, contentBase64) {
  try {
    if (typeof atob === 'function') {
      const binary = atob(contentBase64.slice(0, 64))
      if (ext === '.pdf') return binary.startsWith('%PDF')
      if (ext === '.docx') return binary.startsWith('PK')
      if (ext === '.doc') {
        const codes = [binary.charCodeAt(0), binary.charCodeAt(1), binary.charCodeAt(2), binary.charCodeAt(3)]
        return codes[0] === 0xd0 && codes[1] === 0xcf && codes[2] === 0x11 && codes[3] === 0xe0
      }
      return false
    }

    const head = Buffer.from(contentBase64.slice(0, 64), 'base64')
    if (ext === '.pdf') return head.slice(0, 4).toString('utf8') === '%PDF'
    if (ext === '.docx') return head.slice(0, 2).toString('utf8') === 'PK'
    if (ext === '.doc') {
      return (
        head[0] === 0xd0 &&
        head[1] === 0xcf &&
        head[2] === 0x11 &&
        head[3] === 0xe0
      )
    }
    return false
  } catch {
    return false
  }
}

export function validateRole(raw = '') {
  const roleId = String(raw || '').trim()
  if (!roleId) return { ok: false, error: 'Please select a role.' }
  const role = getCareerRoleById(roleId)
  if (!role) return { ok: false, error: 'Please select a valid role.' }
  return { ok: true, value: roleId, label: role.title }
}

export function validateCoverNote(raw = '') {
  const note = String(raw || '').trim().replace(/\s+/g, ' ')
  if (!note) {
    return {
      ok: false,
      error: 'Please add a short note about yourself or why you want to join.',
    }
  }
  if (note.length < 15) {
    return {
      ok: false,
      error: 'Please write a clearer note (at least ~15 characters).',
    }
  }
  if (note.length > 1500) return { ok: false, error: 'Note is too long (max 1500 characters).' }

  const lower = note.toLowerCase()
  if (DUMMY_NOTE_PHRASES.has(lower) || /^(test|testing|dummy|asdf|qwerty|xxx)\b/i.test(note)) {
    return {
      ok: false,
      error: 'Please write a real note — test or dummy text is not accepted.',
    }
  }

  const words = note.split(/\s+/).filter(Boolean)
  if (words.length < 3) {
    return {
      ok: false,
      error: 'Please write a short note with at least a few words.',
    }
  }

  if (looksLikeGibberish(note)) {
    return {
      ok: false,
      error: 'That note looks like random typing. Please write in clear words.',
    }
  }

  return { ok: true, value: note }
}

export function validateResumeFileClient(file) {
  if (!(typeof File !== 'undefined' && file instanceof File)) {
    return { ok: false, error: 'Please upload your resume (PDF or Word).' }
  }

  const ext = getExtension(file.name)
  if (!ALLOWED_RESUME_EXT.has(ext)) {
    return { ok: false, error: 'Resume must be a PDF, DOC, or DOCX file.' }
  }
  if (file.size <= 0) {
    return { ok: false, error: 'Resume file looks empty. Please upload again.' }
  }
  if (file.size < MIN_RESUME_BYTES) {
    return {
      ok: false,
      error: 'Resume file looks too small. Please upload a complete resume.',
    }
  }
  if (file.size > MAX_RESUME_BYTES) {
    return { ok: false, error: 'Resume must be under 3 MB.' }
  }
  if (isDummyFilename(file.name)) {
    return {
      ok: false,
      error: 'Please upload your real resume file (not a test/dummy filename).',
    }
  }

  const mime = String(file.type || '').toLowerCase()
  if (mime && !ALLOWED_RESUME_TYPES.has(mime) && mime !== 'application/octet-stream') {
    return { ok: false, error: 'Unsupported resume file type. Use PDF or Word.' }
  }

  return { ok: true, value: file }
}

export function validateResumeMeta(resume = {}) {
  const filename = String(resume.filename || '').trim()
  const mimeType = String(resume.mimeType || '').trim().toLowerCase()
  const contentBase64 = String(resume.contentBase64 || '').replace(/\s+/g, '')
  const size = Number(resume.size) || 0

  if (!filename || !contentBase64) {
    return { ok: false, error: 'Please upload your resume (PDF or Word).' }
  }

  const ext = getExtension(filename)
  if (!ALLOWED_RESUME_EXT.has(ext)) {
    return { ok: false, error: 'Resume must be a PDF, DOC, or DOCX file.' }
  }

  if (isDummyFilename(filename)) {
    return {
      ok: false,
      error: 'Please upload your real resume file (not a test/dummy filename).',
    }
  }

  if (mimeType && !ALLOWED_RESUME_TYPES.has(mimeType) && mimeType !== 'application/octet-stream') {
    return { ok: false, error: 'Unsupported resume file type. Use PDF or Word.' }
  }

  if (!isValidBase64(contentBase64)) {
    return { ok: false, error: 'Resume data looks corrupted. Please upload the file again.' }
  }

  const approxBytes = Math.floor((contentBase64.length * 3) / 4)
  const bytes = size > 0 ? size : approxBytes
  if (bytes <= 0) {
    return { ok: false, error: 'Resume file looks empty. Please upload again.' }
  }
  if (bytes > MAX_RESUME_BYTES) {
    return { ok: false, error: 'Resume must be under 3 MB.' }
  }
  if (bytes < MIN_RESUME_BYTES) {
    return {
      ok: false,
      error: 'Resume file looks too small. Please upload a complete resume.',
    }
  }

  // Guard against clients lying about size while sending a huge payload
  if (approxBytes > MAX_RESUME_BYTES + 64 * 1024) {
    return { ok: false, error: 'Resume must be under 3 MB.' }
  }

  if (!looksLikeValidResumeContent(ext, contentBase64)) {
    return {
      ok: false,
      error:
        'That file does not look like a valid PDF/Word resume. Please upload a real resume.',
    }
  }

  const safeName = filename
    .replace(/[^\w.\- ()[\]]+/g, '_')
    .replace(/\s+/g, ' ')
    .slice(0, 120)

  const resolvedMime =
    mimeType && ALLOWED_RESUME_TYPES.has(mimeType)
      ? mimeType
      : ext === '.pdf'
        ? 'application/pdf'
        : ext === '.doc'
          ? 'application/msword'
          : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

  return {
    ok: true,
    value: {
      filename: safeName || `resume${ext}`,
      mimeType: resolvedMime,
      contentBase64,
      size: bytes,
    },
  }
}

/**
 * Validate career application fields (client + server).
 */
export function validateCareerPayload(input = {}, options = {}) {
  const name = validateName(input.name)
  const email = validateEmail(input.email)
  const phone = validatePhone(input.phone)
  const role = validateRole(input.role)
  const note = validateCoverNote(input.note)

  const errors = {}
  if (!name.ok) errors.name = name.error
  if (!email.ok) errors.email = email.error
  if (!phone.ok) errors.phone = phone.error
  if (!role.ok) errors.role = role.error
  if (!note.ok) errors.note = note.error

  let resumeValue = null
  if (typeof File !== 'undefined' && options.resumeFile instanceof File) {
    const fileCheck = validateResumeFileClient(options.resumeFile)
    if (!fileCheck.ok) errors.resume = fileCheck.error
  } else {
    const resume = validateResumeMeta(input.resume || {})
    if (!resume.ok) errors.resume = resume.error
    else resumeValue = resume.value
  }

  if (Object.keys(errors).length) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    value: {
      name: name.value,
      email: email.value,
      phone: phone.value,
      role: role.value,
      roleLabel: role.label,
      note: note.value,
      ...(resumeValue ? { resume: resumeValue } : {}),
    },
  }
}

export const CAREER_RESUME_MAX_BYTES = MAX_RESUME_BYTES
export const CAREER_RESUME_ACCEPT = '.pdf,.doc,.docx,application/pdf'
