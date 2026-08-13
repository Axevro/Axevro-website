import nodemailer from 'nodemailer'

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function getMailConfig() {
  const smtpUser = (process.env.BREVO_SMTP_USER || '').trim()
  const smtpPass = (
    process.env.BREVO_SMTP_PASS ||
    (process.env.BREVO_API_KEY?.startsWith('xsmtpsib-')
      ? process.env.BREVO_API_KEY
      : '') ||
    ''
  ).trim()
  const apiKey = (process.env.BREVO_API_KEY || '').trim()
  const inbox = (process.env.CONTACT_INBOX || 'axevro9@gmail.com').trim()

  // Gmail App Password path (recommended while using @gmail.com without a custom domain)
  const gmailUser = (process.env.GMAIL_USER || inbox || '').trim()
  const gmailAppPassword = (process.env.GMAIL_APP_PASSWORD || '')
    .trim()
    .replace(/\s+/g, '')

  // Brevo freemail From: @gmail.com is blocked/spam by Google (see Brevo Senders warnings).
  // Prefer Brevo SMTP identity unless a custom domain sender is configured.
  const configuredSender = (process.env.BREVO_SENDER_EMAIL || '').trim()
  const senderEmail =
    configuredSender ||
    (gmailAppPassword ? gmailUser : '') ||
    smtpUser
  const senderName = (process.env.BREVO_SENDER_NAME || 'Axevro').trim()
  const companyName = (process.env.COMPANY_NAME || 'Axevro').trim()

  return {
    host: process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
    port: Number(process.env.BREVO_SMTP_PORT || 587),
    smtpUser,
    smtpPass,
    apiKey,
    inbox,
    senderEmail,
    senderName,
    companyName,
    gmailUser,
    gmailAppPassword,
    preferGmail: Boolean(gmailUser && gmailAppPassword),
  }
}

function buildInboxHtml(data) {
  return `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f6f5f1;">
  <div style="font-family:Inter,Segoe UI,Arial,sans-serif;line-height:1.6;color:#111318;max-width:600px;margin:24px auto;background:#ffffff;border:1px solid #e8e4d8;">
    <div style="padding:20px 22px;border-bottom:3px solid #c9a227;background:#0a0b0d;color:#fff;">
      <p style="margin:0 0 6px;font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:#e8c468;">Axevro contact form</p>
      <h1 style="margin:0;font-size:22px;font-weight:600;">New client inquiry</h1>
    </div>
    <div style="padding:22px;">
      <p style="margin:0 0 16px;color:#6b7078;">A client submitted details on <a style="color:#1f9d55;text-decoration:none;" href="https://axevro.in">axevro.in</a>. Reply to this email to contact them directly.</p>
      <table style="border-collapse:collapse;width:100%;">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #eee;width:110px;color:#8a6a1e;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">Name</td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600;">${escapeHtml(data.name)}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #eee;color:#8a6a1e;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">Email</td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;"><a style="color:#1f9d55;text-decoration:none;" href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #eee;color:#8a6a1e;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">Phone</td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;"><a style="color:#1f9d55;text-decoration:none;" href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #eee;color:#8a6a1e;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">Subject</td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;">${escapeHtml(data.subject)}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;vertical-align:top;color:#8a6a1e;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">Message</td>
          <td style="padding:10px 0;white-space:pre-wrap;">${escapeHtml(data.message || '')}</td>
        </tr>
      </table>
    </div>
    <div style="padding:14px 22px;background:#faf8f3;color:#6b7078;font-size:12px;">
      Sent securely via Axevro website · ${escapeHtml(new Date().toUTCString())}
    </div>
  </div>
</body>
</html>`
}

function buildThankYouHtml(data, companyName, inbox) {
  const firstName = escapeHtml(data.name.split(' ')[0] || data.name)
  return `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f6f5f1;">
  <div style="font-family:Inter,Segoe UI,Arial,sans-serif;line-height:1.65;color:#111318;max-width:600px;margin:24px auto;background:#ffffff;border:1px solid #e8e4d8;">
    <div style="padding:20px 22px;border-bottom:3px solid #1f9d55;background:#0a0b0d;color:#fff;">
      <p style="margin:0 0 6px;font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:#4ade80;">Axevro</p>
      <h1 style="margin:0;font-size:22px;font-weight:600;">Thank you for connecting</h1>
    </div>
    <div style="padding:22px;">
      <p style="margin:0 0 14px;">Hi ${firstName},</p>
      <p style="margin:0 0 14px;">
        Thank you for connecting with <strong>${escapeHtml(companyName)}</strong>.
        We have received your message and our team will respond within
        <strong>48 hours</strong> with clear next steps.
      </p>
      <p style="margin:0 0 10px;color:#6b7078;">Here is a short summary of your request:</p>
      <div style="padding:14px 16px;background:#faf8f3;border:1px solid #e8e4d8;margin:0 0 16px;">
        <p style="margin:0 0 6px;"><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
        <p style="margin:0;white-space:pre-wrap;"><strong>Message:</strong> ${escapeHtml(data.message || '')}</p>
      </div>
      <p style="margin:0 0 14px;">
        If you would like to share more details, simply reply to this email.
        You can also reach us at
        <a style="color:#1f9d55;text-decoration:none;" href="mailto:${escapeHtml(inbox)}">${escapeHtml(inbox)}</a>.
      </p>
      <p style="margin:0;">
        Warm regards,<br/>
        <strong>Team ${escapeHtml(companyName)}</strong><br/>
        Building Digital Excellence
      </p>
    </div>
  </div>
</body>
</html>`
}

