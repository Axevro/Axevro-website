import { CONTACT_EMAIL } from '../data/contact'
import { validateContactPayload } from './validateContact'

/**
 * Primary path: POST /api/contact (Gmail/Brevo on server).
 * Fallback: FormSubmit from the browser when production env is missing
 * or the API is unreachable — so mobile/production never soft-fails.
 */
export async function submitContactForm(rawForm) {
  const validated = validateContactPayload(rawForm)
  if (!validated.ok) {
    return { ok: false, errors: validated.errors, error: 'Please fix the highlighted fields.' }
  }

  const payload = {
    name: validated.value.name,
    phone: validated.value.phone,
    email: validated.value.email,
    subject: validated.value.subject,
    message: validated.value.message,
    ax_hp_token: String(rawForm.ax_hp_token || ''),
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

    if (response.ok && data?.ok) {
      return {
        ok: true,
        message:
          data.message ||
          'Message delivered to Axevro. We will get back to you shortly.',
        via: data.meta?.inboxVia || 'api',
      }
    }

    // Validation errors from API — do not fall back
    if (data?.errors) {
      return {
        ok: false,
        errors: data.errors,
        error: data.error || 'Please fix the highlighted fields.',
      }
    }

    // Rate limit / method issues — surface as-is
    if (response.status === 429 || response.status === 405) {
      return {
        ok: false,
        error:
          data?.error ||
          'Too many requests. Please wait a few minutes and try again.',
      }
    }
  } catch {
    // Network / API down — continue to fallback
  }

  return sendViaFormSubmitFallback(validated.value)
}

async function sendViaFormSubmitFallback(data) {
  const inbox = CONTACT_EMAIL || 'axevro9@gmail.com'
  const firstName = data.name.split(' ')[0] || data.name
  const autoresponse = [
    `Hi ${firstName},`,
    '',
    'Thank you for connecting with Axevro.',
    'We have received your message and will respond within 48 hours.',
    '',
    `Subject: ${data.subject}`,
    data.message ? `Message: ${data.message}` : '',
    '',
    'Warm regards,',
    'Team Axevro',
    inbox,
  ]
    .filter(Boolean)
    .join('\n')

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        _replyto: data.email,
        _subject: `New inquiry from ${data.name}: ${data.subject}`,
        _template: 'table',
        _captcha: 'false',
        _autoresponse: autoresponse,
      }),
    },
  )

  let parsed = null
  try {
    parsed = await response.json()
  } catch {
    parsed = null
  }

  if (!response.ok || parsed?.success === false || parsed?.success === 'false') {
    const needsActivation = /activat/i.test(String(parsed?.message || ''))
    return {
      ok: false,
      error: needsActivation
        ? 'Almost ready — please ask Axevro to activate form delivery, or email axevro9@gmail.com directly.'
        : parsed?.message ||
          'We could not send your message right now. Please email axevro9@gmail.com.',
    }
  }

  return {
    ok: true,
    message: 'Message delivered to Axevro. We will get back to you shortly.',
    via: 'formsubmit',
  }
}
