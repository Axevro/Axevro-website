export const CONTACT_EMAIL = 'axevro9@gmail.com'
export const PRIMARY_PHONE = '7084788119'
export const WHATSAPP_PHONE = '9693174749'
export const WHATSAPP_E164 = `91${WHATSAPP_PHONE}`

export const WHATSAPP_DEFAULT_MESSAGE =
  'Hello Axevro, I would like to know more about your services and discuss a project.'

export function getWhatsAppUrl(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(message)}`
}
