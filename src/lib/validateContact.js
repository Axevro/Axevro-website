/**
 * Contact-form validation (client + server).
 * Blocks empty/malformed and obvious disposable/fake values —
 * without rejecting normal real-world emails.
 */

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  'guerrillamail.net',
  '10minutemail.com',
  'tempmail.com',
  'temp-mail.org',
  'throwawaymail.com',
  'yopmail.com',
  'sharklasers.com',
  'trashmail.com',
  'fakeinbox.com',
  'getnada.com',
  'maildrop.cc',
  'dispostable.com',
])

const BLOCKED_DOMAINS = new Set([
  'example.com',
  'example.org',
  'example.net',
  'test.com',
  'invalid',
  'localhost',
])

const FAKE_LOCALS = new Set([
  'test',
  'testing',
  'dummy',
  'fake',
  'sample',
  'asdf',
  'asdfgh',
  'qwerty',
  'abc',
  'abcd',
  'xxx',
  'xyz',
])

const DUMMY_PHONES = new Set([
  '0000000000',
  '1111111111',
  '2222222222',
  '3333333333',
  '4444444444',
  '5555555555',
  '6666666666',
  '7777777777',
  '8888888888',
  '9999999999',
  '1234567890',
  '0123456789',
  '9876543210',
])

function digitsOnly(raw = '') {
  return String(raw).replace(/\D/g, '')
}

function hasMostlyRepeatedChars(value, threshold = 0.85) {
  if (!value || value.length < 5) return false
  const counts = {}
  for (const ch of value) counts[ch] = (counts[ch] || 0) + 1
  const max = Math.max(...Object.values(counts))
  return max / value.length >= threshold
}

function isSequentialDigits(digits) {
  if (digits.length < 10) return false
  let asc = true
  let desc = true
  for (let i = 1; i < digits.length; i += 1) {
    const prev = Number(digits[i - 1])
    const curr = Number(digits[i])
    if (curr !== (prev + 1) % 10) asc = false
    if (curr !== (prev + 9) % 10) desc = false
  }
  return asc || desc
}

export function validateName(raw = '') {
  const name = String(raw).trim().replace(/\s+/g, ' ')
  if (!name) return { ok: false, error: 'Please enter your name.' }
  if (name.length < 2) return { ok: false, error: 'Please enter your full name.' }
  if (name.length > 80) return { ok: false, error: 'Name is too long.' }
  if (!/^[a-zA-Z][a-zA-Z .'-]*$/.test(name)) {
    return {
      ok: false,
      error: 'Name can only include letters and basic punctuation.',
    }
  }
  const lower = name.toLowerCase()
  if (['test', 'testing', 'dummy', 'asdf', 'qwerty', 'abc'].includes(lower)) {
    return { ok: false, error: 'Please enter your real name.' }
  }
  return { ok: true, value: name }
}

export function validateEmail(raw = '') {
  const email = String(raw).trim().toLowerCase()
  if (!email) return { ok: false, error: 'Please enter your email.' }
  if (email.length > 120) return { ok: false, error: 'Email is too long.' }

  const emailRe =
    /^[a-z0-9](?:[a-z0-9._%+-]{0,62}[a-z0-9])?@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z]{2,24})+$/
  if (!emailRe.test(email) || email.includes('..')) {
    return { ok: false, error: 'Enter a valid email address (example: name@gmail.com).' }
  }

  const [local, domain] = email.split('@')
  if (!local || !domain) {
    return { ok: false, error: 'Enter a valid email address.' }
  }

  if (FAKE_LOCALS.has(local)) {
    return {
      ok: false,
      error: 'That looks like a test email. Please use your real email address.',
    }
  }

  if (hasMostlyRepeatedChars(local.replace(/[._+-]/g, ''), 0.9)) {
    return {
      ok: false,
      error: 'That looks like a fake email. Please use your real email address.',
    }
  }

  const domainLower = domain.toLowerCase()
  if (DISPOSABLE_DOMAINS.has(domainLower) || BLOCKED_DOMAINS.has(domainLower)) {
    return {
      ok: false,
      error: 'Temporary/disposable emails are not accepted. Please use Gmail, Outlook, or your work email.',
    }
  }

  return { ok: true, value: email }
}

