import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ImageOff, Pause, Play } from "lucide-react";
import { MediaTile } from "./MediaTile";
import type { PortfolioItem } from "@/data/portfolio";

interface ServiceGalleryGridProps {
  items: PortfolioItem[];
  accent: string;
  autoRotate?: boolean;
}

function ServiceImageCard({
  item,
  accent,
  index,
  autoRotate,
}: {
  item: PortfolioItem;
  accent: string;
  index: number;
  autoRotate: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { amount: 0.1 });
  const reducedMotion = useReducedMotion();
  const [imageIndex, setImageIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => document.visibilityState === "visible");
  const imageCount = item.images.length;
  const canRotate = autoRotate && imageCount > 1;
  const rotating = canRotate && inView && pageVisible && !hovered && !focused && !paused;
  const source = item.images[imageIndex];

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (!rotating) return;

    const nextIndex = (imageIndex + 1) % imageCount;
    const nextImage = new Image();
    let ready = false;
    let elapsed = false;
    const advance = () => {
      if (ready && elapsed) setImageIndex(nextIndex);
    };
    nextImage.onload = nextImage.onerror = () => {
      ready = true;
      advance();
    };
    nextImage.src = item.images[nextIndex];
    const timer = window.setTimeout(() => {
      elapsed = true;
      advance();
    }, 4000);

    return () => {
      window.clearTimeout(timer);
      nextImage.onload = null;
      nextImage.onerror = null;
    };
  }, [rotating, imageIndex, imageCount, item.images]);

  const span = index === 0 ? "md:col-span-4 md:row-span-2" : "md:col-span-2";
  const aspect = index === 0 ? "aspect-square md:aspect-auto md:h-full" : "aspect-4/3";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className={`group relative overflow-hidden rounded-xl bg-black ring-1 ring-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${span}`}
      tabIndex={canRotate ? 0 : undefined}
      aria-label={canRotate ? `${item.title}, automatic slideshow. Focus or hover to pause.` : undefined}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={(event) => setFocused(event.target.matches(":focus-visible"))}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div className={`relative h-full w-full ${aspect}`}>
        <AnimatePresence initial={false}>
          <motion.div
            key={source}
            className="absolute inset-0"
            initial={{ opacity: reducedMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6 }}
          >
            <MediaTile
              key={source}
              src={source}
              alt={`${item.title} — image ${imageIndex + 1} of ${imageCount}`}
              eager={index === 0 || autoRotate}
              className={`h-full w-full ${autoRotate ? "object-contain" : "object-cover"}`}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {item.featured && (
        <span
          className="absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
          style={{ backgroundColor: accent, color: "#000" }}
        >
          Featured
        </span>
      )}
      {canRotate && (
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full bg-black/75 px-3 py-1 text-white">
          <span className="text-[10px] font-semibold tabular-nums">{imageIndex + 1} / {imageCount}</span>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white"
            aria-label={`${paused ? "Play" : "Pause"} ${item.title} slideshow`}
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          </button>
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black/90 via-black/50 to-transparent p-5 text-white">
        <p className="text-[10px] uppercase tracking-widest text-white/70">{item.category}</p>
        <h3 className="mt-1 font-display text-lg font-bold sm:text-xl">{item.client ?? item.title}</h3>
      </div>
    </motion.div>
  );
}

export function ServiceGalleryGrid({ items, accent, autoRotate = false }: ServiceGalleryGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex aspect-21/9 w-full items-center justify-center rounded-xl bg-white/[0.03] ring-1 ring-white/10">
        <div className="flex flex-col items-center gap-2 text-white/25">
          <ImageOff className="h-7 w-7" aria-hidden="true" />
          <span className="text-xs uppercase tracking-widest">Selected work coming soon</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-6 md:auto-rows-[180px]">
      {items.map((item, index) => (
        <ServiceImageCard key={item.slug} item={item} index={index} accent={accent} autoRotate={autoRotate} />
      ))}
    </div>
  );
}
