import { getWhatsAppUrl, INSTAGRAM_URL, LINKEDIN_URL } from '../../data/contact'
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from '../ui/SocialIcons'

const socialLinks = [
  {
    href: getWhatsAppUrl(),
    label: 'WhatsApp',
    shortLabel: 'WhatsApp',
    Icon: WhatsAppIcon,
    style:
      'border-[#25D366]/35 bg-[#25D366]/10 text-[#25D366] hover:border-[#25D366]/60 hover:bg-[#25D366]/18 focus-visible:ring-[#25D366]/45',
    iconBg: 'bg-[#25D366]/15 group-hover:bg-[#25D366]/25 sm:bg-transparent sm:group-hover:bg-transparent',
  },
  {
    href: INSTAGRAM_URL,
    label: 'Instagram',
    shortLabel: 'Instagram',
    Icon: InstagramIcon,
    style:
      'border-[#E4405F]/35 bg-gradient-to-br from-[#833AB4]/12 via-[#E4405F]/10 to-[#FCAF45]/10 text-[#F77777] hover:border-[#E4405F]/55 hover:from-[#833AB4]/18 hover:via-[#E4405F]/16 hover:to-[#FCAF45]/14 focus-visible:ring-[#E4405F]/45',
    iconBg: 'bg-[#E4405F]/15 group-hover:bg-[#E4405F]/25 sm:bg-transparent sm:group-hover:bg-transparent',
  },
  {
    href: LINKEDIN_URL,
    label: 'LinkedIn',
    shortLabel: 'LinkedIn',
    Icon: LinkedInIcon,
    style:
      'border-[#0A66C2]/35 bg-[#0A66C2]/10 text-[#5BA3E0] hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/18 focus-visible:ring-[#0A66C2]/45',
    iconBg: 'bg-[#0A66C2]/15 group-hover:bg-[#0A66C2]/25 sm:bg-transparent sm:group-hover:bg-transparent',
  },
]

function SocialLink({ href, label, shortLabel, Icon, style, iconBg }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={`group inline-flex min-h-11 min-w-0 flex-col items-center justify-center gap-1.5 rounded-[2px] border px-2 py-2.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:flex-row sm:justify-start sm:gap-2.5 sm:px-3.5 sm:py-2.5 md:px-4 ${style}`}
    >
      <span
        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] transition-colors duration-200 sm:h-auto sm:w-auto ${iconBg}`}
      >
        <Icon />
      </span>
      <span className="max-w-full truncate text-center text-[11px] font-medium leading-none tracking-wide sm:text-left sm:text-[13px]">
        {shortLabel}
      </span>
    </a>
  )
}

export default function FooterSocialLinks() {
  return (
    <div className="mt-4 sm:mt-5">
      <p className="mb-2.5 font-mono text-[10px] tracking-[1.1px] text-gold-bright/85 uppercase sm:text-[11px]">
        Connect
      </p>
      <nav
        className="grid max-w-full grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-2.5"
        aria-label="Social media"
      >
        {socialLinks.map((item) => (
          <SocialLink key={item.label} {...item} />
        ))}
      </nav>
    </div>
  )
}
