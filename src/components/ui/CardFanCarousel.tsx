import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MediaTile } from "@/components/services/MediaTile";
import "./card-fan-carousel.css";

interface FanArtwork {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface CardFanCarouselProps {
  images: readonly FanArtwork[];
  accent: string;
  label: string;
}

export function CardFanCarousel({ images, accent, label }: CardFanCarouselProps) {
  const [selected, setSelected] = useState(0);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const stage = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ id: number; x: number; y: number } | null>(null);
  const nearby = useInView(stage, { margin: "240px", once: true });
  const reducedMotion = Boolean(useReducedMotion());
  const count = images.length;
  const current = count ? selected % count : 0;

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize((previous) => previous.width === width && previous.height === height ? previous : { width, height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function move(step: number) {
    if (count < 2) return;
    setSelected((index) => (index + step + count) % count);
  }

  function startSwipe(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0 || count < 2) return;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
  }

  function trackSwipe(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = Math.abs(event.clientX - start.x);
    const dy = Math.abs(event.clientY - start.y);
    if (dy > 10 && dy > dx) {
      gesture.current = null;
    } else if (dx > 10 && dx > dy && !event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  }

  function finishSwipe(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    gesture.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
  }

  const small = size.width < 480;
  const medium = size.width < 760;
  const visibleCount = Math.min(count, small ? 3 : medium ? 5 : 7);
  const half = Math.floor(visibleCount / 2);
  const cardHeight = Math.max(0, size.height - 70);
  const requestedGap = size.width * (small ? 0.23 : medium ? 0.17 : 0.112);
  // Keep the cards overlapping even on wide, short laptop viewports.
  const gap = Math.min(requestedGap, cardHeight * 0.45, Math.max(0, (size.width / 2 - cardHeight * 0.42 - 16) / Math.max(1, half)));
  const visible = nearby && size.width > 0 ? Array.from({ length: visibleCount }, (_, position) => {
    const slot = position - half;
    return { slot, index: (current + slot + count) % count };
  }) : [];

  return (
    <div
      className="card-fan"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={count > 1 ? 0 : undefined}
      style={{ "--fan-accent": accent } as CSSProperties}
      onKeyDown={(event) => {
        if (event.target instanceof HTMLElement && event.target.closest("input, select, textarea, [contenteditable=true]")) return;
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        move(event.key === "ArrowRight" ? 1 : -1);
      }}
    >
      <div
        ref={stage}
        className="card-fan-stage"
        onPointerDown={startSwipe}
        onPointerMove={trackSwipe}
        onPointerUp={finishSwipe}
        onPointerCancel={() => { gesture.current = null; }}
        onLostPointerCapture={() => { gesture.current = null; }}
        onDragStart={(event) => event.preventDefault()}
      >
        {visible.map(({ slot, index }) => {
          const image = images[index];
          const depth = Math.abs(slot);
          const width = cardHeight * image.width / image.height;
          return (
            <motion.figure
              key={image.src}
              className="card-fan-artwork"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              aria-hidden={slot !== 0}
              style={{ width, height: cardHeight, marginLeft: -width / 2, zIndex: 10 - depth }}
              initial={{ opacity: 0 }}
              animate={{ x: slot * gap, y: depth * depth * 6, rotate: slot * 19 / 3, scale: 1 - depth * 0.075, opacity: 1 }}
              transition={{ duration: reducedMotion ? 0 : 0.38, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <motion.div
                className="card-fan-frame"
                whileHover={slot === 0 && !reducedMotion ? { y: -12 } : undefined}
                animate={{ y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.2 }}
              >
                <MediaTile src={image.src} alt={slot === 0 ? image.alt : ""} eager className="card-fan-image" />
              </motion.div>
            </motion.figure>
          );
        })}
      </div>
      {count > 0 && (
        <>
          <div className="card-fan-controls">
            <button type="button" aria-label="Previous artwork" onClick={() => move(-1)} disabled={count < 2}>
              <ArrowLeft size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <span className="card-fan-count" aria-live="polite" aria-atomic="true">
              <span className="sr-only">Artwork </span>{String(current + 1).padStart(2, "0")}
              <span className="card-fan-total"> / {count}</span>
              <span className="sr-only"> — {images[current].alt}</span>
            </span>
            <button type="button" aria-label="Next artwork" onClick={() => move(1)} disabled={count < 2}>
              <ArrowRight size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
          <p className="card-fan-caption" aria-hidden="true">{images[current].alt}</p>
        </>
      )}
    </div>
  );
}
