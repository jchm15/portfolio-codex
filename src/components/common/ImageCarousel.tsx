import { useState, useRef, useEffect } from 'react';
import * as React from 'react';

import NoImage from '@components/no-data/NoImage';

interface ImageCarouselProps {
  images: { id: string | number; image_url: string }[];
  alt: string;
}

const ImageCarousel = ({ images, alt }: ImageCarouselProps) => {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const startX = useRef<number | null>(null);
  const deltaX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  if (images.length === 0) {
    return <NoImage />;
  }

  const goTo = (i: number) => {
    if (i < 0) i = images.length - 1;
    if (i >= images.length) i = 0;

    setIndex(i);
  };

  const threshold = 50;

  const handleStart = (clientX: number) => {
    startX.current = clientX;
    deltaX.current = 0;
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (startX.current === null) return;

    deltaX.current = clientX - startX.current;
    setDragOffset(deltaX.current);
  };

  const handleEnd = () => {
    if (deltaX.current > threshold) {
      goTo(index - 1);
    }

    if (deltaX.current < -threshold) {
      goTo(index + 1);
    }

    startX.current = null;
    deltaX.current = 0;
    setDragOffset(0);
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };

    const onMouseUp = () => {
      handleEnd();
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, index]);

  const containerWidth = containerRef.current?.offsetWidth ?? 0;
  const dragPercent = containerWidth > 0 ? (dragOffset / containerWidth) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="
        group
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-neutral-800
        bg-neutral-900
        select-none
      "
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
      onMouseDown={handleMouseDown}
      style={{
        cursor: isDragging ? 'grabbing' : images.length > 1 ? 'grab' : 'default',
      }}
    >
      <div
        className={`flex ${isDragging ? '' : 'transition-transform duration-300 ease-out'}`}
        style={{
          transform: `translateX(calc(-${index * 100}% + ${dragPercent}%))`,
        }}
      >
        {images.map((img) => (
          <img
            key={img.id}
            src={img.image_url}
            alt={alt}
            draggable={false}
            className="
              aspect-video
              w-full
              shrink-0
              object-cover
            "
          />
        ))}
      </div>

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-black/50
          via-transparent
          to-transparent
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      {images.length > 1 && (
        <>
          <button
            onClick={() => goTo(index - 1)}
            className="
              absolute
              top-1/2
              left-4
              -translate-y-1/2
              rounded-full
              border
              border-neutral-700
              bg-neutral-950/80
              px-3
              py-1
              text-xl
              text-[#C9A66B]
              opacity-0
              transition
              group-hover:opacity-100
            "
          >
            ‹
          </button>

          <button
            onClick={() => goTo(index + 1)}
            className="
              absolute
              top-1/2
              right-4
              -translate-y-1/2
              rounded-full
              border
              border-neutral-700
              bg-neutral-950/80
              px-3
              py-1
              text-xl
              text-[#C9A66B]
              opacity-0
              transition
              group-hover:opacity-100
            "
          >
            ›
          </button>

          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`
                  h-1.5
                  rounded-full
                  transition-all
                  ${i === index ? 'w-6 bg-[#C9A66B]' : 'w-2 bg-neutral-600'}
                `}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
