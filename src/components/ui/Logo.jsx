const sizes = {
  sm: { height: 34, text: 20, gap: 10 },
  md: { height: 42, text: 24, gap: 12 },
  lg: { height: 56, text: 32, gap: 14 },
}

/**
 * Horizontal lockup only: [mark] AXEVRO — never stacked.
 */
export default function Logo({
  size = 'sm',
  showWordmark = true,
  showTagline = false,
  inverted = false,
  className = '',
}) {
  const s = sizes[size] ?? sizes.sm

  return (
    <div
      className={className}
      style={{
        display: 'inline-grid',
        gridAutoFlow: 'column',
        gridTemplateRows: '1fr',
        alignItems: 'center',
        columnGap: s.gap,
        width: 'max-content',
        maxWidth: '100%',
      }}
    >
      <img
        src="/brand/axevro-mark.png"
        alt={showWordmark ? '' : 'Axevro'}
        aria-hidden={showWordmark ? true : undefined}
        width={Math.round(s.height * 1.25)}
        height={s.height}
        loading="eager"
        decoding="async"
        onError={(event) => {
          event.currentTarget.style.visibility = 'hidden'
        }}
        style={{
          height: s.height,
          width: 'auto',
          flexShrink: 0,
          display: 'block',
          objectFit: 'contain',
          verticalAlign: 'middle',
        }}
      />

      {showWordmark ? (
        <span
          className="font-display font-bold"
          style={{
            fontSize: s.text,
            letterSpacing: '0.06em',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            display: 'inline-block',
            verticalAlign: 'middle',
            color: inverted ? undefined : '#0A0B0D',
            backgroundImage: inverted
              ? 'linear-gradient(100deg,#E8C468 0%,#C9A227 50%,#4ADE80 100%)'
              : undefined,
            WebkitBackgroundClip: inverted ? 'text' : undefined,
            backgroundClip: inverted ? 'text' : undefined,
            WebkitTextFillColor: inverted ? 'transparent' : undefined,
          }}
        >
          AXEVRO
        </span>
      ) : null}

      {showWordmark && showTagline ? (
        <span
          className="font-mono"
          style={{
            display: 'none',
            fontSize: 11,
            letterSpacing: '0.14em',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            color: inverted ? '#E8C468' : '#8A6A1E',
            borderLeft: inverted
              ? '1px solid rgba(255,255,255,0.22)'
              : '1px solid #E4E1D6',
            paddingLeft: 12,
            marginLeft: 2,
          }}
        >
          Building Digital Excellence
        </span>
      ) : null}
    </div>
  )
}

export function LogoMark({ className = 'h-16 w-16' }) {
  return (
    <img
      src="/brand/axevro-mark.png"
      alt="Axevro"
      className={`object-contain ${className}`}
      loading="lazy"
      decoding="async"
      onError={(event) => {
        event.currentTarget.style.visibility = 'hidden'
      }}
    />
  )
}
