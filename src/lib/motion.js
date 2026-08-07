export const easeOut = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.55, ease: easeOut },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: easeOut },
  },
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
}

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
}

export const staggerFast = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
}

export const viewportOnce = { once: true, amount: 0.18 }

export const premiumHover = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: 0.25, ease: easeOut } },
}
