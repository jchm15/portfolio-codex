import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import LoadingSpinner from '@components/common/LoadingSpinner';
import ListNoProject from '@components/no-data/ListNoProject';
import NoImage from '@components/no-data/NoImage';

import { getPortfolioGallery } from '@services/portfolioService';
import formatDateKST from '@utils/commonUtils';

export const Route = createFileRoute('/portfolio')({
  component: PortfolioComponent,
});

function PortfolioComponent() {
  const navigate = useNavigate();

  const redirectDetail = async (id: number) => {
    await navigate({
      to: '/detail/$id',
      params: {
        id: String(id),
      },
    });
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['portfolio', 'gallery'],
    queryFn: () => getPortfolioGallery(),
  });

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-neutral-400">
        Error : {(error as Error).message}
      </div>
    );
  }

  const projects = data ?? [];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-20">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#C9A66B]">Archive</p>

        <h1 className="mt-5 font-serif text-6xl text-white">Selected Projects</h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-400">
          실제 개발했던 프로젝트들을 목적, 역할 그리고 기술적인 관점에서 정리했습니다.
        </p>
      </div>

      {projects.length === 0 ? (
        <ListNoProject />
      ) : (
        <div className="space-y-10">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => redirectDetail(project.id)}
              className="group grid w-full gap-10 rounded-[32px] border border-neutral-800 bg-neutral-900/40 p-6 text-left transition-all duration-500 hover:border-[#C9A66B]/40 hover:bg-neutral-900 lg:grid-cols-[420px_1fr]"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-900">
                {project.project_images.length > 0 ? (
                  <img
                    src={project.project_images[0].image_url}
                    alt={project.proj_name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <NoImage />
                )}
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="mb-5 flex items-center gap-4">
                    <span className="font-serif text-5xl text-neutral-700 transition group-hover:text-[#C9A66B]">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="h-px flex-1 bg-neutral-800" />
                  </div>

                  <h2 className="text-4xl font-semibold text-white transition group-hover:translate-x-1">
                    {project.proj_name}
                  </h2>

                  <p className="mt-8 text-neutral-500">
                    {formatDateKST(project.start_date)}
                    <span className="mx-2">—</span>
                    {formatDateKST(project.end_date)}
                  </p>
                </div>

                <div className="mt-12 flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">View Detail</span>

                  <span className="text-2xl text-[#C9A66B] transition group-hover:translate-x-2">→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
