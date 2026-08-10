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
    // Keep UI recoverable without noisy console spam in production.
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex min-h-[50svh] max-w-[640px] flex-col items-center justify-center px-4 py-20 text-center">
          <div className="font-mono text-[11px] tracking-[1.5px] text-gold-deep uppercase">
            Something went wrong
          </div>
          <h1 className="font-display mt-3 text-[clamp(24px,4vw,36px)] font-semibold">
            We hit an unexpected issue
          </h1>
          <p className="mt-3 text-[15px] text-gray">
            Please refresh the page or head back home. Your data is safe.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="btn-primary"
              onClick={() => window.location.reload()}
            >
              Refresh page
            </button>
            <Link to="/" className="inline-flex items-center justify-center border border-line px-5 py-3 text-sm font-semibold">
              Go home
            </Link>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
