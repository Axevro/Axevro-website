export const processSteps = [
  {
    num: '01',
    slug: 'discovery-requirement-analysis',
    step: 'STEP 01',
    icon: 'search',
    name: 'Discovery & Requirement Analysis',
    desc: 'Understanding your goals, users, and constraints',
    hero: 'Clarify goals, users, and constraints before a single line of code.',
    overview:
      'Discovery is where we remove ambiguity. We align on business outcomes, user needs, technical constraints, and success metrics so the rest of the build stays focused and efficient.',
    highlights: [
      'Stakeholder interviews and goal mapping',
      'User journey and problem definition',
      'Scope boundaries and priority ranking',
      'Technical feasibility assessment',
      'Clear success metrics and delivery expectations',
    ],
    activities: [
      'Collect business and product requirements',
      'Identify must-have vs nice-to-have features',
      'Review existing systems, data, and integrations',
      'Document risks, assumptions, and open questions',
      'Prepare a shared discovery summary for sign-off',
    ],
    outcome:
      'A clear requirements brief that guides design, architecture, and sprint planning.',
  },
  {
    num: '02',
    slug: 'planning-ui-ux-design',
    step: 'STEP 02',
    icon: 'design_services',
    name: 'Planning & UI/UX Design',
    desc: 'Wireframes and interactive prototypes before code',
    hero: 'Design decisions first — so engineering builds the right product.',
    overview:
      'We translate discovery insights into flows, wireframes, and high-fidelity interfaces. This stage locks structure and experience before expensive development work begins.',
    highlights: [
      'Information architecture and user flows',
      'Low-fidelity wireframes for rapid feedback',
      'High-fidelity UI design and interaction states',
      'Responsive layouts for mobile and desktop',
      'Design handoff ready for engineering',
    ],
    activities: [
      'Map key screens and navigation structure',
      'Prototype critical journeys',
      'Refine visual system and component patterns',
      'Validate usability with stakeholders',
      'Finalize design specs for build',
    ],
    outcome:
      'Approved UI/UX direction and prototypes that reduce rework during development.',
  },
  {
    num: '03',
    slug: 'development',
    step: 'STEP 03',
    icon: 'code',
    name: 'Development',
    desc: 'Sprint-based build across frontend, backend, and infra',
    hero: 'Sprint-based engineering across frontend, backend, and infrastructure.',
    overview:
      'Our teams build in focused sprints with clear milestones. Frontend, backend, and integrations progress together so features are demoable, testable, and production-minded from the start.',
    highlights: [
      'Agile sprint planning and demos',
      'Frontend and backend implementation',
      'API, auth, and third-party integrations',
      'Code quality reviews and testing',
      'Staging environments for continuous feedback',
    ],
    activities: [
      'Break scope into sprint-ready backlog items',
      'Implement UI and business logic in parallel',
      'Integrate services, databases, and APIs',
      'Run reviews, QA checks, and demos',
      'Iterate based on stakeholder feedback',
    ],
    outcome:
      'A working product increment each sprint, moving steadily toward launch readiness.',
  },
  {
    num: '04',
    slug: 'cicd-cloud-deployment',
    step: 'STEP 04',
    icon: 'cloud_done',
    name: 'CI/CD & Cloud Deployment',
    desc: 'Docker, GitHub Actions & AWS release engineering',
    hero: 'Enterprise-grade release engineering with Docker, GitHub Actions, and AWS.',
    overview:
      'Deployment is treated as a critical reliability phase — not a final checklist item. We design secure containerization, automated pipelines, and cloud infrastructure so every release is controlled, observable, and production-ready.',
    highlights: [
      'Dockerized application builds and image hardening',
      'GitHub Actions CI/CD with quality gates',
      'AWS environment architecture and provisioning',
      'Blue/green or staged production rollout strategy',
      'Monitoring, logging, alerting, and rollback readiness',
    ],
    activities: [
      'Create and optimize production Docker images',
      'Automate test, build, security, and deploy pipelines',
      'Configure cloud networking, IAM, and services',
      'Execute staging validation and production cutover',
      'Establish post-release observability and runbooks',
    ],
    outcome:
      'A hardened deployment operating model that protects uptime and accelerates future releases.',
    elevatedCharges: true,
  },
  {
    num: '05',
    slug: 'maintenance',
    step: 'STEP 05',
    icon: 'support_agent',
    name: 'Maintenance',
    desc: 'Monitoring, updates, and ongoing support',
    hero: 'Keep the product healthy after launch with proactive support.',
    overview:
      'Launch is not the end. We monitor performance, fix issues quickly, ship improvements, and keep dependencies secure so your product stays reliable as it grows.',
    highlights: [
      'Uptime and performance monitoring',
      'Bug fixes and priority incident response',
      'Feature enhancements and backlog delivery',
      'Security and dependency updates',
      'Regular health reports and planning',
    ],
    activities: [
      'Track production metrics and alerts',
      'Triage and resolve reported issues',
      'Ship iterative improvements',
      'Apply updates and harden security',
      'Review roadmap for continuous growth',
    ],
    outcome:
      'A supported product with ongoing stability, visibility, and improvement velocity.',
  },
]

export function getProcessBySlug(slug) {
  if (!slug || typeof slug !== 'string') return undefined
  return processSteps.find((step) => step.slug === slug)
}
