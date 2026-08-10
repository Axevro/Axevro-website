import { Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Footer } from '../components/layout'
import { PageHero } from '../components/ui'
import {
  getMailtoInquiryUrl,
  getWhatsAppInquiryUrl,
  getWhatsAppUrl,
} from '../data/contact'

const initialForm = {
  name: '',
  phone: '',
  email: '',
  subject: '',
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const validate = () => {
    const next = {}

    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.phone.trim()) next.phone = 'Please enter your phone number.'
    else if (!/^[+\d][\d\s()-]{6,}$/.test(form.phone.trim())) {
      next.phone = 'Enter a valid phone number.'
    }
    if (!form.email.trim()) next.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Enter a valid email address.'
    }
    if (!form.subject.trim()) next.subject = 'Please enter a subject.'

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) {
      toast.error('Please fix the highlighted fields.')
      return
    }

    setSubmitting(true)

    try {
      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
      }

      // Works on any network — opens WhatsApp with a prefilled inquiry.
      // Email is a secondary path if WhatsApp is blocked.
      const whatsappUrl = getWhatsAppInquiryUrl(payload)
      const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer')

      if (!opened) {
        window.location.href = getMailtoInquiryUrl(payload)
        toast.message('Opening your email app to send the inquiry…')
      } else {
        toast.success('Opening WhatsApp with your inquiry. Send the message to reach us.')
      }

      setForm(initialForm)
    } catch {
      toast.error('Something went wrong. Please try WhatsApp or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  const fieldClass = (field) =>
    `w-full rounded-[2px] border bg-white px-4 py-3.5 text-[15px] text-ink outline-none transition-all placeholder:text-gray-light focus:border-green focus:shadow-[0_0_0_3px_rgba(31,157,85,0.12)] ${
      errors[field] ? 'border-red-400' : 'border-line'
    }`

  return (
    <>
      <main>
        <PageHero
          eyebrow="Contact"
          title="Tell us what you're"
          titleAccent="building"
          description="Share a few details and we'll respond within 48 hours — with clear next steps, not a generic reply."
          actions={
            <>
              <a href="#contact" className="btn-primary">
                Send a message
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </a>
              <Link to="/pricing" className="btn-secondary-dark">
                View pricing
              </Link>
            </>
          }
        />

        <section className="border-b border-line bg-bg-alt py-8 sm:py-10">
          <div className="mx-auto grid max-w-[1180px] gap-5 px-4 sm:grid-cols-3 sm:gap-6 sm:px-6 md:px-8">
            {[
              {
                icon: 'schedule',
                title: '48-hour reply',
                desc: 'Most inquiries get a clear response within two business days.',
              },
              {
                icon: 'payments',
                title: 'Intro pricing',
                desc: 'Portfolio-friendly rates with development and deployment broken out.',
              },
              {
                icon: 'verified_user',
                title: 'Scoped proposals',
                desc: 'We confirm deliverables in writing before any build begins.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-3"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-green/20 bg-white text-green">
                  <span className="material-symbols-outlined text-[20px]">
                    {item.icon}
                  </span>
                </span>
                <div>
                  <div className="font-display text-[15px] font-semibold">{item.title}</div>
                  <p className="mt-1 text-[13px] leading-snug text-gray">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="scroll-mt-24 border-t border-line bg-bg-alt/40 py-14 sm:scroll-mt-[88px] sm:py-16 md:py-[88px]"
        >
          <div className="mx-auto grid max-w-[1180px] gap-10 px-4 sm:gap-12 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-14 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-display text-[clamp(24px,3vw,32px)] font-semibold tracking-[-0.5px]">
                Prefer a direct line?
              </h2>
              <p className="mt-3 text-[15px] leading-[1.7] text-gray sm:text-base">
                Reach us by email, phone, or WhatsApp — or use the form and we&apos;ll
                come back with next steps.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  {
                    href: 'mailto:axevro9@gmail.com',
                    icon: 'mail',
                    label: 'axevro9@gmail.com',
                    note: 'Email',
                    color: 'text-green',
                  },
                  {
                    href: 'tel:+917084788119',
                    icon: 'call',
                    label: '7084788119',
                    note: 'Primary',
                    color: 'text-green',
                  },
                  {
                    href: 'tel:+919693174749',
                    icon: 'call',
                    label: '9693174749',
                    note: 'Alternate',
                    color: 'text-green',
                  },
                  {
                    href: getWhatsAppUrl(),
                    icon: 'chat',
                    label: 'WhatsApp us',
                    note: '9693174749',
                    color: 'text-[#128C7E]',
                    external: true,
                  },
                ].map((item, index) => (
                  <motion.a
                    key={item.label + item.note}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    whileHover={{ y: -3 }}
                    className={`flex items-center gap-3 border border-line bg-white px-3.5 py-3.5 transition-all hover:border-green/30 hover:shadow-[0_10px_28px_rgba(10,11,13,0.06)] sm:px-4 ${item.color}`}
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center border border-green/20 bg-green/8 text-green">
                      <span className="material-symbols-outlined text-[20px]">
                        {item.icon}
                      </span>
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-[15px] font-medium">{item.label}</span>
                      <span className="mt-0.5 font-mono text-[10px] tracking-[1px] text-gray uppercase">
                        {item.note}
                      </span>
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              noValidate
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="border border-line bg-white p-4 shadow-[0_18px_50px_rgba(10,11,13,0.06)] sm:p-6 md:p-8"
            >
              <div className="mb-6 border-b border-line pb-5">
                <h3 className="font-display text-xl font-semibold">Send a message</h3>
                <p className="mt-1 text-sm text-gray">
                  Name, phone, email, and subject — that&apos;s all we need to start.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-mono text-[11px] tracking-[1px] text-gold-deep uppercase">
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={updateField('name')}
                    className={fieldClass('name')}
                  />
                  {errors.name && (
                    <span className="mt-1.5 block text-xs text-red-500">{errors.name}</span>
                  )}
                </label>

                <label className="block">
                  <span className="mb-2 block font-mono text-[11px] tracking-[1px] text-gold-deep uppercase">
                    Phone
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="7084788119"
                    value={form.phone}
                    onChange={updateField('phone')}
                    className={fieldClass('phone')}
                  />
                  {errors.phone && (
                    <span className="mt-1.5 block text-xs text-red-500">{errors.phone}</span>
                  )}
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-2 block font-mono text-[11px] tracking-[1px] text-gold-deep uppercase">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={updateField('email')}
                    className={fieldClass('email')}
                  />
                  {errors.email && (
                    <span className="mt-1.5 block text-xs text-red-500">{errors.email}</span>
                  )}
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-2 block font-mono text-[11px] tracking-[1px] text-gold-deep uppercase">
                    Subject
                  </span>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Project inquiry, quote, partnership..."
                    value={form.subject}
                    onChange={updateField('subject')}
                    className={fieldClass('subject')}
                  />
                  {errors.subject && (
                    <span className="mt-1.5 block text-xs text-red-500">
                      {errors.subject}
                    </span>
                  )}
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-[2px] bg-gold px-6 py-4 text-sm font-bold text-black transition-all hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {submitting ? 'Opening…' : 'Send via WhatsApp'}
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
              <p className="mt-3 text-[12.5px] leading-relaxed text-gray">
                Submits through WhatsApp so it works reliably on any Wi‑Fi or mobile
                network. Prefer email?{' '}
                <a
                  href={`mailto:axevro9@gmail.com`}
                  className="font-semibold text-green-deep underline-offset-2 hover:underline"
                >
                  axevro9@gmail.com
                </a>
              </p>
            </motion.form>
          </div>
        </section>

        <section className="border-t border-line bg-black py-14 text-center text-white sm:py-16">
          <div className="relative mx-auto max-w-[560px] px-4 sm:px-6">
            <h2 className="font-display text-[clamp(22px,4vw,32px)] font-semibold">
              Prefer WhatsApp?
            </h2>
            <p className="mt-3 text-[14.5px] text-[#9BA0A8]">
              Message us directly — useful for quick questions before a formal quote.
            </p>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6"
            >
              Chat on WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
