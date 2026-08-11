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
        우리나라 병원 진료 접수 시스템을 베트남 현지 병원에 도입.
    </p>
   
    <p>
        병원에 대한 환자 신뢰도 부족 → 병원과 환자 간 원활한 연결이 이루어지지 않는 상황<br>
        특정 대형 병원 위주 환자 쏠림 + 7시간 이상의 대기시간 <br>
        대형병원 베트남 보건부 모두 문제 의식을 가지고는 있으나 마땅한 대안은 없는 상황
    </p>
    
    <h2>기술적 의사결정</h2>
    <p>
        첫 PM역할로 시작된 프로젝트로 개발파트 대부분의 의사결정은 KT 담당 PM과 진행상황과 각 이슈를 토대로 그에 맞게 모든것을 결정하면서 진행했습니다.
        프론트엔드 프레임워크로는 Vue3를, 백엔드 프레임워크로는 SpringBoot로, DB는 mySql을 채택하여 프로젝트의 전반적인 설계를 맡아서 진행했습니다.  
    </p>
    
    <p>
        Dr.Around는 사용자/어드민/슈퍼어드민으로 크게 세개의 화면으로 이루어져있습니다.
        - 사용자는 실제 환자가 개인정보를 입력하는 부분부터 접수완료까지의 화면으로 구성되어 있습니다.
        - 어드민은 Dr.Around를 사용하고 있는 병원 쪽으로 대시보드/근무자/환자/병실/대기현황 등으로 구성되어 있습니다.
        - 슈퍼어드민은 KT에서 Dr.Around를 사용하는 병원에 대한 마스터데이터를 관리하며, 각 병원들에 대한 통계 대시보드가 주된 화면으로 구성되어 있습니다. 
    </p>
    
    
    <br>
    <h3>주요 구현 사항</h3>
    <h5>사용자</h5>
    <ul>
        <li>환자접수</li>
        <li>사전 문진표</li>
    </ul><br>
    <h5>어드민</h5>
    <ul>
        <li>대기현황 대시보드</li>
        <li>사전문진표 관리</li>
        <li>환자 관리</li>
        <li>처방약 관리</li>
    </ul>
    <h5>슈퍼어드민</h5>
    <ul>
        <li>병원 관리</li>
    </ul>

    <h2>회고</h2>
    <p>
        PM으로서 맡은 첫 프로젝트로 상당한 압박에 한동안 어질어질한 상태로 사전미팅을 진행해왔고 가장 우려되었던 문서를 작성하는데 있어 아무런 지식이 없어 곤욕을 치르곤 했습니다.
        또한 문서작업과 개발을 병행했기 때문에 일정에 항상 쫒겼습니다. 불행 중 다행으로 모든 팀원들이 각자 맡은 파트를 일정보다 조금 씩 더 일찍 끝 마쳤기때문에 무리없이 
        프로젝트를 끝까지 완수할 수 있었습니다. <h6>감사합니다....</h6>
    </p>
    
    <p>
        당시 Vue를 아는 사람이 저밖에 없어 팀원들에게 따로 시간을 내어 미약하게나마 내부적으로 강의 아닌 강의를 했습니다. 지금 생각해보면 더 잘 할 수 있었는데하는 아쉬움이 남습니다. 
    </p>

    <p>
        아무래도 일정과 팀원들을 고려하며 기술을 채택하다 보니, 저도 다뤄본 적 없던 JPA를 권유받아 사용하게 되었습니다.
        처음에는 익숙하지 않은 기술에 대한 부담이 컸지만, 실제로 DB 테이블 설계와 병행하여 적용해보니
        반복적인 SQL 작성 없이도 객체 지향적인 방식으로 데이터를 다룰 수 있다는 점에서
        개발 생산성 측면의 이점을 체감할 수 있었습니다.
        특히 엔티티 간 연관관계 매핑만으로 복잡한 조인 쿼리를 상당 부분 대체할 수 있었고,
        코드 변경 시 SQL을 일일이 수정할 필요가 줄어들면서 유지보수 효율 역시 크게 개선됨을 확인할 수 있었습니다.
        처음 접했을 때의 우려와 달리, 프로젝트를 진행하며 JPA가 제공하는 생산성과 편의성에 놀랐던 경험으로 남아있습니다.
    </p>
    
    <p>
        다만 테이블 자체가 복잡하지 않은 구조임에도 불구하고 단순한 select 쿼리만 실행해도 연관관계로 이어져있는 테이블을 모두 조회하는 점이 조금 아쉬웠던 점으로 남습니다.  
    </p>
    
    <blockquote>
        PM을 하기엔 나는 아직도 부족하다..
    </blockquote>
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
            dangerouslySetInnerHTML={{
              __html: data.project_details?.contents ? data.project_details?.contents : SAMPLE_PROJECT_CONTENTS,
            }}
          />
        </article>
      </div>
    </section>
  );
};

export default Detail;
