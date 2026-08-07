import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToHash, smoothScrollTo } from '../lib/smoothScroll'

function getHashIdFromHref(href, pathname) {
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return null
  }

  if (href.startsWith('#')) {
    const id = href.slice(1)
    return id || null
  }

  if (href.startsWith('/#') && (pathname === '/' || pathname === '')) {
    const id = href.slice(2)
    return id || null
  }

  return null
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Wait a tick so the target section is in the DOM after route paint
      const timer = window.setTimeout(() => {
        if (!scrollToHash(hash)) {
          smoothScrollTo(0, { offset: 0, duration: 280 })
        }
      }, 40)
      return () => window.clearTimeout(timer)
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
      const id = getHashIdFromHref(href, pathname)
      if (!id) return

      const el = document.getElementById(id)
      if (!el) return

      event.preventDefault()
      if (window.location.hash !== `#${id}`) {
        window.history.pushState(null, '', `#${id}`)
      }
      smoothScrollTo(el)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [pathname])

  return null
}
