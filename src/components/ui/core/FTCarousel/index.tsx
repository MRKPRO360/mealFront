'use client';
import { useState, useEffect, ReactNode } from 'react';

interface CarouselProps {
  children: ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
}

const FTCarousel = ({
  children,
  autoPlay = true,
  interval = 5000,
  showControls = true,
  showIndicators = true,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % children.length);
    }, interval);

    return () => clearInterval(timer);
  }, [children.length, interval, isPlaying]);

  const goTo = (index: number) => {
    setIsPlaying(false);
    setCurrentIndex(index);
  };

  const goToPrev = () =>
    goTo((currentIndex - 1 + children.length) % children.length);
  const goToNext = () => goTo((currentIndex + 1) % children.length);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(autoPlay)}
    >
      {/* Current Slide */}
      <div className="w-full">{children[currentIndex]}</div>

      {/* Navigation Arrows */}
      {showControls && children.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block -translate-x-12 bg-white p-3 rounded-full shadow-md hover:bg-green-50 transition-colors z-10"
            aria-label="Previous"
          >
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 hidden md:block -translate-y-1/2 translate-x-12 bg-white p-3 rounded-full shadow-md hover:bg-green-50 transition-colors z-10"
            aria-label="Next"
          >
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && children.length > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-green-600 w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FTCarousel;
