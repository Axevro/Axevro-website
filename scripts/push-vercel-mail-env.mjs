# Push local mail secrets to Vercel (Production + Preview)
# Run once after: npx vercel login
# Usage:  node scripts/push-vercel-mail-env.mjs

import { readFileSync, existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

function loadEnvLocal() {
  const path = '.env.local'
  if (!existsSync(path)) {
    throw new Error('Missing .env.local — create it from .env.example first.')
  }
  const out = {}
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const i = t.indexOf('=')
    if (i < 0) continue
    out[t.slice(0, i).trim()] = t.slice(i + 1).trim()
  }
  return out
}

function upsertEnv(key, value, environment) {
  if (!value) {
    console.log(`skip ${key} (${environment}) — empty`)
    return
  }

  // Remove existing value silently if present
  spawnSync('npx', ['vercel', 'env', 'rm', key, environment, '-y'], {
    stdio: 'ignore',
    shell: true,
  })

  const result = spawnSync(
    'npx',
    ['vercel', 'env', 'add', key, environment],
    {
      input: `${value}\n`,
      encoding: 'utf8',
      shell: true,
    },
  )

  if (result.status === 0) {
    console.log(`ok  ${key} → ${environment}`)
  } else {
    console.error(`fail ${key} → ${environment}`)
    if (result.stderr) console.error(result.stderr)
    if (result.stdout) console.error(result.stdout)
  }
}

const env = loadEnvLocal()
const keys = [
  'GMAIL_USER',
  'GMAIL_APP_PASSWORD',
  'CONTACT_INBOX',
  'COMPANY_NAME',
  'BREVO_SMTP_HOST',
  'BREVO_SMTP_PORT',
  'BREVO_SMTP_USER',
  'BREVO_SMTP_PASS',
  'BREVO_SENDER_EMAIL',
  'BREVO_SENDER_NAME',
]

const environments = ['production', 'preview']

console.log('Pushing mail env vars to Vercel…')
for (const environment of environments) {
  for (const key of keys) {
    upsertEnv(key, env[key], environment)
  }
}

console.log('\nDone. Now run: npx vercel --prod')
console.log('Or trigger Redeploy from the Vercel dashboard.')
