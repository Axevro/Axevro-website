/**
 * Scroll the first form field error (or invalid control) into view under the fixed header.
 */
export function scrollToFieldError(root = document) {
  if (typeof window === 'undefined' || !root) return

  const alert = root.querySelector?.('[role="alert"]')
  const invalid =
    root.querySelector?.('input:invalid, select:invalid, textarea:invalid') ||
    root.querySelector?.('[aria-invalid="true"]')

  const target = alert || invalid
  if (!target) return

  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  target.scrollIntoView({
    behavior: prefersReduced ? 'auto' : 'smooth',
    block: 'center',
  })

  const focusable =
    (target.closest?.('label')?.querySelector?.('input, select, textarea')) ||
    (target.matches?.('input, select, textarea') ? target : null) ||
    invalid

  if (focusable && typeof focusable.focus === 'function') {
    try {
      focusable.focus({ preventScroll: true })
    } catch {
      focusable.focus()
    }
  }
}
