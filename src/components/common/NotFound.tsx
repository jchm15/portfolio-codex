import { useLocation, useNavigate } from '@tanstack/react-router';

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-neutral-50">
      <div className="max-w-lg text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-[#C9A66B]">cat error.log</p>

        <div className="font-mono text-8xl font-bold tracking-tight text-neutral-100">404</div>

        <h1 className="mt-6 font-serif text-3xl tracking-tight text-white">페이지를 찾을 수 없습니다</h1>

        <p className="mt-4 text-sm leading-6 text-neutral-500">
          요청하신 경로가 존재하지 않거나
          <br />
          이동되었을 수 있습니다.
        </p>

        <div className="mt-6 inline-flex rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 font-mono text-xs text-neutral-400">
          command not found: {location.pathname}
        </div>

        <div className="mt-10 flex justify-center gap-3">
          <button
            onClick={() => history.back()}
            className="rounded-full border border-neutral-700 px-6 py-3 text-sm text-neutral-300 transition hover:border-[#C9A66B]/40 hover:text-white"
          >
            history.back()
          </button>

          <button
            onClick={() => navigate({ to: '/' })}
            className="rounded-full border border-[#C9A66B] bg-[#C9A66B] px-7 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-[#d6b77b]"
          >
            cd ~
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
