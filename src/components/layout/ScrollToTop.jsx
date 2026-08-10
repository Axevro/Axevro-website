import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToHash, smoothScrollTo } from '../../lib/smoothScroll'

/**
 * Resolve an in-page hash target from an href, when the target
 * already exists on the current route (avoids full remount).
 */
function getSamePageHashId(href, pathname) {
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return null
  }

  if (href.startsWith('#')) {
    const id = href.slice(1)
    return id || null
  }

  const hashIndex = href.indexOf('#')
  if (hashIndex === -1) return null

  const path = href.slice(0, hashIndex) || '/'
  const id = href.slice(hashIndex + 1)
  if (!id) return null

  // /#about on home, or /contact#contact while already on /contact
  if (path === '/#' || path === '/') {
    if (pathname === '/' || pathname === '') return id
    return null
  }

  if (path === pathname) return id
  return null
}

function scrollToHashWithRetry(hash, { attempts = 30, interval = 40 } = {}) {
  let cancelled = false
  let tries = 0

  const tick = () => {
    if (cancelled) return
    if (scrollToHash(hash)) return
    tries += 1
    if (tries < attempts) {
      window.setTimeout(tick, interval)
    }
  }

  tick()
  return () => {
    cancelled = true
  }
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      return scrollToHashWithRetry(hash)
    }

    smoothScrollTo(0, { offset: 0, duration: 280 })
    return undefined
  }, [pathname, hash])

  useEffect(() => {
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = event.target.closest?.('a[href]')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      const id = getSamePageHashId(href, pathname)
      if (!id) return

      const el = document.getElementById(id)
      if (!el) return

      event.preventDefault()
      if (window.location.hash !== `#${id}`) {
        window.history.pushState(null, '', `${pathname === '/' ? '' : pathname}#${id}`)
      }
      smoothScrollTo(el)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [pathname])

  return null
}
