import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-white">Keen Keeper</p>
          <p className="mt-2 text-sm text-slate-400">Stay connected with friends, schedule check-ins, and track every interaction.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link to="/" className="text-slate-300 transition hover:text-white">
            Home
          </Link>
          <Link to="/timeline" className="text-slate-300 transition hover:text-white">
            Timeline
          </Link>
          <Link to="/stats" className="text-slate-300 transition hover:text-white">
            Analytics
          </Link>
        </div>
      </div>
    </footer>
  )
}
