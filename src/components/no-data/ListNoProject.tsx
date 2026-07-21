const ListNoProject = () => {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-[32px]
        border
        border-dashed
        border-neutral-800
        bg-neutral-900/40
        px-6
        py-28
        text-center
      "
    >
      <div
        className="
          mb-6
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          border
          border-neutral-800
          bg-neutral-950
        "
      >
        <span className="font-mono text-lg text-[#C9A66B]">&gt;_</span>
      </div>

      <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#C9A66B]">git status</p>

      <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-950 px-5 py-3">
        <p className="font-mono text-xs text-neutral-400">On branch main</p>

        <p className="mt-1 font-mono text-xs text-neutral-600">nothing to show yet</p>
      </div>

      <h3 className="mt-8 font-serif text-xl text-neutral-300">등록된 프로젝트가 없습니다.</h3>

      <p className="mt-2 text-sm text-neutral-600">첫 번째 프로젝트를 기록하기 위해 작업 중입니다.</p>
    </div>
  );
};

export default ListNoProject;
