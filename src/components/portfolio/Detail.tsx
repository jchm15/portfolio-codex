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
<!--  <h2>프로젝트 배경</h2>-->
<!--    <p>-->
<!--        기존 Kia 2.0 은 100% AEM 프레임워크 구축되어있었고 Kia3.0 GT를 거치면서 동적인 동적인 국판데이터와 Frontend 는 AEM 위에 Vue를 얹어 리뉴얼과 고도화 작업을 병행한 프로젝트입니다. -->
<!--    </p>-->
<!--   -->
<!--    <p>-->
<!--        AEM 특성상 완전한 동적 페이지보다는 Authoring을 통해 콘텐츠를 미리 구성해두는 반쪽짜리 동적 페이지에 가까운 구조였으나,-->
<!--        Kafka를 통한 실시간 데이터 연동과 Oracle DB 기반의 데이터 관리, 그리고 AEM Authoring을 결합하여-->
<!--        콘텐츠 편집의 유연성과 데이터의 실시간성을 모두 갖춘 완전한 동적 사이트로 재구축하였습니다.-->
<!--    </p>-->
<!--    -->
<!--    <h2>기술적 의사결정</h2>-->
<!--    <p>-->
<!--        사실 프로젝트 투입 직전 PM님과 나눈 가벼운 대화에서 "Vue가 직관적이고 배우기 쉬워서 괜찮을 것 같다"는-->
<!--        의견을 드린 적이 있는데, 이 한마디가 실제 프레임워크 채택에 영향을 준 것 같아 지금 생각해도 신기한 경험이었습니다.-->
<!--    </p>-->
<!--    -->
<!--    <h3>주요 구현 사항</h3>-->
<!--    <ul>-->
<!--        <li>판매 네트워크(딜러/전시장 검색 및 위치 안내)</li>-->
<!--        <li>할부 계산기(금융 조건별 월 납입금 시뮬레이션)</li>-->
<!--        <li>견적 내기VR360(차량 실내외 360도 뷰어)</li>-->
<!--    </ul>-->

<!--    <h2>회고</h2>-->
<!--    <p>-->
<!--        판매 네트워크 파트를 맡으며 사용자의 현재 접속 IP를 기반으로 위치를 추정하고,-->
<!--        해당 위치와 각 딜러/전시장 간의 거리를 삼각함수를 활용해 계산하여 가까운 순으로 노출하는 로직을-->
<!--        직접 설계하고 구현했습니다. 단순 좌표 비교가 아닌 실제 거리 계산 로직을 다뤄본 경험이 흥미로웠고,-->
<!--        위치 기반 서비스의 정확도를 높이는 데 있어 데이터 정밀도가 얼마나 중요한지 체감할 수 있었습니다.-->
<!--    </p>-->
<!--    -->
<!--    <p>-->
<!--        할부 계산기 파트는 소비자가 실제 구매 결정을 내리는 데 있어 가장 민감하게 받아들이는 영역이라고 판단했습니다.-->
<!--        금액과 관련된 정보인 만큼 작은 오차 하나도 소비자의 신뢰에 직결될 수 있기 때문에,-->
<!--        납부 회차·선납금·금리 조건 등 다양한 변수 조합에 따른 월 납입금 산출 로직을 꼼꼼히 검증하며-->
<!--        한 치의 오차도 없이 정확하게 계산되도록 심혈을 기울였습니다.-->
<!--        수치 하나하나가 실제 구매 판단으로 이어질 수 있다는 책임감을 가지고 작업했던 파트로 기억에 남습니다.-->
<!--    </p>-->
<!--    -->
<!--    <p>-->
<!--        VR360 구현 과정에서는 외부 라이브러리 제공 업체와의 커뮤니케이션이 예상보다 큰 비중을 차지했습니다.-->
<!--        렌더링 속도 이슈가 지속적으로 발생해 원인 파악을 위해 업체 측과 여러 차례 논의를 진행해야 했고,-->
<!--        이 과정에서 외부 솔루션을 도입할 때는 기능 자체보다 벤더와의 소통 및 대응 속도가-->
<!--        프로젝트 일정에 미치는 영향이 크다는 점을 배울 수 있었습니다.-->
<!--    </p>-->
<!--    -->
<!--    <blockquote>-->
<!--        직접 구현하는 것 못지않게, 외부 솔루션과 어떻게 협업하고 조율하는지도 개발자의 역량이라는 걸 느낀 프로젝트였습니다.-->
<!--        추가로 현재는 할부계산기 컴포넌트는 서비스중이 아닌걸로 보입니다....(아쉽..)-->
<!--    </blockquote>-->
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
