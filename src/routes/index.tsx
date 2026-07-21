import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

import Hero from '@components/Hero'
import MainNoProject from '@components/no-data/MainNoProject'

import { getPortfolioList } from '@services/portfolioService'
import formatDateKST from '@utils/commonUtils'

export const Route = createFileRoute('/')({
    component: IndexComponent,
})

function IndexComponent() {
    const { data: portfolioData } = useQuery({
        queryKey: ['portfolio', 'preview'],
        queryFn: () => getPortfolioList(5),
    })

    const projectPreview = portfolioData ?? []

    return (
        <>
            <Hero />

            {/*<section className="border-b border-neutral-900">*/}
            {/*    <div className="mx-auto max-w-7xl px-6 py-28">*/}
            {/*        <div className="grid gap-20 lg:grid-cols-[320px_1fr]">*/}
            {/*            <div className="sticky top-32 h-fit">*/}
            {/*                <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-[#C9A66B]">*/}
            {/*                    About*/}
            {/*                </p>*/}

            {/*                <h2 className="font-serif text-4xl leading-tight text-white">*/}
            {/*                    코드보다*/}
            {/*                    <br />*/}
            {/*                    경험을 먼저*/}
            {/*                    <br />*/}
            {/*                    생각합니다.*/}
            {/*                </h2>*/}
            {/*            </div>*/}

            {/*            <div className="space-y-8 text-lg leading-9 text-neutral-400">*/}
            {/*                <p>*/}
            {/*                    저는 단순히 동작하는 화면을 만드는 것이 아니라*/}
            {/*                    사용자에게 자연스럽고 직관적인 경험을 제공하는*/}
            {/*                    인터페이스를 만드는 것을 좋아합니다.*/}
            {/*                </p>*/}

            {/*                <p>*/}
            {/*                    React와 TypeScript를 중심으로*/}
            {/*                    유지보수가 쉬운 구조와 일관된 사용자 경험을*/}
            {/*                    고민하며 개발하고 있습니다.*/}
            {/*                </p>*/}

            {/*                <p>*/}
            {/*                    새로운 기술을 빠르게 배우는 것보다*/}
            {/*                    왜 필요한지를 먼저 이해하려고 노력합니다.*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}

            <section className="border-b border-neutral-900">
                <div className="mx-auto max-w-7xl px-6 py-28">
                    <div className="mb-16 flex items-end justify-between">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#C9A66B]">
                                Selected Works
                            </p>

                            <h2 className="mt-4 font-serif text-5xl text-white">
                                Featured Projects
                            </h2>
                        </div>

                        {projectPreview.length > 0 && (
                            <Link
                                to="/portfolio"
                                className="text-sm text-neutral-400 transition hover:text-white"
                            >
                                View All →
                            </Link>
                        )}
                    </div>

                    {projectPreview.length === 0 ? (
                        <MainNoProject />
                    ) : (
                        <div className="space-y-8">
                            {projectPreview.map((project, index) => (
                                <Link
                                    key={project.id}
                                    to="/detail/$id"
                                    params={{
                                        id: String(project.id),
                                    }}
                                    className="group block rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8 transition-all duration-300 hover:border-[#C9A66B]/40 hover:bg-neutral-900"
                                >
                                    <div className="grid items-center gap-10 lg:grid-cols-[100px_1fr_auto]">
                                        <div className="font-serif text-5xl text-neutral-700 transition group-hover:text-[#C9A66B]">
                                            {String(index + 1).padStart(2, '0')}
                                        </div>

                                        <div>
                                            <h3 className="text-3xl font-semibold text-white">
                                                {project.proj_name}
                                            </h3>

                                            <p className="mt-4 max-w-2xl text-neutral-400 line-clamp-2">
                                                {project.project_details?.description ??
                                                    '프로젝트 설명이 등록되지 않았습니다.'}
                                            </p>

                                            <div className="mt-6 flex flex-wrap gap-2">
                                                {project.project_skills.slice(0, 5).map((skill) => (
                                                    <span
                                                        key={skill.id}
                                                        className="rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-400"
                                                    >
                            {skill.skill_name}
                          </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2 text-right">
                                            <p className="text-xs uppercase tracking-[0.25em] text-neutral-600">
                                                Duration
                                            </p>

                                            <p className="text-sm text-neutral-300">
                                                {formatDateKST(project.start_date)}
                                            </p>

                                            <p className="text-sm text-neutral-500">
                                                ~ {formatDateKST(project.end_date)}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/*<section>*/}
            {/*    <div className="mx-auto max-w-7xl px-6 py-28">*/}
            {/*        <div className="rounded-[40px] border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-16 text-center">*/}
            {/*            <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#C9A66B]">*/}
            {/*                Philosophy*/}
            {/*            </p>*/}

            {/*            <h2 className="mx-auto mt-8 max-w-4xl font-serif text-5xl leading-tight text-white">*/}
            {/*                좋은 코드는*/}
            {/*                <br />*/}
            {/*                사용자가 의식하지 않아도*/}
            {/*                <br />*/}
            {/*                자연스럽게 사용할 수 있는 경험을 만듭니다.*/}
            {/*            </h2>*/}

            {/*            <Link*/}
            {/*                to="/portfolio"*/}
            {/*                className="mt-12 inline-flex rounded-full bg-[#C9A66B] px-8 py-4 font-semibold text-neutral-950 transition hover:scale-[1.03]"*/}
            {/*            >*/}
            {/*                Explore Portfolio*/}
            {/*            </Link>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
        </>
    )
}