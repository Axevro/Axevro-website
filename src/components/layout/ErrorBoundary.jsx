import { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
    // Recoverable UI only — avoid noisy production logging.
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="mx-auto flex min-h-[50svh] max-w-[640px] flex-col items-center justify-center px-4 py-20 text-center"
        >
          <div className="font-mono text-[11px] tracking-[1.5px] text-gold-deep uppercase">
            Something went wrong
          </div>
          <h1 className="font-display mt-3 text-[clamp(24px,4vw,36px)] font-semibold">
            We hit an unexpected issue
          </h1>
          <p className="mt-3 text-[15px] text-gray">
            Please try again or head back home. Your information is safe.
          </p>
          <div className="mt-7 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <button
              type="button"
              className="btn-primary w-full justify-center sm:w-auto"
              onClick={() => window.location.assign('/')}
            >
              Go home
            </button>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center border border-line px-5 py-3 text-sm font-semibold sm:w-auto"
              onClick={() => window.location.reload()}
            >
              Refresh page
            </button>
            <Link
              to="/contact#contact"
              className="inline-flex w-full items-center justify-center border border-line px-5 py-3 text-sm font-semibold sm:w-auto"
            >
              Contact support
            </Link>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
