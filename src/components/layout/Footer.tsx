import { useTechStack } from '@hooks/useTechSkill';
import { iconMap } from '@utils/iconMap';

const Footer = () => {
  const { data: techStack } = useTechStack('Y');

  return (
    <footer className="border-t border-neutral-900 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-[1fr_auto]">
          {/* Developer Info */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#C9A66B]">Built by</p>

            <h2 className="mt-5 font-serif text-4xl leading-tight text-white">Cho HyeonMin</h2>

            <p className="mt-3 text-lg text-neutral-400">Frontend Developer</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://github.com/jchm15"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-700 px-6 py-3 text-sm text-neutral-300 transition hover:border-[#C9A66B]/40 hover:text-white"
              >
                GitHub
              </a>

              <a
                href="mailto:jchm15@naver.com"
                className="rounded-full border border-neutral-700 px-6 py-3 text-sm text-neutral-300 transition hover:border-[#C9A66B]/40 hover:text-white"
              >
                Email
              </a>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="lg:text-right">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-neutral-500">Built With</p>

            <div className="flex max-w-md flex-wrap gap-3 lg:justify-end">
              {techStack?.map((stack) => {
                const Icon = iconMap[stack.icon_key];

                if (!Icon) return null;

                return (
                  <div
                    key={stack.id}
                    className="group relative flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2 transition hover:border-[#C9A66B]/40"
                  >
                    <Icon
                      size={16}
                      style={{
                        color: stack.color,
                      }}
                    />

                    {/* Tooltip */}
                    <div
                      className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-neutral-800 bg-neutral-900
                                 px-3 py-1.5 text-xs text-neutral-200 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100"
                    >
                      {stack.name}

                      {/* Tooltip Arrow */}
                      <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-neutral-900" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Copyright */}
            <div className="mt-16 border-t border-neutral-900 pt-8">
              <p className="font-mono text-xs text-neutral-600">© 2026 CHO HYUNMIN</p>

              <p className="mt-2 text-sm text-neutral-500">Designed & Developed with React, TypeScript and Coffee.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
