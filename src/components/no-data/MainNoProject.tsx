const MainNoProject = () => {
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
        py-24
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

      <p
        className="
          font-mono
          text-xs
          uppercase
          tracking-[0.25em]
          text-[#C9A66B]
        "
      >
        loading projects.log
      </p>

      <h3 className="mt-6 font-serif text-xl text-neutral-300">아직 기록된 프로젝트가 없습니다.</h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-600">
        새로운 프로젝트를 만들고 있습니다.
        <br />곧 이 공간에 기록됩니다.
      </p>

      <div
        className="
          mt-8
          rounded-lg
          border
          border-neutral-800
          bg-neutral-950
          px-4
          py-2
          font-mono
          text-xs
          text-neutral-500
        "
      >
        status: building...
      </div>
    </div>
  );
};

export default MainNoProject;
