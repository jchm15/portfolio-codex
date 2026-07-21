const NoImage = () => {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-neutral-500 bg-neutral-900 transition-transform duration-500 group-hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="8" y1="8" x2="16" y2="16" />
                <line x1="16" y1="8" x2="8" y2="16" />
            </svg>
            <span className="text-xs font-medium">이미지 없음</span>
        </div>
    )
}

export default NoImage;