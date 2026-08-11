import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE, absoluteUrl, defaultSeo } from '../../data/site'
import { getServiceBySlug, services } from '../../data/services'
import { getProcessBySlug, processSteps } from '../../data/process'
import { portfolioProjects } from '../../data/images'

function upsertMeta(attr, key, content) {
  if (content == null || content === '') return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', String(content))
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
  if (!data) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

function resolveSeo(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'

  if (path === '/') {
    return { ...defaultSeo, robots: 'index, follow, max-image-preview:large' }
  }

  if (path === '/pricing') {
    return {
      title: `Introductory Pricing — ${SITE.name}`,
      description:
        'Transparent Axevro introductory pricing for websites, Flutter apps, dashboards, and backends — development and deployment listed separately.',
      path: '/pricing',
      robots: 'index, follow, max-image-preview:large',
    }
  }

  if (path === '/contact') {
    return {
      title: `Contact — ${SITE.name}`,
      description:
        'Contact Axevro for a project quote. Reach us by email, phone, or WhatsApp — most replies within 48 hours.',
      path: '/contact',
      robots: 'index, follow, max-image-preview:large',
    }
  }

  if (path === '/privacy-policy') {
    return {
      title: `Privacy Policy — ${SITE.name}`,
      description: `How ${SITE.name} collects, uses, and protects your information.`,
      path: '/privacy-policy',
      robots: 'index, follow',
    }
  }

  if (path === '/terms-and-conditions') {
    return {
      title: `Terms & Conditions — ${SITE.name}`,
      description: `Terms governing use of the ${SITE.name} website and services.`,
      path: '/terms-and-conditions',
      robots: 'index, follow',
    }
  }

  if (path === '/cookies-policy') {
    return {
      title: `Cookies Policy — ${SITE.name}`,
      description: `How ${SITE.name} uses cookies and similar technologies.`,
      path: '/cookies-policy',
      robots: 'index, follow',
    }
  }

  if (path.startsWith('/services/')) {
    const slug = path.replace(/^\/services\//, '')
    const service = getServiceBySlug(slug)
    if (service) {
      return {
        title: `${service.title} — ${SITE.name}`,
        description: service.desc || service.hero || SITE.description,
        path: `/services/${service.slug}`,
        robots: 'index, follow, max-image-preview:large',
        service,
      }
    }
  }

  if (path.startsWith('/process/')) {
    const slug = path.replace(/^\/process\//, '')
    const step = getProcessBySlug(slug)
    if (step) {
      return {
        title: `${step.name} — Process | ${SITE.name}`,
        description: step.desc || step.hero || SITE.description,
        path: `/process/${step.slug}`,
        robots: 'index, follow, max-image-preview:large',
        step,
      }
    }
  }

  return {
    title: `Page Not Found — ${SITE.name}`,
    description: `The page you requested could not be found on the ${SITE.name} website.`,
    path: path || '/404',
    robots: 'noindex, follow',
    isNotFound: true,
  }
}

function buildBreadcrumbs(seo) {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${SITE.url}/`,
    },
  ]

  if (seo.service) {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: seo.service.title,
      item: absoluteUrl(seo.path),
    })
  } else if (seo.step) {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: seo.step.name,
      item: absoluteUrl(seo.path),
    })
  } else if (seo.path && seo.path !== '/') {
    const label = seo.title.split('—')[0].trim()
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: label,
      item: absoluteUrl(seo.path),
    })
  } else {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}

export default function SeoManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    const seo = resolveSeo(pathname)
    const url = absoluteUrl(seo.isNotFound ? pathname : seo.path)
    const image = absoluteUrl(SITE.ogImage)

    document.title = seo.title
    document.documentElement.lang = 'en-IN'

    upsertMeta('name', 'description', seo.description)
    upsertMeta('name', 'keywords', SITE.keywords.join(', '))
    upsertMeta('name', 'author', SITE.name)
    upsertMeta('name', 'robots', seo.robots || 'index, follow, max-image-preview:large')
    upsertMeta('name', 'googlebot', seo.robots || 'index, follow, max-image-preview:large')
    upsertMeta('name', 'theme-color', '#0A0B0D')
    upsertMeta('name', 'format-detection', 'telephone=yes')
    upsertMeta('name', 'application-name', SITE.name)

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', SITE.name)
    upsertMeta('property', 'og:title', seo.title)
    upsertMeta('property', 'og:description', seo.description)
    upsertMeta('property', 'og:url', url === SITE.url ? `${SITE.url}/` : url)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:image:alt', `${SITE.name} — ${SITE.tagline}`)
    upsertMeta('property', 'og:image:width', String(SITE.ogImageWidth))
    upsertMeta('property', 'og:image:height', String(SITE.ogImageHeight))
    upsertMeta('property', 'og:locale', SITE.locale)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    if (SITE.twitter) upsertMeta('name', 'twitter:site', SITE.twitter)
    upsertMeta('name', 'twitter:title', seo.title)
    upsertMeta('name', 'twitter:description', seo.description)
    upsertMeta('name', 'twitter:image', image)
    upsertMeta('name', 'twitter:image:alt', `${SITE.name} — ${SITE.tagline}`)

    const canonical = seo.isNotFound
      ? `${SITE.url}/`
      : seo.path === '/'
        ? `${SITE.url}/`
        : absoluteUrl(seo.path)
    upsertLink('canonical', canonical)

    // Organization lives in index.html for first paint / bots — keep runtime in sync
    upsertJsonLd('axevro-org-schema', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      legalName: SITE.legalName,
      url: `${SITE.url}/`,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/brand/axevro-mark.png'),
      },
      image: image,
      email: SITE.email,
      telephone: SITE.phonePrimary,
      description: SITE.description,
      slogan: SITE.tagline,
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: SITE.phonePrimary,
          contactType: 'sales',
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi'],
        },
        {
          '@type': 'ContactPoint',
          telephone: SITE.phoneWhatsApp,
          contactType: 'customer support',
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi'],
        },
      ],
    })

    upsertJsonLd('axevro-website-schema', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      name: SITE.name,
      url: `${SITE.url}/`,
      description: SITE.description,
      inLanguage: 'en-IN',
      publisher: { '@id': `${SITE.url}/#organization` },
    })

    upsertJsonLd(
      'axevro-breadcrumb-schema',
      seo.isNotFound ? null : buildBreadcrumbs(seo),
    )

    if (seo.service) {
      upsertJsonLd('axevro-page-schema', {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: seo.service.title,
        description: seo.service.desc || seo.service.hero,
        provider: { '@id': `${SITE.url}/#organization` },
        areaServed: 'IN',
        url: absoluteUrl(seo.path),
        serviceType: seo.service.title,
      })
    } else if (pathname === '/' || pathname === '') {
      upsertJsonLd('axevro-page-schema', {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${SITE.url}/#business`,
        name: SITE.name,
        description: SITE.description,
        url: `${SITE.url}/`,
        image: image,
        telephone: SITE.phonePrimary,
        email: SITE.email,
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'IN',
        },
        knowsAbout: services.map((s) => s.title),
        makesOffer: services.slice(0, 6).map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.title,
            description: s.desc,
            url: absoluteUrl(`/services/${s.slug}`),
          },
        })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Axevro services',
          itemListElement: services.map((s, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Service',
              name: s.title,
              url: absoluteUrl(`/services/${s.slug}`),
            },
          })),
        },
        workExample: portfolioProjects.map((project) => ({
          '@type': 'CreativeWork',
          name: project.name,
          description: project.summary,
          url: project.url,
          image: absoluteUrl(project.image),
        })),
      })
    } else if (pathname === '/pricing') {
      upsertJsonLd('axevro-page-schema', {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: seo.title,
        description: seo.description,
        url: absoluteUrl('/pricing'),
        isPartOf: { '@id': `${SITE.url}/#website` },
        about: { '@id': `${SITE.url}/#organization` },
      })
    } else if (seo.step) {
      upsertJsonLd('axevro-page-schema', {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: seo.title,
        description: seo.description,
        url: absoluteUrl(seo.path),
        isPartOf: { '@id': `${SITE.url}/#website` },
        about: {
          '@type': 'HowToStep',
          name: seo.step.name,
          text: seo.step.desc || seo.step.hero,
          position: Number(seo.step.num) || undefined,
        },
      })
    } else {
      upsertJsonLd('axevro-page-schema', null)
    }

    if (pathname === '/' || pathname.startsWith('/process')) {
      upsertJsonLd('axevro-howto-schema', {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How Axevro delivers software projects',
        description:
          'Axevro delivery process from discovery through maintenance.',
        step: processSteps.map((step, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: step.name,
          text: step.desc,
          url: absoluteUrl(`/process/${step.slug}`),
        })),
      })
    } else {
      upsertJsonLd('axevro-howto-schema', null)
    }
  }, [pathname])

  return null
}
