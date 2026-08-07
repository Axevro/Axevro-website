import { motion } from 'framer-motion'
import {
  fadeUp,
  scaleIn,
  slideInLeft,
  staggerContainer,
  viewportOnce,
} from '../lib/motion'

export function MotionSection({
  children,
  className = '',
  delay = 0,
  as = 'div',
}) {
  const Component = motion[as] || motion.div
  return (
    <Component
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </Component>
  )
}

export function FadeUp({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function ScaleIn({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={scaleIn}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  )
}

export function SlideIn({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={slideInLeft}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  )
}
