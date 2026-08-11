import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import App from './App.jsx'

const rootEl = document.getElementById('root')

if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <App />
      <Toaster
        richColors
        position="top-center"
        closeButton
        toastOptions={{
          style: {
            marginTop: '4.5rem',
          },
        }}
      />
    </StrictMode>,
  )
}
