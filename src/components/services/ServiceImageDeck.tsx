import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useIsPresent,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { PortfolioItem } from "@/data/portfolio";
import { MediaTile } from "./MediaTile";

const VISIBLE_CARDS = 3;

interface DeckPhotoProps {
  src: string;
  alt: string;
  depth: number;
  reducedMotion: boolean;
  canNavigate: boolean;
  isBusy: () => boolean;
  onNavigate: (step: number) => boolean;
  onSettled: () => void;
}

function DeckPhoto({ src, alt, depth, reducedMotion, canNavigate, isBusy, onNavigate, onSettled }: DeckPhotoProps) {
  const isPresent = useIsPresent();
  const isTop = depth === 0 && isPresent;
  const x = useMotionValue(0);
  const rotation = useTransform(x, (offset) => reducedMotion ? 0 : Math.max(-7, Math.min(7, offset / 24)));
  const drag = useRef<{ id: number; startX: number; startY: number; lastX: number; time: number; velocity: number; horizontal: boolean } | null>(null);
  const returnAnimation = useRef<ReturnType<typeof animate> | null>(null);

  function returnToStack() {
    returnAnimation.current?.stop();
    returnAnimation.current = animate(x, 0, { duration: reducedMotion ? 0 : 0.22, ease: "easeOut" });
  }

  useEffect(() => {
    if (!isTop) {
      drag.current = null;
      returnAnimation.current?.stop();
      returnAnimation.current = animate(x, 0, { duration: reducedMotion ? 0 : 0.22, ease: "easeOut" });
    }
    return () => returnAnimation.current?.stop();
  }, [isTop, reducedMotion, x]);

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!isTop || !canNavigate || isBusy() || !event.isPrimary || event.button !== 0) return;
    returnAnimation.current?.stop();
    drag.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      time: event.timeStamp,
      velocity: 0,
      horizontal: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const gesture = drag.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.startX;
    const dy = event.clientY - gesture.startY;
    if (!gesture.horizontal) {
      // Let a vertical touch gesture scroll the page normally.
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) {
        cancelDrag();
        return;
      }
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy)) return;
      gesture.horizontal = true;
    }
    gesture.velocity = (event.clientX - gesture.lastX) / Math.max(1, event.timeStamp - gesture.time);
    gesture.lastX = event.clientX;
    gesture.time = event.timeStamp;
    // Motion values update the card directly, without rendering the deck on every pointer move.
    x.set(Math.max(-event.currentTarget.offsetWidth * 0.8, Math.min(event.currentTarget.offsetWidth * 0.8, dx)));
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const gesture = drag.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    const dx = event.clientX - gesture.startX;
    const velocity = event.timeStamp - gesture.time < 120 ? gesture.velocity : 0;
    const farEnough = Math.abs(dx) > event.currentTarget.offsetWidth * 0.22;
    const quickFlick = Math.abs(dx) > 24 && Math.abs(velocity) > 0.55;
    if (gesture.horizontal && (farEnough || quickFlick) && onNavigate(dx < 0 ? 1 : -1)) return;
    returnToStack();
  }

  function cancelDrag() {
    if (!drag.current) return;
    drag.current = null;
    returnToStack();
  }

  const pose = {
    x: 0,
    y: -depth * 11,
    scale: 1 - depth * 0.035,
    rotate: reducedMotion || depth === 0 ? 0 : depth === 1 ? -3 : 3,
    opacity: 1,
  };

  return (
    <motion.div
      className="absolute inset-0"
      style={{ zIndex: isPresent ? VISIBLE_CARDS - depth : depth === 0 ? VISIBLE_CARDS + 1 : 0, pointerEvents: isTop ? "auto" : "none" }}
      aria-hidden={!isTop}
      data-deck-depth={depth}
      variants={{
        enter: (direction: number) => ({ ...pose, x: !reducedMotion && depth === 0 && direction < 0 ? "-35%" : 0, opacity: 0 }),
        leave: (direction: number) => ({
          x: !reducedMotion && depth === 0 && direction > 0 ? "-75%" : 0,
          y: !reducedMotion && depth === 0 ? -12 : pose.y,
          rotate: !reducedMotion && depth === 0 ? -7 : pose.rotate,
          opacity: 0,
        }),
      }}
      initial="enter"
      animate={pose}
      exit="leave"
      transition={{ duration: reducedMotion ? 0 : 0.28, ease: "easeOut" }}
      onAnimationComplete={() => { if (isTop) onSettled(); }}
    >
      <motion.div
        className={`h-full w-full overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/20 shadow-lg ${isTop && canNavigate ? "cursor-grab active:cursor-grabbing" : ""}`}
        style={{ x, rotate: rotation, touchAction: "pan-y pinch-zoom" }}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={cancelDrag}
        onLostPointerCapture={cancelDrag}
        onDragStart={(event) => event.preventDefault()}
      >
        <MediaTile src={src} alt={isTop ? alt : ""} className="pointer-events-none h-full w-full select-none object-cover object-center" />
      </motion.div>
    </motion.div>
  );
}

