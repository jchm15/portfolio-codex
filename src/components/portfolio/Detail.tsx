import { useQuery } from '@tanstack/react-query';
import { type ReactNode } from 'react';

import LoadingSpinner from '@components/common/LoadingSpinner';
import ImageCarousel from '@components/common/ImageCarousel';

import { getPortfolioDetail } from '@services/portfolioService';
import formatDateKST from '@utils/commonUtils';

interface DetailProps {
  id: string;
}

const Spec = ({ label, value }: { label: string; value: ReactNode }) => {
  return (
    <div className="flex items-start justify-between border-b border-neutral-800 py-5">
      <span className="text-sm uppercase tracking-[0.25em] text-neutral-500">{label}</span>

      <div className="text-right text-neutral-100">{value}</div>
    </div>
  );
};

const Detail = ({ id }: DetailProps) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['portfolio', 'detail', id],
    queryFn: () => getPortfolioDetail(id),
  });

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !data) {
    return <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-neutral-400">Error</div>;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-16">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#C9A66B]">Case Study</p>

        <h1 className="mt-5 font-serif text-6xl leading-tight text-white">{data.proj_name}</h1>

        {/*<p className="mt-8 max-w-3xl text-lg leading-8 text-neutral-400">*/}
        {/*    프로젝트의 목적과 구현 과정,*/}
        {/*    그리고 기술적인 의사결정을 정리한 기록입니다.*/}
        {/*</p>*/}
      </div>

      <div className="overflow-hidden rounded-[32px] border border-neutral-800 bg-neutral-900">
        <div className="aspect-video">
          <ImageCarousel images={data.project_images} alt={data.proj_name} />
        </div>
      </div>

      <div className="mt-24 grid gap-20 lg:grid-cols-[320px_1fr]">
        <aside>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-[#C9A66B]">Information</p>

          <Spec
            label="Period"
            value={
              <>
                {formatDateKST(data.start_date)}
                <br />
                {formatDateKST(data.end_date)}
              </>
            }
          />

          <Spec
            label="Role"
            value={
              <div className="space-y-2">
                {data.project_roles.map((role) => (
                  <div key={role.id}>{role.role_name}</div>
                ))}
              </div>
            }
          />

          <Spec
            label="Stack"
            value={
              <div className="flex flex-wrap justify-end gap-2">
                {data.project_skills.map((skill) => (
                  <span key={skill.id} className="rounded-full border border-neutral-700 px-3 py-1 text-xs">
                    {skill.skill_name}
                  </span>
                ))}
              </div>
            }
          />
        </aside>

        <article>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-[#C9A66B]">Overview</p>

          <div className="prose prose-invert max-w-none">
            <p className="whitespace-pre-line text-lg leading-9 text-neutral-300">
              {data.project_details?.description}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Detail;
