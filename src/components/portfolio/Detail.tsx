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

          <div className="my-16 flex items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-700 to-neutral-700" />
            <span className="h-1.5 w-1.5 rotate-45 border border-[#C9A66B]" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-neutral-700 to-neutral-700" />
          </div>

          <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-[#C9A66B]">Details</p>

          <div
            className="prose prose-invert max-w-none text-lg leading-9 text-neutral-300
              prose-headings:font-serif prose-headings:text-white
              prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-3xl
              prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl
              prose-p:leading-9 prose-p:text-neutral-300
              prose-strong:text-[#C9A66B] prose-strong:font-semibold
              prose-a:text-[#C9A66B] prose-a:underline prose-a:underline-offset-4 prose-a:decoration-neutral-700 hover:prose-a:decoration-[#C9A66B]
              prose-ul:my-6 prose-li:marker:text-[#C9A66B]
              prose-ol:my-6
              prose-blockquote:border-l-[#C9A66B] prose-blockquote:text-neutral-400 prose-blockquote:not-italic
              prose-hr:border-neutral-800
              prose-img:rounded-2xl prose-img:border prose-img:border-neutral-800
              prose-code:text-[#C9A66B] prose-code:bg-neutral-900 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none"
            dangerouslySetInnerHTML={{ __html: data.project_details?.contents ?? '' }}
          />
        </article>
      </div>
    </section>
  );
};

export default Detail;
