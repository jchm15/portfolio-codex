import { useNavigate } from '@tanstack/react-router';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-neutral-50">
            <div className="max-w-lg text-center">
                <p className="mb-3 text-xs font-medium tracking-[0.3em] text-[#C9A66B] uppercase">
                    cat error.log
                </p>

                <div className="font-serif text-8xl font-black tracking-tight text-neutral-100">
                    404
                </div>

                <h1 className="mt-6 font-serif text-3xl tracking-tight text-balance">
                    페이지를 찾을 수 없습니다
                </h1>

                <p className="mt-4 text-sm text-neutral-500">
                    요청하신 경로가 존재하지 않거나 이동되었습니다.
                </p>

                <div className="mt-4 inline-block rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 font-mono text-xs text-neutral-400">
                    command not found: {location.pathname}
                </div>

                <div className="mt-10 flex justify-center gap-3">
                    <button
                        onClick={() => history.back()}
                        className="rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-300 transition-colors hover:border-neutral-500 hover:text-neutral-50"
                    >
                        이전 페이지
                    </button>

                    <button
                        onClick={() => navigate({ to: '/' })}
                        className="rounded-full bg-neutral-50 px-7 py-3 text-sm font-semibold text-neutral-950 transition-transform hover:scale-[1.03] active:scale-100"
                    >
                        cd ~
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotFound;