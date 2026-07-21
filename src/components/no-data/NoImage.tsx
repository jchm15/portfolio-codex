const NoImage = () => {
  return (
    <div
      className="
        flex
        h-full
        w-full
        flex-col
        items-center
        justify-center
        gap-3
        bg-neutral-900
        text-center
        transition-transform
        duration-700
        group-hover:scale-105
      "
    >
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          border
          border-neutral-800
          bg-neutral-950
        "
      >
        <span className="font-mono text-lg text-[#C9A66B]">&gt;_</span>
      </div>

      <div>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">image.log</p>

        <p className="mt-1 text-xs text-neutral-600">no preview available</p>
      </div>
    </div>
  );
};

export default NoImage;
