export const CONTACT_EMAIL = 'axevro9@gmail.com'
export const PRIMARY_PHONE = '7084788119'
export const WHATSAPP_PHONE = '9693174749'
export const WHATSAPP_E164 = `91${WHATSAPP_PHONE}`

export const WHATSAPP_DEFAULT_MESSAGE =
  'Hello Axevro, I would like to know more about your services and discuss a project.'

export function getWhatsAppUrl(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(message)}`
}

export function buildInquiryMessage({ name, phone, email, subject }) {
  return [
    'Hello Axevro — new project inquiry',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    '',
    'Please share next steps.',
  ].join('\n')
}

export function getMailtoInquiryUrl({ name, phone, email, subject }) {
  const body = buildInquiryMessage({ name, phone, email, subject })
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Axevro inquiry — ${subject}`,
  )}&body=${encodeURIComponent(body)}`
}

export function getWhatsAppInquiryUrl(fields) {
  return getWhatsAppUrl(buildInquiryMessage(fields))
}
