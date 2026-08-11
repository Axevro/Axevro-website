import { useEffect, useState } from 'react'

const FALLBACK_SRC = '/brand/axevro-mark.png'

/**
 * Responsive image with graceful fallback — never leaves a broken icon.
 */
export default function SafeImage({
  src,
  alt = '',
  className = '',
  fallbackSrc = FALLBACK_SRC,
  fallbackClassName = '',
  loading = 'lazy',
  decoding = 'async',
  sizes,
  width,
  height,
  onError: onErrorProp,
  ...rest
}) {
  const safeFallback = fallbackSrc || FALLBACK_SRC
  const initialSrc = src || safeFallback
  const [currentSrc, setCurrentSrc] = useState(initialSrc)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setCurrentSrc(src || safeFallback)
    setFailed(false)
  }, [src, safeFallback])

  const handleError = (event) => {
    try {
      if (!failed && currentSrc !== safeFallback) {
        setFailed(true)
        setCurrentSrc(safeFallback)
      } else if (event?.currentTarget) {
        event.currentTarget.style.visibility = 'hidden'
        event.currentTarget.removeAttribute('src')
      }
      onErrorProp?.(event)
    } catch {
      // Swallow image recovery errors so UI never crashes.
    }
  }

  if (!currentSrc) return null

  return (
    <img
      src={currentSrc}
      alt={alt || ''}
      loading={loading}
      decoding={decoding}
      sizes={sizes}
      width={width}
      height={height}
      onError={handleError}
      referrerPolicy="no-referrer-when-downgrade"
      className={`${className} ${failed ? fallbackClassName : ''}`.trim()}
      {...rest}
    />
  )
}