export function ServiceImageDeck({ item, accent }: { item: PortfolioItem; accent: string }) {
  const [[imageIndex, direction], setImage] = useState([0, 1]);
  const reducedMotion = Boolean(useReducedMotion());
  const root = useRef<HTMLDivElement>(null);
  const nearby = useInView(root, { margin: "240px", once: true });
  const busy = useRef(false);
  const imageCount = item.images.length;
  const canNavigate = imageCount > 1;

  function moveImage(step: number) {
    if (!canNavigate || busy.current) return false;
    busy.current = true;
    setImage(([currentIndex]) => [(currentIndex + step + imageCount) % imageCount, step]);
    return true;
  }

  // The next two pictures are already in the stack. Cache only the previous picture as well.
  useEffect(() => {
    if (!nearby || !canNavigate) return;
    const previous = new Image();
    previous.src = item.images[(imageIndex - 1 + imageCount) % imageCount];
  }, [nearby, canNavigate, imageIndex, imageCount, item.images]);

  if (!imageCount) return null;
  const visibleImages = Array.from({ length: Math.min(VISIBLE_CARDS, imageCount) }, (_, depth) => ({
    depth,
    index: (imageIndex + depth) % imageCount,
  }));

  return (
    <div
      ref={root}
      role="group"
      aria-roledescription="carousel"
      aria-label={item.title}
      tabIndex={canNavigate ? 0 : undefined}
      className="rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-[clamp(10rem,calc((100svh_-_16rem)*2/3),23rem)] sm:max-w-[40%] sm:flex-none"
      onKeyDown={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        moveImage(event.key === "ArrowRight" ? 1 : -1);
      }}
    >
      <div className="relative isolate aspect-2/3">
        <AnimatePresence initial={false} custom={direction} onExitComplete={() => { busy.current = false; }}>
          {visibleImages.map(({ depth, index }) => (
            <DeckPhoto
              key={item.images[index]}
              src={item.images[index]}
              alt={`${item.title} — image ${index + 1} of ${imageCount}`}
              depth={depth}
              reducedMotion={reducedMotion}
              canNavigate={canNavigate}
              isBusy={() => busy.current}
              onNavigate={moveImage}
              onSettled={() => { busy.current = false; }}
            />
          ))}
        </AnimatePresence>
        {item.featured && (
          <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ backgroundColor: accent, color: "#000" }}>
            Featured
          </span>
        )}
        {canNavigate && (
          <>
            <button type="button" aria-label={`Previous ${item.title} image`} className="absolute left-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white mix-blend-difference transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" onClick={() => moveImage(-1)}>
              <ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button type="button" aria-label={`Next ${item.title} image`} className="absolute right-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white mix-blend-difference transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" onClick={() => moveImage(1)}>
              <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </>
        )}
      </div>
      <div className="relative mt-4 text-white">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] uppercase tracking-widest text-white/60">{item.category}</p>
          <span className="shrink-0 text-xs tabular-nums text-white/70" aria-live="polite" aria-atomic="true">
            <span className="sr-only">{item.title}, image </span>{imageIndex + 1} / {imageCount}
          </span>
        </div>
        <h3 className="mt-2 font-display text-lg font-bold sm:text-base">{item.client ?? item.title}</h3>
      </div>
    </div>
  );
}
