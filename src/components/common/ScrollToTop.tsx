import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <button
            onClick={scrollToTop}
            aria-label="맨 위로 이동"
            className={`fixed bottom-8 right-8 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-neutral-50 text-neutral-950 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
                isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-4 opacity-0'
            }`}
        >
            <ArrowUp size={18} />
        </button>
    )
}