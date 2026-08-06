import { useQuery } from '@tanstack/react-query';
import { type ReactNode } from 'react';

import LoadingSpinner from '@components/common/LoadingSpinner';
import ImageCarousel from '@components/common/ImageCarousel';

import { getPortfolioDetail } from '@services/portfolioService';
import formatDateKST from '@utils/commonUtils';

interface DetailProps {
  id: string;
}

// 테스트용 하드코딩 contents (실제로는 data.project_details?.contents 사용)
const SAMPLE_PROJECT_CONTENTS = `
  <h2>프로젝트 배경</h2>
  <p>
    기존 포트폴리오는 정적인 마크다운 파일로 관리되고 있었는데, 프로젝트가 늘어날수록
    <strong>수정과 배포가 번거로워지는 문제</strong>가 있었습니다. 이를 해결하기 위해
    Supabase를 기반으로 한 CMS 형태의 관리 구조로 전환하기로 결정했습니다.
  </p>

  <h2>기술적 의사결정</h2>
  <p>
    프론트엔드는 <strong>React + TypeScript</strong> 조합으로 타입 안정성을 확보했고,
    서버 상태 관리는 TanStack Query를 도입해 캐싱과 리페칭 로직을 단순화했습니다.
  </p>

  <blockquote>
    관리자만 접근하는 입력 필드이기 때문에, 별도의 리치 텍스트 에디터 없이
    HTML을 직접 작성해 저장하는 방식을 채택했습니다.
  </blockquote>

  <h3>주요 구현 사항</h3>
  <ul>
    <li>Supabase 조인 쿼리를 활용한 프로젝트 상세 데이터 정규화</li>
    <li>이미지 캐러셀 컴포넌트 재사용성 개선</li>
    <li>다크 테마 기반의 일관된 타이포그래피 시스템 구축</li>
  </ul>

  <h3>트러블슈팅</h3>
  <p>
    같은 테이블을 두 번 조인하는 쿼리 구조에서 예상치 못한 응답 형식 문제가 발생했는데,
    <code>project_details</code> 조인을 하나로 통합하여 해결했습니다.
  </p>

  <h2>회고</h2>
  <p>
    처음부터 완벽한 구조를 설계하기보다, <strong>실제 사용 패턴에 맞춰 점진적으로
    리팩토링</strong>해나가는 방식이 더 효율적이라는 걸 다시 확인한 프로젝트였습니다.
  </p>
`;

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

          {/*<div className="my-16 flex items-center gap-4">*/}
          {/*  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-700 to-neutral-700" />*/}
          {/*  <span className="h-1.5 w-1.5 rotate-45 border border-[#C9A66B]" />*/}
          {/*  <span className="h-px flex-1 bg-gradient-to-l from-transparent via-neutral-700 to-neutral-700" />*/}
          {/*</div>*/}

          {/*<p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-[#C9A66B]">Details</p>*/}

          <div
            className="prose prose-invert max-w-none text-lg leading-9 text-neutral-300
              [counter-reset:section]

              prose-h2:relative prose-h2:[counter-increment:section]
              prose-h2:mt-20 prose-h2:mb-8 prose-h2:pt-10
              prose-h2:border-t prose-h2:border-neutral-800
              prose-h2:font-serif prose-h2:text-3xl prose-h2:font-normal prose-h2:text-white
              prose-h2:before:absolute prose-h2:before:-top-[2px] prose-h2:before:left-0
              prose-h2:before:font-mono prose-h2:before:text-[11px] prose-h2:before:font-semibold
              prose-h2:before:tracking-[0.3em] prose-h2:before:text-[#C9A66B]
              prose-h2:before:content-['SECTION_'_counter(section,decimal-leading-zero)]
              prose-h2:before:bg-neutral-950 prose-h2:before:pr-4

              prose-h3:mt-10 prose-h3:mb-4 prose-h3:flex prose-h3:items-center prose-h3:gap-3
              prose-h3:text-lg prose-h3:font-semibold prose-h3:tracking-wide prose-h3:text-neutral-100
              prose-h3:before:h-1.5 prose-h3:before:w-1.5 prose-h3:before:shrink-0 prose-h3:before:rotate-45
              prose-h3:before:border prose-h3:before:border-[#C9A66B] prose-h3:before:content-['']

              prose-p:leading-9 prose-p:text-neutral-300
              prose-strong:text-[#C9A66B] prose-strong:font-semibold

              prose-a:text-[#C9A66B] prose-a:underline prose-a:underline-offset-4 prose-a:decoration-neutral-700 hover:prose-a:decoration-[#C9A66B]

              prose-ul:my-6 prose-li:marker:text-[#C9A66B]
              prose-ol:my-6

              prose-blockquote:relative prose-blockquote:my-8 prose-blockquote:rounded-r-xl
              prose-blockquote:border-l-2 prose-blockquote:border-[#C9A66B]
              prose-blockquote:bg-neutral-900/60 prose-blockquote:py-4 prose-blockquote:pl-6 prose-blockquote:pr-4
              prose-blockquote:font-serif prose-blockquote:text-base prose-blockquote:not-italic prose-blockquote:text-neutral-300

              prose-hr:border-neutral-800
              prose-img:rounded-2xl prose-img:border prose-img:border-neutral-800

              prose-code:rounded prose-code:bg-neutral-900 prose-code:px-1.5 prose-code:py-0.5
              prose-code:text-[#C9A66B] prose-code:before:content-none prose-code:after:content-none"
            dangerouslySetInnerHTML={{ __html: SAMPLE_PROJECT_CONTENTS }}
          />
        </article>
      </div>
    </section>
  );
};

export default Detail;
