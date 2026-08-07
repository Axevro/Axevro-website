const HEADER_OFFSET = 80
const DURATION = 380

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3
}

let activeFrame = 0

/**
 * Fast, smooth scroll to a Y position or element.
 * Cancels any in-flight animation to avoid jitter.
 */
export function smoothScrollTo(target, { offset = HEADER_OFFSET, duration = DURATION } = {}) {
  if (typeof window === 'undefined') return

  const prefersReduced =
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

  const top =
    typeof target === 'number'
      ? target
      : Math.max(
          0,
          (target?.getBoundingClientRect?.().top ?? 0) +
            window.scrollY -
            offset,
        )

  if (prefersReduced || duration <= 0) {
    window.scrollTo(0, top)
    return
  }

  const start = window.scrollY
  const distance = top - start
  if (Math.abs(distance) < 1) return

  const startTime = performance.now()
  if (activeFrame) cancelAnimationFrame(activeFrame)

  const step = (now) => {
    const elapsed = now - startTime
    const progress = Math.min(1, elapsed / duration)
    window.scrollTo(0, start + distance * easeOutCubic(progress))
    if (progress < 1) {
      activeFrame = requestAnimationFrame(step)
    } else {
      activeFrame = 0
    }
  }

  activeFrame = requestAnimationFrame(step)
}

export function scrollToHash(hash, options) {
  const id = hash?.replace(/^#/, '')
  if (!id) return false
  const el = document.getElementById(id)
  if (!el) return false
  smoothScrollTo(el, options)
  return true
}
