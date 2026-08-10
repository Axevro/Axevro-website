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
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setCurrentSrc(src || fallbackSrc)
    setFailed(false)
  }, [src, fallbackSrc])

  const handleError = (event) => {
    if (!failed && currentSrc !== fallbackSrc) {
      setFailed(true)
      setCurrentSrc(fallbackSrc)
    } else if (failed) {
      event.currentTarget.style.visibility = 'hidden'
    }
    onErrorProp?.(event)
  }

  if (!currentSrc) return null

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={loading}
      decoding={decoding}
      sizes={sizes}
      width={width}
      height={height}
      onError={handleError}
      className={`${className} ${failed ? fallbackClassName : ''}`.trim()}
      {...rest}
    />
  )
}