export function validatePhone(raw = '') {
  const original = String(raw).trim()
  if (!original) return { ok: false, error: 'Please enter your phone number.' }

  let digits = digitsOnly(original)
  if (!digits) return { ok: false, error: 'Enter a valid phone number.' }

  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)

  if (digits.length < 10 || digits.length > 15) {
    return { ok: false, error: 'Enter a valid phone number with 10–15 digits.' }
  }

  if (DUMMY_PHONES.has(digits) || isSequentialDigits(digits)) {
    return {
      ok: false,
      error: 'That phone number looks invalid. Please enter your real mobile number.',
    }
  }

  if (hasMostlyRepeatedChars(digits, 0.8)) {
    return {
      ok: false,
      error: 'That phone number looks invalid. Please enter your real mobile number.',
    }
  }

  if (digits.length === 10 && !/^[6-9]\d{9}$/.test(digits)) {
    return {
      ok: false,
      error: 'Enter a valid Indian mobile number starting with 6, 7, 8, or 9.',
    }
  }

  const formatted = digits.length === 10 ? `+91${digits}` : `+${digits}`
  return { ok: true, value: formatted, display: original }
}

export function validateSubject(raw = '') {
  const subject = String(raw).trim().replace(/\s+/g, ' ')
  if (!subject) return { ok: false, error: 'Please enter a subject.' }
  if (subject.length < 4) {
    return { ok: false, error: 'Please add a clearer subject (at least a few words).' }
  }
  if (subject.length > 160) return { ok: false, error: 'Subject is too long.' }
  if (/^(test|testing|asdf|qwerty|xxx|dummy)$/i.test(subject)) {
    return { ok: false, error: 'Please enter a real project subject.' }
  }
  if (looksLikeGibberish(subject)) {
    return {
      ok: false,
      error: 'Please enter a clear subject in plain language (not random characters).',
    }
  }
  return { ok: true, value: subject }
}

export function validateMessage(raw = '') {
  const message = String(raw).trim().replace(/\s+/g, ' ')
  if (!message) return { ok: false, error: 'Please tell us a bit about your project.' }
  if (message.length < 20) {
    return {
      ok: false,
      error: 'Please add a bit more detail (at least ~20 characters).',
    }
  }
  if (message.length > 2000) return { ok: false, error: 'Message is too long (max 2000 characters).' }
  if (/^(test|testing|asdf|qwerty|xxx|dummy)$/i.test(message)) {
    return { ok: false, error: 'Please describe your real project or question.' }
  }

  const words = message.split(/\s+/).filter(Boolean)
  if (words.length < 3) {
    return {
      ok: false,
      error: 'Please write a short message with at least a few words.',
    }
  }

  if (looksLikeGibberish(message)) {
    return {
      ok: false,
      error:
        'That message looks like random typing. Please describe your project in clear words.',
    }
  }

  return { ok: true, value: message }
}

/**
 * Detect keyboard-smash / nonsense text while allowing normal short English.
 */
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
    const repeatedRun = /([a-z])\1{3,}/.test(word)
    const alternatingJunk = /^(?:[^aeiou]{2,})+$/.test(word) && vowelRatio < 0.2

    if (repeatedRun) {
      suspicious += 1
      continue
    }
    if (word.length >= 5 && vowelRatio < 0.18) {
      suspicious += 1
      continue
    }
    if (word.length >= 6 && onlyConsonants) {
      suspicious += 1
      continue
    }
    if (word.length >= 8 && uniqueRatio <= 0.4) {
      suspicious += 1
      continue
    }
    if (word.length >= 7 && alternatingJunk) {
      suspicious += 1
    }
  }

  const scored = words.filter((w) => w.length > 2)
  if (!scored.length) return true
  return suspicious / scored.length >= 0.55
}

export function validateContactPayload(input = {}) {
  const name = validateName(input.name)
  const email = validateEmail(input.email)
  const phone = validatePhone(input.phone)
  const subject = validateSubject(input.subject)
  const message = validateMessage(input.message)

  const errors = {}
  if (!name.ok) errors.name = name.error
  if (!email.ok) errors.email = email.error
  if (!phone.ok) errors.phone = phone.error
  if (!subject.ok) errors.subject = subject.error
  if (!message.ok) errors.message = message.error

  if (Object.keys(errors).length) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    value: {
      name: name.value,
      email: email.value,
      phone: phone.value,
      subject: subject.value,
      message: message.value,
    },
  }
}
