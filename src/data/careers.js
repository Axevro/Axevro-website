export const CAREER_ROLES = [
  {
    id: 'fullstack',
    title: 'Full-Stack Developer',
    type: 'Full-time / Contract',
    employmentType: 'FULL_TIME',
    location: 'Remote · India',
    summary:
      'Build product UIs and APIs end-to-end — React, Node, and cloud-ready delivery.',
  },
  {
    id: 'frontend',
    title: 'Frontend Developer (React)',
    type: 'Full-time / Contract',
    employmentType: 'FULL_TIME',
    location: 'Remote · India',
    summary:
      'Craft fast, accessible interfaces with React, Tailwind, and strong UX judgment.',
  },
  {
    id: 'flutter',
    title: 'Flutter Developer',
    type: 'Full-time / Contract',
    employmentType: 'FULL_TIME',
    location: 'Remote · India',
    summary:
      'Ship polished Android/iOS apps with clean architecture and production quality.',
  },
  {
    id: 'bde',
    title: 'Business Development Executive (BDE)',
    type: 'Full-time / Contract',
    employmentType: 'FULL_TIME',
    location: 'Remote · India',
    summary:
      'Own outreach, client conversations, and proposal follow-ups — help Axevro grow with clear, honest sales.',
  },
  {
    id: 'design',
    title: 'UI / UX Designer',
    type: 'Contract / Project',
    employmentType: 'CONTRACTOR',
    location: 'Remote · India',
    summary:
      'Design clear product flows and brand-led visuals for web and mobile products.',
  },
  {
    id: 'open',
    title: 'Open Application',
    type: 'Flexible',
    employmentType: 'OTHER',
    location: 'Remote · India',
    summary:
      'Don’t see your role? Tell us how you can help Axevro grow — we’re always listening.',
  },
]

export const CAREER_PERKS = [
  {
    icon: 'handshake',
    title: 'Real ownership',
    text: 'Work directly on client products with clear impact — not endless ticket queues.',
  },
  {
    icon: 'schedule',
    title: 'Flexible rhythm',
    text: 'Remote-friendly collaboration with focused delivery and honest timelines.',
  },
  {
    icon: 'school',
    title: 'Grow with projects',
    text: 'Learn modern stacks across web, mobile, and cloud on live builds.',
  },
]

export function getCareerRoleById(id) {
  return CAREER_ROLES.find((role) => role.id === id) || null
}
