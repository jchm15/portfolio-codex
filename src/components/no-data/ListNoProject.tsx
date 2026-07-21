const ListNoProject = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/20 px-6 py-24 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-neutral-500 border border-neutral-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <p className="font-mono text-xs text-[#C9A66B] mb-2">
        {`$ git log --all`}
        <br />
        <span className="text-neutral-500">{`fatal: your current branch has no commits yet`}</span>
      </p>
      <h3 className="font-serif text-lg text-neutral-400 mt-2 break-keep">등록된 프로젝트가 없습니다.</h3>
      <p className="mt-1 text-xs text-neutral-600 break-keep">첫 번째 커밋을 푸시하기 위해 열심히 작업 중입니다.</p>
    </div>
  );
};

export default ListNoProject;
