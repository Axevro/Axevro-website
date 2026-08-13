import { CONTACT_EMAIL } from '../data/contact'
import {
  CAREER_RESUME_MAX_BYTES,
  looksLikeValidResumeContent,
  validateCareerPayload,
  validateResumeFileClient,
} from './validateCareer'

const REAL_DELIVERY = new Set(['gmail', 'smtp', 'api'])

function getExtension(filename = '') {
  const lower = String(filename).trim().toLowerCase()
  const dot = lower.lastIndexOf('.')
  if (dot <= 0 || dot === lower.length - 1) return ''
  return lower.slice(dot)
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result || '')
      const base64 = result.includes(',') ? result.split(',')[1] : result
      if (!base64) {
        reject(new Error('Could not read resume file.'))
        return
      }
      resolve(base64.replace(/\s+/g, ''))
    }
    reader.onerror = () => reject(new Error('Could not read resume file.'))
    reader.onabort = () => reject(new Error('Resume upload was cancelled.'))
    reader.readAsDataURL(file)
  })
}

export async function submitCareerApplication(rawForm, resumeFile) {
  const precheck = validateCareerPayload(rawForm, { resumeFile })
  if (!precheck.ok) {
    return {
      ok: false,
      errors: precheck.errors,
      error: 'Please fix the highlighted fields.',
    }
  }

  const fileCheck = validateResumeFileClient(resumeFile)
  if (!fileCheck.ok) {
    return {
      ok: false,
      errors: { resume: fileCheck.error },
      error: 'Please fix the highlighted fields.',
    }
  }

  let contentBase64
  try {
    contentBase64 = await readFileAsBase64(resumeFile)
  } catch {
    return {
      ok: false,
      errors: { resume: 'Could not read your resume. Please try another file.' },
      error: 'Please fix the highlighted fields.',
    }
  }

  const ext = getExtension(resumeFile.name)
  if (!looksLikeValidResumeContent(ext, contentBase64)) {
    return {
      ok: false,
      errors: {
        resume:
          'That file does not look like a valid PDF/Word resume. Please upload a real resume.',
      },
      error: 'Please fix the highlighted fields.',
    }
  }

  // Final encoded-size guard before network upload
  const approxBytes = Math.floor((contentBase64.length * 3) / 4)
  if (approxBytes > CAREER_RESUME_MAX_BYTES) {
    return {
      ok: false,
      errors: { resume: 'Resume must be under 3 MB.' },
      error: 'Please fix the highlighted fields.',
    }
  }

  const payload = {
    name: precheck.value.name,
    email: precheck.value.email,
    phone: precheck.value.phone,
    role: precheck.value.role,
    note: precheck.value.note,
    ax_hp_token: String(rawForm.ax_hp_token || '').trim(),
    form_opened_at: Number(rawForm.form_opened_at) || Date.now(),
    resume: {
      filename: resumeFile.name,
      mimeType: resumeFile.type || 'application/octet-stream',
      contentBase64,
      size: resumeFile.size,
    },
  }

  try {
    const response = await fetch('/api/career', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    let data = null
    try {
      data = await response.json()
    } catch {
      data = null
    }

    if (data?.errors) {
      return {
        ok: false,
        errors: data.errors,
        error: data.error || 'Please fix the highlighted fields.',
      }
    }

    if (response.status === 413) {
      return {
        ok: false,
        errors: { resume: 'Resume must be under 3 MB.' },
        error: 'Please fix the highlighted fields.',
      }
    }

    if (response.status === 429) {
      return {
        ok: false,
        error:
          data?.error ||
          'Too many requests. Please wait a few minutes and try again.',
      }
    }

    const via = data?.meta?.inboxVia
    const delivered =
      response.ok &&
      data?.ok === true &&
      data?.delivered === true &&
      REAL_DELIVERY.has(via)

    if (delivered) {
      return {
        ok: true,
        message:
          data.message || 'Thank you — we will connect with you shortly.',
        via,
      }
    }

    return {
      ok: false,
      error:
        data?.error ||
        data?.detail ||
        `We could not submit your application right now. Please email ${CONTACT_EMAIL}.`,
    }
  } catch {
    return {
      ok: false,
      error: `Network error. Please check your connection or email ${CONTACT_EMAIL}.`,
    }
  }
}
