import { motion } from 'framer-motion'
import {
  easeOut,
  fadeUp,
  revealItem,
  scaleIn,
  slideInLeft,
  staggerContainer,
  viewportOnce,
} from '../../lib/motion'

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
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{
        hidden: fadeUp.hidden,
        show: {
          ...fadeUp.show,
          transition: { ...fadeUp.show.transition, delay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className = '', as = 'div' }) {
  const Component = motion[as] || motion.div
  return (
    <Component className={className} variants={revealItem}>
      {children}
    </Component>
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

export function PremiumCard({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, delay, ease: easeOut }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
    >
      {children}
    </motion.div>
  )
}
