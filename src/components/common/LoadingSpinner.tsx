const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-neutral-950/90 backdrop-blur-sm">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-neutral-800 border-t-[#C9A66B]" />

        <span className="font-mono text-sm text-[#C9A66B]">&gt;_</span>
      </div>

      <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">Loading</p>
    </div>
  );
};

export default LoadingSpinner;
