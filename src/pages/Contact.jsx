import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getWhatsAppUrl } from '../data/contact'

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

    // Front-end submit for now — hook to API/email service later
    window.setTimeout(() => {
      toast.success('Message sent. We will get back within 48 hours.')
      setForm(initialForm)
      setSubmitting(false)
    }, 500)
  }

  const fieldClass = (field) =>
    `w-full rounded-[2px] border bg-white px-4 py-3.5 text-[15px] text-ink outline-none transition-colors placeholder:text-gray-light focus:border-green ${
      errors[field] ? 'border-red-400' : 'border-line'
    }`

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-black pt-16 pb-16 text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                'radial-gradient(700px 280px at 10% 0%, rgba(74,222,128,0.16), transparent 55%), radial-gradient(520px 240px at 90% 20%, rgba(201,162,39,0.14), transparent 50%)',
            }}
          />
          <div className="relative z-[1] mx-auto max-w-[1180px] px-6 md:px-8">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-1.5 font-mono text-xs tracking-[1.2px] text-green-bright uppercase transition-colors hover:text-gold-bright"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back to home
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="mb-4 flex items-center gap-2.5 font-mono text-xs tracking-[1.5px] text-gold-bright uppercase">
                <span className="block h-[1.5px] w-[22px] bg-gold-bright" />
                Contact
              </div>
              <h1 className="font-display max-w-3xl text-[clamp(34px,5vw,56px)] leading-[1.08] font-semibold tracking-[-1.2px]">
                Let&apos;s build something{' '}
                <span className="text-accent-gradient-bright">excellent</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-[1.65] text-[#A8ACB4]">
                Share your details and we&apos;ll respond within 48 hours.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-[88px]">
          <div className="mx-auto grid max-w-[1180px] gap-12 px-6 md:grid-cols-[0.9fr_1.1fr] md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-display text-[clamp(24px,3vw,32px)] font-semibold tracking-[-0.5px]">
                Get in touch
              </h2>
              <p className="mt-3 text-base leading-[1.7] text-gray">
                Tell us about your project, timeline, or question — name, phone,
                email, and subject are all we need to start.
              </p>

              <div className="mt-8 space-y-5">
                <a
                  href="mailto:axevro9@gmail.com"
                  className="flex items-center gap-3 text-[15px] font-medium text-green transition-colors hover:text-green-deep hover:underline"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center border border-green/25 bg-green/8 text-green">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </span>
                  axevro9@gmail.com
                </a>
                <a
                  href="tel:+917084788119"
                  className="flex items-center gap-3 text-[15px] font-medium text-green transition-colors hover:text-green-deep hover:underline"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center border border-green/25 bg-green/8 text-green">
                    <span className="material-symbols-outlined text-[20px]">call</span>
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span>7084788119</span>
                    <span className="mt-0.5 font-mono text-[10px] tracking-[1px] text-gold-deep uppercase">
                      Primary
                    </span>
                  </span>
                </a>
                <a
                  href="tel:+919693174749"
                  className="flex items-center gap-3 text-[15px] font-medium text-green transition-colors hover:text-green-deep hover:underline"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center border border-green/25 bg-green/8 text-green">
                    <span className="material-symbols-outlined text-[20px]">call</span>
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span>9693174749</span>
                    <span className="mt-0.5 font-mono text-[10px] tracking-[1px] text-gray uppercase">
                      Alternate
                    </span>
                  </span>
                </a>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[15px] font-medium text-[#128C7E] transition-colors hover:text-[#075E54] hover:underline"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center border border-[#25D366]/40 bg-[#25D366]/12 text-[#128C7E]">
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span>WhatsApp us</span>
                    <span className="mt-0.5 font-mono text-[10px] tracking-[1px] text-gray uppercase">
                      9693174749
                    </span>
                  </span>
                </a>
                <div className="flex items-center gap-3 text-[15px] text-ink-soft">
                  <span className="inline-flex h-10 w-10 items-center justify-center border border-green/25 bg-green/8 text-green">
                    <span className="material-symbols-outlined text-[20px]">schedule</span>
                  </span>
                  Response within 48 hours
                </div>
              </div>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              noValidate
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="border border-line bg-bg-alt p-6 md:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="block sm:col-span-1">
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

                <label className="block sm:col-span-1">
                  <span className="mb-2 block font-mono text-[11px] tracking-[1px] text-gold-deep uppercase">
                    Phone
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="+1 000 000 0000"
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
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-[2px] bg-black px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-green disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {submitting ? 'Sending...' : 'Send Message'}
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </motion.form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