function mapNodemailerAttachments(attachments) {
  if (!Array.isArray(attachments) || !attachments.length) return undefined
  return attachments.map((file) => ({
    filename: file.filename,
    content: Buffer.from(file.contentBase64, 'base64'),
    contentType: file.mimeType,
  }))
}

function buildCareerInboxHtml(data) {
  return `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f6f5f1;">
  <div style="font-family:Inter,Segoe UI,Arial,sans-serif;line-height:1.6;color:#111318;max-width:600px;margin:24px auto;background:#ffffff;border:1px solid #e8e4d8;">
    <div style="padding:20px 22px;border-bottom:3px solid #c9a227;background:#0a0b0d;color:#fff;">
      <p style="margin:0 0 6px;font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:#e8c468;">Axevro careers</p>
      <h1 style="margin:0;font-size:22px;font-weight:600;">New job application</h1>
    </div>
    <div style="padding:22px;">
      <p style="margin:0 0 16px;color:#6b7078;">A candidate applied on <a style="color:#1f9d55;text-decoration:none;" href="https://axevro.in/careers">axevro.in/careers</a>. Resume is attached.</p>
      <table style="border-collapse:collapse;width:100%;">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #eee;width:110px;color:#8a6a1e;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">Name</td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600;">${escapeHtml(data.name)}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #eee;color:#8a6a1e;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">Email</td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;"><a style="color:#1f9d55;text-decoration:none;" href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #eee;color:#8a6a1e;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">Phone</td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;"><a style="color:#1f9d55;text-decoration:none;" href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #eee;color:#8a6a1e;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">Role</td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;">${escapeHtml(data.roleLabel || data.role)}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #eee;color:#8a6a1e;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">Resume</td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;">${escapeHtml(data.resume?.filename || 'Attached')}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;vertical-align:top;color:#8a6a1e;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">Note</td>
          <td style="padding:10px 0;white-space:pre-wrap;">${escapeHtml(data.note || '—')}</td>
        </tr>
      </table>
    </div>
    <div style="padding:14px 22px;background:#faf8f3;color:#6b7078;font-size:12px;">
      Sent securely via Axevro careers · ${escapeHtml(new Date().toUTCString())}
    </div>
  </div>
</body>
</html>`
}

function buildCareerThankYouHtml(data, companyName, inbox) {
  const firstName = escapeHtml(data.name.split(' ')[0] || data.name)
  return `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f6f5f1;">
  <div style="font-family:Inter,Segoe UI,Arial,sans-serif;line-height:1.65;color:#111318;max-width:600px;margin:24px auto;background:#ffffff;border:1px solid #e8e4d8;">
    <div style="padding:20px 22px;border-bottom:3px solid #1f9d55;background:#0a0b0d;color:#fff;">
      <p style="margin:0 0 6px;font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:#4ade80;">Axevro careers</p>
      <h1 style="margin:0;font-size:22px;font-weight:600;">Thank you for applying</h1>
    </div>
    <div style="padding:22px;">
      <p style="margin:0 0 14px;">Hi ${firstName},</p>
      <p style="margin:0 0 14px;">
        Thank you for applying to <strong>${escapeHtml(companyName)}</strong>
        for <strong>${escapeHtml(data.roleLabel || data.role)}</strong>.
        We have received your application and resume.
      </p>
      <p style="margin:0 0 14px;">
        <strong>Thank you — we will connect with you shortly.</strong>
      </p>
      <p style="margin:0 0 14px;color:#6b7078;">
        Our team will review your profile and reach out if there is a fit.
        For any questions, reply to this email or write to
        <a style="color:#1f9d55;text-decoration:none;" href="mailto:${escapeHtml(inbox)}">${escapeHtml(inbox)}</a>.
      </p>
      <p style="margin:0;">
        Warm regards,<br/>
        <strong>Team ${escapeHtml(companyName)}</strong><br/>
        Building Digital Excellence
      </p>
    </div>
  </div>
</body>
</html>`
}

