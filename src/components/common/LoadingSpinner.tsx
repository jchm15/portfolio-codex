const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-black/50">
            <div className="h-20 w-20 animate-spin rounded-full border-8 border-gray-300 border-t-blue-500" />
        </div>
    )
}

export default LoadingSpinner;