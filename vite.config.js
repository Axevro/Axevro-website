import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function contactApiDevPlugin() {
  return {
    name: 'axevro-contact-api-dev',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0]
        if (url !== '/api/contact') {
          next()
          return
        }

        if (res.writableEnded) return

        try {
          // Always reload latest handler + env during local development
          const mod = await server.ssrLoadModule('/api/contact.js')
          await mod.default(req, res)
        } catch (error) {
          if (res.writableEnded) return
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(
            JSON.stringify({
              ok: false,
              error:
                'Local contact API failed. Restart npm run dev and check .env.local.',
              detail: error?.message,
            }),
          )
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  for (const [key, value] of Object.entries(env)) {
    process.env[key] = value
  }

  return {
    plugins: [contactApiDevPlugin(), react(), tailwindcss()],
    server: {
      host: true,
      port: 5173,
      strictPort: false,
      cors: true,
    },
    preview: {
      host: true,
      port: 4173,
      strictPort: false,
      cors: true,
    },
  }
})
