import { useState } from 'react'
import { Home, ListChecks, ChartPie, Menu, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/timeline', label: 'Timeline', icon: ListChecks },
  { href: '/stats', label: 'Stats', icon: ChartPie },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-950 text-white shadow-sm">
            KK
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-950">Keen Keeper</p>
            <p className="text-xs text-slate-500">Friendship tracker</p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-950 md:hidden"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <nav className="hidden items-center gap-2 justify-end md:flex">
          {links.map(({ href, label, icon: Icon }) => (
            <NavLink
              key={href}
              to={href}
              end
              className={({ isActive }) =>
                `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/10' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white px-6 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 pt-4">
            {links.map(({ href, label, icon: Icon }) => (
              <NavLink
                key={href}
                to={href}
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-slate-950 text-white border-slate-950' : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
