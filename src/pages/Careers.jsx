import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Footer } from '../components/layout'
import { PageHero } from '../components/ui'
import { CAREER_PERKS, CAREER_ROLES } from '../data/careers'
import { getWhatsAppUrl } from '../data/contact'
import {
  CAREER_RESUME_ACCEPT,
  CAREER_RESUME_MAX_BYTES,
  validateCareerPayload,
  validateResumeFileClient,
} from '../lib/validateCareer'
import { submitCareerApplication } from '../lib/submitCareer'
import { scrollToFieldError } from '../lib/scrollToFieldError'

const initialForm = {
  name: '',
  phone: '',
  email: '',
  role: '',
  note: '',
  ax_hp_token: '',
}

export default function Careers() {
  const [form, setForm] = useState(initialForm)
  const [resumeFile, setResumeFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const formOpenedAt = useRef(Date.now())
  const fileInputRef = useRef(null)

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const selectRole = (roleId) => {
    setForm((prev) => ({ ...prev, role: roleId }))
    if (errors.role) setErrors((prev) => ({ ...prev, role: '' }))
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const onResumeChange = (event) => {
    const file = event.target.files?.[0] || null
    if (!file) {
      setResumeFile(null)
      return
    }

    const check = validateResumeFileClient(file)
    if (!check.ok) {
      setResumeFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      setErrors((prev) => ({ ...prev, resume: check.error }))
      toast.error(check.error, { position: 'top-center' })
      return
    }

    setResumeFile(file)
    if (errors.resume) setErrors((prev) => ({ ...prev, resume: '' }))
  }

  const clearResume = () => {
    setResumeFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const validate = () => {
    const result = validateCareerPayload(form, { resumeFile })
    if (!result.ok) {
      setErrors(result.errors)
      return false
    }
    setErrors({})
    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSuccessMessage('')
    if (!validate()) {
      toast.error('Please fix the highlighted fields.', { position: 'top-center' })
      requestAnimationFrame(() => scrollToFieldError())
      return
    }

    setSubmitting(true)
    try {
      const result = await submitCareerApplication(
        { ...form, form_opened_at: formOpenedAt.current },
        resumeFile,
      )

      if (!result.ok) {
        if (result.errors) {
          setErrors(result.errors)
          toast.error(result.error || 'Please fix the highlighted fields.', {
            position: 'top-center',
          })
          requestAnimationFrame(() => scrollToFieldError())
        } else {
          toast.error(
            result.error ||
              'We could not submit your application. Please email axevro9@gmail.com.',
            { position: 'top-center' },
          )
        }
        return
      }

      const message =
        result.message ||
        'Thank you — we will connect with you shortly.'
      setForm(initialForm)
      clearResume()
      formOpenedAt.current = Date.now()
      setSuccessMessage(message)
      toast.success(message, { position: 'top-center', duration: 6000 })
    } catch {
      toast.error(
        'Network error. Please check your connection or email axevro9@gmail.com.',
        { position: 'top-center' },
      )
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
      <main id="main-content">
        <PageHero
          eyebrow="Careers"
          title="Build with"
          titleAccent="Axevro"
          description="We’re a product-minded studio. If you care about craft, ownership, and shipping real work — we’d like to hear from you."
          actions={
            <>
              <a href="#apply" className="btn-primary">
                Apply now
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </a>
              <a href="#roles" className="btn-secondary-dark">
                View open roles
              </a>
            </>
          }
        />

        <section className="border-b border-line bg-bg-alt py-10 sm:py-14 md:py-16">
          <div className="mx-auto grid max-w-[1180px] gap-8 px-4 min-[480px]:grid-cols-2 sm:gap-8 sm:px-6 lg:grid-cols-3 md:px-8">
            {CAREER_PERKS.map((perk, index) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="min-w-0"
              >
                <span className="material-symbols-outlined text-[26px] text-green">
                  {perk.icon}
                </span>
                <h2 className="font-display mt-3 text-[17px] font-semibold text-ink sm:text-[18px]">
                  {perk.title}
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-gray sm:text-[14.5px]">
                  {perk.text}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="roles" className="scroll-mt-20 py-12 sm:scroll-mt-24 sm:py-16 md:py-20">
          <div className="mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] tracking-[1.4px] text-gold-deep uppercase">
                Open roles
              </p>
              <h2 className="font-display mt-2 text-[clamp(1.45rem,4.2vw,2.2rem)] font-semibold tracking-tight text-ink">
                Where you can contribute
              </h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-gray sm:text-[15px]">
                Engineering, design, and business development — choose a role and
                apply below with your resume. We review every serious application.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-3.5 min-[420px]:grid-cols-2 sm:mt-10 sm:gap-4 lg:grid-cols-3">
              {CAREER_ROLES.map((role, index) => (
                <motion.article
                  key={role.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="flex min-w-0 flex-col border border-line bg-white p-4 sm:p-5 md:p-6"
                >
                  <div className="font-mono text-[10px] tracking-[1px] text-green uppercase">
                    {role.type}
                  </div>
                  <h3 className="font-display mt-2 text-[16px] leading-snug font-semibold text-ink sm:text-[17px] md:text-[18px]">
                    {role.title}
                  </h3>
                  <p className="mt-1 text-[12px] text-gray sm:text-[12.5px]">
                    {role.location}
                  </p>
                  <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ink-soft sm:text-[14px]">
                    {role.summary}
                  </p>
                  <button
                    type="button"
                    onClick={() => selectRole(role.id)}
                    className="mt-4 inline-flex min-h-11 w-fit items-center gap-1.5 text-[13.5px] font-semibold text-green-deep transition-colors hover:text-green sm:mt-5"
                  >
                    Apply for this role
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </button>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="apply"
          className="scroll-mt-20 border-t border-line bg-bg-alt py-12 sm:scroll-mt-24 sm:py-16 md:py-20"
        >
          <div className="mx-auto grid max-w-[1180px] gap-8 px-4 sm:gap-10 sm:px-6 md:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
            <div className="min-w-0">
              <p className="font-mono text-[11px] tracking-[1.4px] text-gold-deep uppercase">
                Application
              </p>
              <h2 className="font-display mt-2 text-[clamp(1.35rem,3.5vw,2rem)] font-semibold tracking-tight text-ink">
                Send your profile
              </h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-gray sm:text-[15px]">
                Share your name, email, phone, and resume. Applications go to{' '}
                <a
                  href="mailto:axevro9@gmail.com"
                  className="break-all font-medium text-green-deep underline-offset-2 hover:underline"
                >
                  axevro9@gmail.com
                </a>
                .
              </p>
              <ul className="mt-5 space-y-3 text-[13.5px] text-ink-soft sm:mt-6 sm:text-[14px]">
                <li className="flex gap-2.5">
                  <span className="material-symbols-outlined mt-0.5 shrink-0 text-[18px] text-green">
                    check_circle
                  </span>
                      PDF or Word resume, up to 3 MB
                    </li>
                <li className="flex gap-2.5">
                  <span className="material-symbols-outlined mt-0.5 shrink-0 text-[18px] text-green">
                    check_circle
                  </span>
                  You’ll get a thank-you email after a successful submit
                </li>
                <li className="flex gap-2.5">
                  <span className="material-symbols-outlined mt-0.5 shrink-0 text-[18px] text-green">
                    check_circle
                  </span>
                  We will connect with you shortly if there is a fit
                </li>
              </ul>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              className="relative min-w-0 border border-line bg-white p-4 sm:p-6 md:p-7"
              noValidate
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-[10000px] top-auto h-px w-px overflow-hidden opacity-0"
              >
                <label htmlFor="ax_hp_career">Leave blank</label>
                <input
                  id="ax_hp_career"
                  type="text"
                  name="ax_hp_token"
                  tabIndex={-1}
                  autoComplete="off"
                  readOnly
                  onFocus={(event) => event.currentTarget.removeAttribute('readOnly')}
                  value={form.ax_hp_token}
                  onChange={updateField('ax_hp_token')}
                />
              </div>

              {successMessage ? (
                <div
                  role="status"
                  className="mb-6 border border-green/25 bg-green/8 px-4 py-4 text-center sm:px-5"
                >
                  <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-green/15 text-green">
                    <span className="material-symbols-outlined text-[22px]">
                      check_circle
                    </span>
                  </div>
                  <p className="font-display text-[16px] font-semibold text-green-deep">
                    Thank you
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">
                    {successMessage}
                  </p>
                </div>
              ) : null}

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
                    maxLength={80}
                    required
                  />
                  {errors.name && (
                    <span className="mt-1.5 block text-xs text-red-500" role="alert">
                      {errors.name}
                    </span>
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
                    inputMode="tel"
                    placeholder="10-digit mobile number"
                    value={form.phone}
                    onChange={updateField('phone')}
                    className={fieldClass('phone')}
                    maxLength={20}
                    required
                  />
                  {errors.phone && (
                    <span className="mt-1.5 block text-xs text-red-500" role="alert">
                      {errors.phone}
                    </span>
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
                    placeholder="you@gmail.com"
                    value={form.email}
                    onChange={updateField('email')}
                    className={fieldClass('email')}
                    maxLength={120}
                    required
                  />
                  {errors.email && (
                    <span className="mt-1.5 block text-xs text-red-500" role="alert">
                      {errors.email}
                    </span>
                  )}
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-2 block font-mono text-[11px] tracking-[1px] text-gold-deep uppercase">
                    Role
                  </span>
                  <select
                    name="role"
                    value={form.role}
                    onChange={updateField('role')}
                    className={`${fieldClass('role')} appearance-none bg-white bg-[length:16px] bg-[right_0.9rem_center] bg-no-repeat pr-10`}
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7078' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
                    }}
                    required
                  >
                    <option value="">Select a role</option>
                    {CAREER_ROLES.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.title}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <span className="mt-1.5 block text-xs text-red-500" role="alert">
                      {errors.role}
                    </span>
                  )}
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-2 block font-mono text-[11px] tracking-[1px] text-gold-deep uppercase">
                    Short note
                  </span>
                  <textarea
                    name="note"
                    rows={4}
                    placeholder="Tell us about your experience and why you want to join Axevro..."
                    value={form.note}
                    onChange={updateField('note')}
                    className={`${fieldClass('note')} min-h-[100px] resize-y`}
                    maxLength={1500}
                    required
                  />
                  {errors.note && (
                    <span className="mt-1.5 block text-xs text-red-500" role="alert">
                      {errors.note}
                    </span>
                  )}
                </label>

                <div className="block sm:col-span-2">
                  <span className="mb-2 block font-mono text-[11px] tracking-[1px] text-gold-deep uppercase">
                    Resume
                  </span>
                  <div
                    className={`rounded-[2px] border border-dashed px-4 py-5 ${
                      errors.resume ? 'border-red-400 bg-red-50/40' : 'border-line bg-bg-alt/60'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      name="resume"
                      accept={CAREER_RESUME_ACCEPT}
                      onChange={onResumeChange}
                      className="block w-full max-w-full text-[13px] text-ink file:mb-2 file:mr-0 file:block file:w-full file:rounded-[2px] file:border-0 file:bg-black file:px-3 file:py-2.5 file:text-[12.5px] file:font-semibold file:text-white sm:file:mb-0 sm:file:mr-3 sm:file:inline-block sm:file:w-auto"
                    />
                    <p className="mt-2 text-[12px] leading-relaxed text-gray sm:text-[12.5px]">
                      PDF, DOC, or DOCX · max{' '}
                      {Math.round(CAREER_RESUME_MAX_BYTES / (1024 * 1024))} MB
                    </p>
                    {resumeFile ? (
                      <div className="mt-3 flex min-w-0 flex-wrap items-center gap-2 text-[13px] text-ink-soft">
                        <span className="material-symbols-outlined shrink-0 text-[18px] text-green">
                          description
                        </span>
                        <span className="min-w-0 flex-1 break-all font-medium">
                          {resumeFile.name}
                        </span>
                        <button
                          type="button"
                          onClick={clearResume}
                          className="shrink-0 text-gray underline-offset-2 hover:text-ink hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : null}
                  </div>
                  {errors.resume && (
                    <span className="mt-1.5 block text-xs text-red-500" role="alert">
                      {errors.resume}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-[2px] bg-gold px-6 py-3.5 text-sm font-bold text-black transition-all hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-70 sm:mt-7 sm:w-auto sm:min-h-0 sm:py-4"
              >
                {submitting ? 'Submitting…' : 'Submit application'}
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </motion.form>
          </div>
        </section>

        <section className="border-t border-line bg-black py-12 pb-[calc(6rem+env(safe-area-inset-bottom))] text-center text-white sm:py-16 sm:pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-16">
          <div className="mx-auto max-w-[640px] px-4 sm:px-6">
            <h2 className="font-display text-[clamp(1.3rem,3.5vw,1.85rem)] font-semibold">
              Prefer a quick chat?
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[#A8ACB4] sm:text-[14.5px]">
              Reach us on WhatsApp or email — we’re happy to talk about fit and timelines.
            </p>
            <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:mt-7 sm:flex-row sm:items-center">
              <a
                href={getWhatsAppUrl(
                  'Hello Axevro — I’d like to talk about joining the team.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center sm:w-auto"
              >
                WhatsApp
              </a>
              <Link
                to="/contact#contact"
                className="btn-secondary-dark w-full justify-center sm:w-auto"
              >
                Contact page
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
