import { CONTACT_EMAIL } from '../data/contact'
import { validateContactPayload } from './validateContact'

const REAL_DELIVERY = new Set(['gmail', 'smtp', 'api'])

/**
 * Submit contact inquiry.
 * Success is returned ONLY when the server confirms a real mail transport
 * (Gmail / Brevo). No fake success, no unverified third-party fallbacks.
 */
export async function submitContactForm(rawForm) {
  const validated = validateContactPayload(rawForm)
  if (!validated.ok) {
    return {
      ok: false,
      errors: validated.errors,
      error: 'Please fix the highlighted fields.',
    }
  }

  // Honeypot: never send autofilled junk as a "bot signal" from controlled state
  // if the user never touched it — strip unexpected values client-side only when empty expected.
  const honeypot = String(rawForm.ax_hp_token || '').trim()

  const payload = {
    name: validated.value.name,
    phone: validated.value.phone,
    email: validated.value.email,
    subject: validated.value.subject,
    message: validated.value.message,
    ax_hp_token: honeypot,
    form_opened_at: Number(rawForm.form_opened_at) || Date.now(),
  }

  try {
    const response = await fetch('/api/contact', {
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
          data.message ||
          'Message delivered to Axevro. We will get back to you shortly.',
        via,
      }
    }

    return {
      ok: false,
      error:
        data?.error ||
        data?.detail ||
        `We could not deliver your message right now. Please email ${CONTACT_EMAIL}.`,
    }
  } catch {
    return {
      ok: false,
      error: `Network error. Please check your connection or email ${CONTACT_EMAIL}.`,
    }
  }
}
