import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <p className="text-sm uppercase tracking-[0.28em] text-slate-500">404 — Page not found</p>
      <h1 className="mt-4 text-4xl font-semibold text-slate-950">We couldn’t find that page.</h1>
      <p className="mt-4 text-slate-600">The route you entered does not exist. Use the navigation to go back to a valid page.</p>
      <Link to="/" className="mt-8 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
        Return home
      </Link>
    </section>
  )
}