async function sendViaBrevoApi(config, message) {
  if (!config.apiKey || !config.apiKey.startsWith('xkeysib-')) {
    throw new Error('Brevo REST API key missing (must start with xkeysib-).')
  }

  const payload = {
    sender: { name: message.fromName, email: message.fromEmail },
    to: message.to.map((item) => ({ email: item.email, name: item.name })),
    subject: message.subject,
    htmlContent: message.html,
    textContent: message.text,
    headers: {
      'X-Mailer': 'Axevro Website',
      'X-Axevro-Type': message.kind || 'transactional',
    },
  }
  if (message.replyToEmail) {
    payload.replyTo = {
      email: message.replyToEmail,
      name: message.replyToName || message.replyToEmail,
    }
  }

  if (Array.isArray(message.attachments) && message.attachments.length) {
    payload.attachment = message.attachments.map((file) => ({
      name: file.filename,
      content: file.contentBase64,
    }))
  }

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': config.apiKey,
    },
    body: JSON.stringify(payload),
  })

  const text = await response.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = { raw: text }
  }

  if (!response.ok) {
    const err = new Error(
      data?.message || `Brevo API failed with status ${response.status}`,
    )
    err.details = data
    throw err
  }

  return { id: data?.messageId || data?.messageIds?.[0] || 'api-ok', via: 'api' }
}

async function sendViaGmail(config, message) {
  if (!config.gmailUser || !config.gmailAppPassword) {
    throw new Error('Gmail App Password is not configured.')
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: config.gmailUser,
      pass: config.gmailAppPassword,
    },
  })

  const info = await transporter.sendMail({
    from: {
      name: message.fromName || config.senderName,
      address: config.gmailUser,
    },
    to: message.to.map((item) => ({ name: item.name, address: item.email })),
    replyTo: message.replyToEmail
      ? { name: message.replyToName, address: message.replyToEmail }
      : undefined,
    subject: message.subject,
    html: message.html,
    text: message.text,
    attachments: mapNodemailerAttachments(message.attachments),
  })

  if (!info?.messageId && !info?.response) {
    throw new Error('Gmail SMTP did not accept the message.')
  }
  if (Array.isArray(info.rejected) && info.rejected.length > 0) {
    throw new Error(`Gmail rejected: ${info.rejected.join(', ')}`)
  }

  return {
    id: info.messageId || info.response,
    via: 'gmail',
    accepted: info.accepted || [],
    response: info.response || '',
  }
}

async function sendViaSmtp(config, message) {
  if (!config.smtpUser || !config.smtpPass) {
    throw new Error('Brevo SMTP credentials are missing.')
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: false,
    requireTLS: true,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
    tls: { minVersion: 'TLSv1.2' },
  })

  const toList = message.to.map((item) => ({
    name: item.name,
    address: item.email,
  }))

  const info = await transporter.sendMail({
    from: { name: message.fromName, address: message.fromEmail },
    envelope: {
      from: config.smtpUser,
      to: message.to.map((item) => item.email),
    },
    to: toList,
    replyTo: message.replyToEmail
      ? { name: message.replyToName, address: message.replyToEmail }
      : undefined,
    subject: message.subject,
    html: message.html,
    text: message.text,
    attachments: mapNodemailerAttachments(message.attachments),
    headers: {
      'X-Mailer': 'Axevro Website',
      'X-Axevro-Type': message.kind || 'transactional',
    },
  })

  if (!info?.messageId && !info?.response) {
    throw new Error('SMTP server did not accept the message.')
  }
  if (Array.isArray(info.rejected) && info.rejected.length > 0) {
    throw new Error(`SMTP rejected: ${info.rejected.join(', ')}`)
  }

  return {
    id: info.messageId || info.response,
    via: 'smtp',
    accepted: info.accepted || [],
    response: info.response || '',
  }
}

/**
 * Delivery order:
 * 1) Gmail App Password (best for @gmail.com inboxes)
 * 2) Brevo REST API (xkeysib-...)
 * 3) Brevo SMTP (xsmtpsib-...)
 */
export function isPrimaryMailConfigured(config = getMailConfig()) {
  return Boolean(
    config.preferGmail ||
      config.apiKey?.startsWith('xkeysib-') ||
      (config.smtpPass && config.smtpUser),
  )
}

export async function sendMail(config, message) {
  const errors = []

  if (config.preferGmail) {
    try {
      return await sendViaGmail(config, {
        ...message,
        fromEmail: config.gmailUser,
      })
    } catch (error) {
      errors.push(`Gmail: ${error.message}`)
    }
  }

  if (config.apiKey?.startsWith('xkeysib-')) {
    try {
      return await sendViaBrevoApi(config, message)
    } catch (error) {
      errors.push(`API: ${error.message}`)
    }
  }

  if (config.smtpPass && config.smtpUser) {
    try {
      return await sendViaSmtp(config, message)
    } catch (error) {
      errors.push(`SMTP: ${error.message}`)
    }
  }

  throw new Error(errors.join(' | ') || 'No primary mail transport available.')
}

