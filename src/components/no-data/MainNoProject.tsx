const MainNoProject = () => {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/30 px-6 py-20 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-neutral-500 border border-neutral-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m18 16 4-4-4-4" />
                    <path d="m6 8-4 4 4 4" />
                    <path d="m14.5 4-5 16" />
                </svg>
            </div>
            <p className="font-mono text-xs text-neutral-500 mb-2">
                {`// Warning: No entries found in projects.log`}
            </p>
            <h3 className="font-serif text-lg text-neutral-400 break-keep">
                아직 기록된 프로젝트가 없습니다.
            </h3>
            <p className="mt-1 text-xs text-neutral-600 break-keep">
                로컬에서 코드를 열심히 빌드하고 있습니다. 조금만 기다려주세요!
            </p>
        </div>
    )
}

export default MainNoProject;