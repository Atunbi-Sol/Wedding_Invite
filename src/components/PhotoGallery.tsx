import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

const GALLERY_IMAGES = [
  {
    src: "/img/IMG_9423.JPG.jpeg",
    alt: "Moroluwayosi & Damilare - Pre-Wedding Photo 1",
  },
  {
    src: "/img/IMG_9424.JPG.jpeg",
    alt: "Moroluwayosi & Damilare - Pre-Wedding Photo 2",
  },
  {
    src: "/img/IMG_9425.JPG.jpeg",
    alt: "Moroluwayosi & Damilare - Pre-Wedding Photo 3",
  },
  {
    src: "/img/IMG_9426.JPG.jpeg",
    alt: "Moroluwayosi & Damilare - Pre-Wedding Photo 4",
  },
  {
    src: "/img/IMG_9427.JPG.jpeg",
    alt: "Moroluwayosi & Damilare - Pre-Wedding Photo 5",
  },
];

const AUTOPLAY_INTERVAL = 4000; // 4 seconds per slide

export default function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const lightboxThumbContainerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const total = GALLERY_IMAGES.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
    setProgress(0);
  }, [total]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setProgress(0);
  }, [total]);

  const selectImage = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Autoplay and progress bar timer (runs in both regular and lightbox view)
  useEffect(() => {
    if (!isPlaying) return;

    const tickInterval = 50; // update progress every 50ms
    const step = (tickInterval / AUTOPLAY_INTERVAL) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + step;
      });
    }, tickInterval);

    return () => clearInterval(timer);
  }, [isPlaying, goToNext]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isLightboxOpen]);

  // Center active thumbnail in normal view
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current;
      const activeThumb = container.children[currentIndex] as HTMLElement | undefined;
      if (activeThumb) {
        const offsetLeft =
          activeThumb.offsetLeft -
          container.offsetWidth / 2 +
          activeThumb.offsetWidth / 2;
        container.scrollTo({ left: offsetLeft, behavior: "smooth" });
      }
    }
  }, [currentIndex]);

  // Center active thumbnail in lightbox view
  useEffect(() => {
    if (isLightboxOpen && lightboxThumbContainerRef.current) {
      const container = lightboxThumbContainerRef.current;
      const activeThumb = container.children[currentIndex] as HTMLElement | undefined;
      if (activeThumb) {
        const offsetLeft =
          activeThumb.offsetLeft -
          container.offsetWidth / 2 +
          activeThumb.offsetWidth / 2;
        container.scrollTo({ left: offsetLeft, behavior: "smooth" });
      }
    }
  }, [currentIndex, isLightboxOpen]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, goToNext, goToPrev]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 45) {
      goToNext(); // Swiped left
    } else if (diff < -45) {
      goToPrev(); // Swiped right
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <div
      className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-10 text-center transition-all duration-300"
      style={{
        background: "linear-gradient(180deg, #fffaf6, #fdf1f4)",
        border: "1px solid rgba(198, 161, 91, 0.4)",
        boxShadow: "0 20px 45px -20px rgba(71, 37, 54, 0.4)",
      }}
    >
      {/* Title block */}
      <div className="mb-5">
        <p className="font-marcellus uppercase tracking-[0.25em] text-[0.72rem] text-rose-gold m-0">
          Pre-Wedding Gallery
        </p>
        <h2 className="font-great-vibes font-normal text-plum text-4xl sm:text-5xl m-0 leading-tight mt-1">
          Moments of Love
        </h2>
        <div className="w-12 h-0.5 bg-gold/50 mx-auto mt-2 rounded-full" />
      </div>

      {/* Main Image Viewport */}
      <div
        className="relative w-full rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-[3/4] max-h-[560px] bg-neutral-900 shadow-md select-none group"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main Photo */}
        <img
          key={currentIndex}
          src={GALLERY_IMAGES[currentIndex].src}
          alt={GALLERY_IMAGES[currentIndex].alt}
          className="w-full h-full object-cover object-center cursor-pointer transition-transform duration-700 ease-out group-hover:scale-[1.02] animate-fade-in-up"
          onClick={() => setIsLightboxOpen(true)}
          loading="eager"
        />

        {/* Counter Badge (Top Left) */}
        <div className="absolute top-3.5 left-3.5 z-10 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white font-marcellus text-xs tracking-wider flex items-center justify-center shadow-xs">
          {currentIndex + 1} / {total}
        </div>

        {/* Tap to Expand Button (Top Right) */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-3.5 right-3.5 z-10 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white font-playfair italic text-xs tracking-wide flex items-center gap-1.5 cursor-pointer hover:bg-black/65 transition shadow-xs"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5 text-gold-soft"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
          Tap to Expand
        </button>

        {/* Previous Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goToPrev();
          }}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/75 hover:bg-white text-plum flex items-center justify-center shadow-md backdrop-blur-xs transition hover:scale-105 active:scale-95 cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/75 hover:bg-white text-plum flex items-center justify-center shadow-md backdrop-blur-xs transition hover:scale-105 active:scale-95 cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Bottom Autoplay Progress Bar & Pause Button */}
        <div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex items-center gap-2.5">
          {/* Progress bar line */}
          <div className="flex-1 h-1 bg-white/35 rounded-full overflow-hidden backdrop-blur-xs">
            <div
              className="h-full bg-white rounded-full transition-[width] duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Pause / Play Toggle Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/45 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center cursor-pointer transition border border-white/20 shrink-0"
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current ml-0.5">
                <polygon points="5 4 19 12 5 20 5 4" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="mt-4">
        <div
          ref={thumbnailContainerRef}
          className="flex items-center gap-2.5 overflow-x-auto py-1 px-1 scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {GALLERY_IMAGES.map((img, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={img.src}
                type="button"
                onClick={() => selectImage(idx)}
                className={`relative shrink-0 w-14 h-18 sm:w-16 sm:h-20 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 p-0 border-2 ${
                  isActive
                    ? "border-gold shadow-md scale-105 opacity-100 ring-2 ring-gold/40"
                    : "border-transparent opacity-65 hover:opacity-100 hover:scale-102"
                }`}
                aria-label={`View photo ${idx + 1}`}
              >
                <img
                  src={img.src}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>

        {/* Thumbnail Navigation Scroll Indicators */}
        <div className="flex items-center justify-center gap-2 mt-2.5 opacity-60">
          <button
            type="button"
            onClick={() => {
              if (thumbnailContainerRef.current) {
                thumbnailContainerRef.current.scrollBy({ left: -100, behavior: "smooth" });
              }
            }}
            aria-label="Scroll thumbnails left"
            className="p-1 text-plum/70 hover:text-plum cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
              <polygon points="16 4 6 12 16 20 16 4" />
            </svg>
          </button>

          {/* Mini dot indicators */}
          <div className="flex items-center gap-1.5">
            {GALLERY_IMAGES.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? "w-5 bg-gold"
                    : "w-1.5 bg-plum/25 hover:bg-plum/50"
                }`}
                onClick={() => selectImage(idx)}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              if (thumbnailContainerRef.current) {
                thumbnailContainerRef.current.scrollBy({ left: 100, behavior: "smooth" });
              }
            }}
            aria-label="Scroll thumbnails right"
            className="p-1 text-plum/70 hover:text-plum cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
              <polygon points="8 4 18 12 8 20 8 4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal (Rendered via React Portal onto document.body to occupy entire viewport width) */}
      {isLightboxOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[9999] w-screen h-[100dvh] bg-[#0c090a] flex flex-col justify-between p-3 sm:p-6 animate-fade-in-up select-none overflow-hidden"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Top Bar spanning full screen */}
            <div
              className="w-full flex items-center justify-between text-white z-20 px-3 sm:px-8 pt-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left side: Pill badge with counter + Couple Names */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="px-3.5 py-1 rounded-full bg-[#1e1714]/80 border border-[#8a5d3b]/50 text-[#e6c280] font-marcellus text-xs tracking-wider">
                  {currentIndex + 1} / {total}
                </div>

                <span className="font-playfair italic text-[#f4eae0] text-sm sm:text-base tracking-wide">
                  Moroluwayosi &amp; Damilare
                </span>
              </div>

              {/* Right side: PAUSE button + Brown Close button */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1e1714]/80 hover:bg-[#2b1f1a] border border-[#8a5d3b]/40 text-[#f4eae0] font-marcellus text-[0.68rem] tracking-widest uppercase cursor-pointer transition shadow-xs"
                >
                  {isPlaying ? (
                    <>
                      <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                        <rect x="6" y="5" width="4" height="14" rx="1" />
                        <rect x="14" y="5" width="4" height="14" rx="1" />
                      </svg>
                      PAUSE
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                        <polygon points="6 4 19 12 6 20 6 4" />
                      </svg>
                      PLAY
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  aria-label="Close fullscreen"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#6a351a] hover:bg-[#814120] active:scale-95 text-white flex items-center justify-center cursor-pointer transition shadow-md"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Main Fullscreen Image Viewport with Side Navigation Arrows */}
            <div
              className="relative flex-1 flex items-center justify-center w-full my-auto px-4 sm:px-16"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Left Nav Arrow Button (Deep warm brown circle matching screenshot) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                aria-label="Previous photo"
                className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#27150c]/85 hover:bg-[#382013] active:scale-95 border border-[#663b21]/70 text-[#d4a359] flex items-center justify-center cursor-pointer transition shadow-xl"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Display Image with Rounded Corners */}
              <img
                key={currentIndex}
                src={GALLERY_IMAGES[currentIndex].src}
                alt={GALLERY_IMAGES[currentIndex].alt}
                className="max-h-[74vh] sm:max-h-[78vh] w-auto max-w-[85vw] sm:max-w-[70vw] object-contain rounded-2xl sm:rounded-3xl shadow-2xl select-none animate-fade-in-up cursor-default"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Right Nav Arrow Button (Deep warm brown circle matching screenshot) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                aria-label="Next photo"
                className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#27150c]/85 hover:bg-[#382013] active:scale-95 border border-[#663b21]/70 text-[#d4a359] flex items-center justify-center cursor-pointer transition shadow-xl"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Bottom Thumbnail Strip (Matching Screenshot) */}
            <div
              className="w-full flex items-center justify-center pb-4 pt-1 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                ref={lightboxThumbContainerRef}
                className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto max-w-full px-4 py-1.5 scroll-smooth no-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {GALLERY_IMAGES.map((img, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => selectImage(idx)}
                      className={`relative shrink-0 w-12 h-14 sm:w-14 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer transition-all duration-300 p-0 ${
                        isActive
                          ? "border-2 border-[#d4a359] ring-2 ring-[#d4a359]/40 scale-105 opacity-100 shadow-lg"
                          : "border border-white/10 opacity-40 hover:opacity-85 hover:scale-102"
                      }`}
                      aria-label={`View photo ${idx + 1}`}
                    >
                      <img
                        src={img.src}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover object-center"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
