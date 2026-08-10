const EMAIL_PATTERN = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g

function isEmail(value) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
}

/** Renders plain text with email addresses as clickable green mailto links. */
export default function LinkedText({ text, className = '' }) {
  const parts = String(text).split(EMAIL_PATTERN)

  return (
    <span className={className}>
      {parts.map((part, index) =>
        isEmail(part) ? (
          <a
            key={`${part}-${index}`}
            href={`mailto:${part}`}
            className="font-medium text-green underline decoration-green/35 underline-offset-2 transition-colors hover:text-green-deep hover:decoration-green"
          >
            {part}
          </a>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </span>
  )
}

export const CONTACT_EMAIL = 'axevro9@gmail.com'
