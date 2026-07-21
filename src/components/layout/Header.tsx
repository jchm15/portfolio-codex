import { Link, useLocation } from '@tanstack/react-router';
import { motion } from 'motion/react';

const NAV_ITEMS = [
  {
    to: '/',
    label: '~/home',
    matchPaths: ['/'],
  },
  {
    to: '/portfolio',
    label: './projects',
    matchPaths: ['/portfolio', '/detail'],
  },
] as const;

const Header = () => {
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="sticky top-0 z-50 border-b border-neutral-900 bg-neutral-950/70 backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 transition-all duration-300 group-hover:border-[#C9A66B]/40 group-hover:bg-[#C9A66B]/10">
            <span className="font-mono text-sm text-[#C9A66B]">&gt;_</span>
          </div>

          <div>
            <p className="font-serif text-lg tracking-wide text-neutral-100">CONSOLE.LOG</p>

            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">frontend engineer</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 p-1 backdrop-blur-xl">
          {NAV_ITEMS.map((item) => {
            const active = item.matchPaths.some((path) => {
              if (path === '/') {
                return location.pathname === '/'
              }

              return location.pathname.startsWith(path)
            })

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative rounded-full px-5 py-2 font-mono text-xs transition-all duration-300 ${
                  active ? 'text-neutral-950' : 'text-neutral-500 hover:text-neutral-100'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="nav-active"
                    transition={{
                      type: 'spring',
                      bounce: 0.25,
                      duration: 0.6,
                    }}
                    className="absolute inset-0 rounded-full bg-[#C9A66B]"
                  />
                )}

                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

            <span className="font-mono text-xs text-neutral-400">AVAILABLE</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