export async function deliverContactEmails(data) {
  const config = getMailConfig()

  if (!config.inbox) throw new Error('CONTACT_INBOX is not configured.')
  if (!isPrimaryMailConfigured(config)) {
    throw new Error(
      'Mail is not configured on the server. Set GMAIL_APP_PASSWORD (or Brevo SMTP) in Vercel env.',
    )
  }

  const fromEmail = config.preferGmail ? config.gmailUser : config.senderEmail
  if (!fromEmail) throw new Error('No sender email configured.')

  const inboxResult = await sendMail(config, {
    kind: 'inquiry',
    fromName: config.senderName,
    fromEmail,
    to: [{ name: config.companyName, email: config.inbox }],
    replyToName: data.name,
    replyToEmail: data.email,
    subject: `New inquiry from ${data.name}: ${data.subject}`,
    html: buildInboxHtml(data),
    text: [
      'New client inquiry from axevro.in',
      '',
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Subject: ${data.subject}`,
      '',
      data.message || '',
      '',
      'Reply to this email to contact the client.',
    ].join('\n'),
  })

  const replyResult = await sendMail(config, {
    kind: 'thankyou',
    fromName: config.senderName,
    fromEmail,
    to: [{ name: data.name, email: data.email }],
    replyToName: config.companyName,
    replyToEmail: config.inbox,
    subject: `Thank you for connecting with ${config.companyName}`,
    html: buildThankYouHtml(data, config.companyName, config.inbox),
    text: [
      `Hi ${data.name.split(' ')[0] || data.name},`,
      '',
      `Thank you for connecting with ${config.companyName}.`,
      'We have received your message and will respond within 48 hours.',
      '',
      `Subject: ${data.subject}`,
      data.message ? `Message: ${data.message}` : '',
      '',
      `Warm regards,`,
      `Team ${config.companyName}`,
      config.inbox,
    ].join('\n'),
  })

  return {
    inboxId: inboxResult.id,
    inboxVia: inboxResult.via,
    replyId: replyResult.id,
    replyVia: replyResult.via,
    senderUsed: fromEmail,
  }
}

export async function deliverCareerEmails(data) {
  const config = getMailConfig()

  if (!config.inbox) throw new Error('CONTACT_INBOX is not configured.')
  if (!isPrimaryMailConfigured(config)) {
    throw new Error(
      'Mail is not configured on the server. Set GMAIL_APP_PASSWORD (or Brevo SMTP) in Vercel env.',
    )
  }

  const fromEmail = config.preferGmail ? config.gmailUser : config.senderEmail
  if (!fromEmail) throw new Error('No sender email configured.')
  if (!data.resume?.contentBase64) throw new Error('Resume attachment is missing.')

  let decoded
  try {
    decoded = Buffer.from(data.resume.contentBase64, 'base64')
  } catch {
    throw new Error('Resume attachment could not be decoded.')
  }
  if (!decoded.length) throw new Error('Resume attachment is empty.')

  const attachment = {
    filename: data.resume.filename,
    mimeType: data.resume.mimeType,
    contentBase64: data.resume.contentBase64,
  }

  const inboxResult = await sendMail(config, {
    kind: 'career-application',
    fromName: config.senderName,
    fromEmail,
    to: [{ name: config.companyName, email: config.inbox }],
    replyToName: data.name,
    replyToEmail: data.email,
    subject: `Career application: ${data.roleLabel} — ${data.name}`,
    html: buildCareerInboxHtml(data),
    text: [
      'New career application from axevro.in/careers',
      '',
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Role: ${data.roleLabel}`,
      `Resume: ${data.resume.filename}`,
      '',
      data.note || '',
    ].join('\n'),
    attachments: [attachment],
  })

  const replyResult = await sendMail(config, {
    kind: 'career-thankyou',
    fromName: config.senderName,
    fromEmail,
    to: [{ name: data.name, email: data.email }],
    replyToName: config.companyName,
    replyToEmail: config.inbox,
    subject: `Thank you — we will connect with you shortly | ${config.companyName}`,
    html: buildCareerThankYouHtml(data, config.companyName, config.inbox),
    text: [
      `Hi ${data.name.split(' ')[0] || data.name},`,
      '',
      `Thank you for applying to ${config.companyName} for ${data.roleLabel}.`,
      'We have received your application and resume.',
      '',
      'Thank you — we will connect with you shortly.',
      '',
      `Warm regards,`,
      `Team ${config.companyName}`,
      config.inbox,
    ].join('\n'),
  })

  return {
    inboxId: inboxResult.id,
    inboxVia: inboxResult.via,
    replyId: replyResult.id,
    replyVia: replyResult.via,
    senderUsed: fromEmail,
  }
}

