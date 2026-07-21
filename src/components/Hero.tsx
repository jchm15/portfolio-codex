import { Link } from '@tanstack/react-router';
import { motion } from 'motion/react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b border-neutral-900 bg-neutral-950">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#C9A66B]/10 blur-[180px]" />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center px-6">
        <div className="grid w-full items-center gap-20 lg:grid-cols-[1.25fr_.75fr]">
          <motion.div
            initial={{ opacity: 0, y: 32, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8 inline-flex items-center rounded-full border border-[#C9A66B]/30 bg-[#C9A66B]/10 px-4 py-2">
              <span className="font-mono text-xs tracking-[0.3em] text-[#C9A66B]">console.log</span>
            </div>

            <h1 className="font-serif text-5xl leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              에러와 함께 성장한
              <br />
              커밋들의 기록.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-400">
              수백 번의 <code className="rounded bg-neutral-900 px-1.5 py-0.5 text-neutral-200">console.log()</code> 와{' '}
              <code className="rounded bg-neutral-900 px-1.5 py-0.5 text-neutral-200">git revert</code> 끝에
              <br />
              살아남은 프로젝트들을 소개합니다.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link
                to="/portfolio"
                className="group inline-flex items-center rounded-full bg-[#C9A66B] px-7 py-3 text-sm font-semibold text-neutral-950 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(201,166,107,.25)]"
              >
                git log --oneline
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>

              <button className="rounded-full border border-neutral-700 px-7 py-3 text-sm font-medium text-neutral-300 transition-all duration-300 hover:border-neutral-500 hover:bg-neutral-900 hover:text-white">
                GitHub
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, filter: 'blur(12px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.15, duration: 0.9 }}
            className="hidden lg:block"
          >
            <div className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-5">
                <span className="font-mono text-xs uppercase tracking-[0.35em] text-neutral-500">workspace.status</span>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-xs text-neutral-500">Online</span>
                </div>
              </div>

              <div className="space-y-8 p-6">
                <div>
                  <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-500">Current Stack</p>

                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'TanStack', 'Spring', 'Supabase'].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-neutral-700 bg-neutral-950/60 px-3 py-1 text-xs text-neutral-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-500">Latest Commit</p>

                  <div className="rounded-2xl border border-neutral-800 bg-black/40 p-4 font-mono text-sm text-neutral-300">
                    feat(portfolio): redesign landing page
                  </div>
                </div>

                <div>
                  <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-500">Status</p>

                  <div className="flex items-center gap-3 rounded-2xl border border-neutral-800 bg-black/30 px-4 py-3">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                    <span className="text-sm text-neutral-300">Currently Building</span>
                  </div>
                </div>

                <div>
                  <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-500">Terminal</p>

                  <div className="rounded-2xl border border-neutral-800 bg-black/60 p-4 font-mono text-xs leading-7 text-neutral-400">
                    <div className="text-[#C9A66B]">$ git status</div>
                    <div>On branch main</div>
                    <div>Your branch is up to date.</div>
                    <div className="mt-3 text-emerald-400">working tree clean ✓</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
