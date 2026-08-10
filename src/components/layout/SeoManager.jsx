import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE, absoluteUrl, defaultSeo } from '../../data/site'
import { getServiceBySlug } from '../../data/services'
import { getProcessBySlug } from '../../data/process'

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

function resolveSeo(pathname) {
  if (pathname === '/') return defaultSeo

  if (pathname === '/pricing') {
    return {
      title: `Introductory Pricing — ${SITE.name}`,
      description:
        'Transparent Axevro introductory pricing for websites, Flutter apps, dashboards, and backends — development and deployment listed separately.',
      path: '/pricing',
    }
  }

  if (pathname === '/contact' || pathname.startsWith('/contact')) {
    return {
      title: `Contact — ${SITE.name}`,
      description:
        'Contact Axevro for a project quote. Reach us by email, phone, or WhatsApp — most replies within 48 hours.',
      path: '/contact',
    }
  }

  if (pathname === '/privacy-policy') {
    return {
      title: `Privacy Policy — ${SITE.name}`,
      description: `How ${SITE.name} collects, uses, and protects your information.`,
      path: '/privacy-policy',
    }
  }

  if (pathname === '/terms-and-conditions') {
    return {
      title: `Terms & Conditions — ${SITE.name}`,
      description: `Terms governing use of the ${SITE.name} website and services.`,
      path: '/terms-and-conditions',
    }
  }

  if (pathname === '/cookies-policy') {
    return {
      title: `Cookies Policy — ${SITE.name}`,
      description: `How ${SITE.name} uses cookies and similar technologies.`,
      path: '/cookies-policy',
    }
  }

  if (pathname.startsWith('/services/')) {
    const slug = pathname.replace('/services/', '')
    const service = getServiceBySlug(slug)
    if (service) {
      return {
        title: `${service.title} — ${SITE.name}`,
        description: service.desc || service.hero || SITE.description,
        path: pathname,
      }
    }
  }

  if (pathname.startsWith('/process/')) {
    const slug = pathname.replace('/process/', '')
    const step = getProcessBySlug(slug)
    if (step) {
      return {
        title: `${step.name} — Process | ${SITE.name}`,
        description: step.desc || step.hero || SITE.description,
        path: pathname,
      }
    }
  }

  return {
    ...defaultSeo,
    path: pathname,
  }
}

export default function SeoManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    const seo = resolveSeo(pathname)
    const url = absoluteUrl(seo.path)
    const image = absoluteUrl(SITE.ogImage)

    document.title = seo.title

    upsertMeta('name', 'description', seo.description)
    upsertMeta('name', 'keywords', SITE.keywords.join(', '))
    upsertMeta('name', 'author', SITE.name)
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large')
    upsertMeta('name', 'theme-color', '#0A0B0D')

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', SITE.name)
    upsertMeta('property', 'og:title', seo.title)
    upsertMeta('property', 'og:description', seo.description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:locale', SITE.locale)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', seo.title)
    upsertMeta('name', 'twitter:description', seo.description)
    upsertMeta('name', 'twitter:image', image)

    upsertLink('canonical', url)

    upsertJsonLd('axevro-org-schema', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: absoluteUrl('/brand/axevro-mark.png'),
      email: SITE.email,
      telephone: SITE.phonePrimary,
      description: SITE.description,
      sameAs: [],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: SITE.phonePrimary,
          contactType: 'sales',
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi'],
        },
      ],
    })

    upsertJsonLd('axevro-website-schema', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      publisher: {
        '@type': 'Organization',
        name: SITE.name,
      },
    })
  }, [pathname])

  return null
}
