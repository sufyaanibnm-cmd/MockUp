import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ImageOff } from "lucide-react";
import { MediaTile } from "./MediaTile";
import type { PortfolioItem } from "@/data/portfolio";

interface ServiceGalleryGridProps {
  items: PortfolioItem[];
  accent: string;
  carousel?: boolean;
}

function ServiceImageCarousel({ item, accent }: { item: PortfolioItem; accent: string }) {
  const [[imageIndex, direction], setImage] = useState([0, 1]);
  const reducedMotion = useReducedMotion();
  const imageCount = item.images.length;
  const source = item.images[imageIndex];
  const canNavigate = imageCount > 1;

  function moveImage(step: number) {
    if (!canNavigate) return;
    setImage(([currentIndex]) => [(currentIndex + step + imageCount) % imageCount, step]);
  }

  // Cache adjacent pictures so the arrows can switch without waiting on a download.
  useEffect(() => {
    if (!canNavigate) return;
    for (const step of [-1, 1]) {
      const adjacent = new Image();
      adjacent.src = item.images[(imageIndex + step + imageCount) % imageCount];
    }
  }, [canNavigate, imageIndex, imageCount, item.images]);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={item.title}
      tabIndex={canNavigate ? 0 : undefined}
      className="overflow-hidden rounded-xl bg-neutral-950 ring-1 ring-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      onKeyDown={(event) => {
        if (!canNavigate || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
        event.preventDefault();
        moveImage(event.key === "ArrowRight" ? 1 : -1);
      }}
    >
      <div className="relative aspect-9/16 overflow-hidden bg-black">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={source}
            custom={direction}
            className="absolute inset-0"
            variants={{
              enter: (step: number) => ({ x: reducedMotion ? 0 : `${step * 100}%` }),
              visible: { x: 0 },
              exit: (step: number) => ({ x: reducedMotion ? 0 : `${step * -100}%` }),
            }}
            initial="enter"
            animate="visible"
            exit="exit"
            transition={{ duration: reducedMotion ? 0 : 0.3, ease: "easeInOut" }}
          >
            <MediaTile
              key={source}
              src={source}
              alt={`${item.title} — image ${imageIndex + 1} of ${imageCount}`}
              eager
              className="h-full w-full object-contain"
            />
          </motion.div>
        </AnimatePresence>
        {item.featured && (
          <span
            className="absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{ backgroundColor: accent, color: "#000" }}
          >
            Featured
          </span>
        )}
        {canNavigate && (
          <>
            <button
              type="button"
              aria-label={`Previous ${item.title} image`}
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/75 text-white shadow-lg transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              onClick={() => moveImage(-1)}
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={`Next ${item.title} image`}
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/75 text-white shadow-lg transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              onClick={() => moveImage(1)}
            >
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </>
        )}
      </div>
      <div className="border-t border-white/10 p-5 text-white">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] uppercase tracking-widest text-white/60">{item.category}</p>
          <span className="shrink-0 text-xs tabular-nums text-white/70" aria-live="polite" aria-atomic="true">
            {imageIndex + 1} / {imageCount}
          </span>
        </div>
        <h3 className="mt-2 font-display text-lg font-bold sm:text-xl">{item.client ?? item.title}</h3>
      </div>
    </div>
  );
}

export function ServiceGalleryGrid({ items, accent, carousel = false }: ServiceGalleryGridProps) {
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

  if (carousel) {
    return (
      <div className="mx-auto grid max-w-3xl grid-cols-1 items-start gap-8 sm:grid-cols-2">
        {items.map((item) => <ServiceImageCarousel key={item.slug} item={item} accent={accent} />)}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-6 md:auto-rows-[180px]">
      {items.map((item, index) => (
        <motion.div
          key={item.slug}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: index * 0.06 }}
          className={`group relative overflow-hidden rounded-xl bg-black ring-1 ring-white/10 ${index === 0 ? "md:col-span-4 md:row-span-2" : "md:col-span-2"}`}
        >
          {item.featured && (
            <span
              className="absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ backgroundColor: accent, color: "#000" }}
            >
              Featured
            </span>
          )}
          <MediaTile
            src={item.images[0]}
            alt={item.title}
            eager={index === 0}
            className={`h-full w-full object-cover ${index === 0 ? "aspect-square md:aspect-auto md:h-full" : "aspect-4/3"}`}
          />
          <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black/90 via-black/50 to-transparent p-5 text-white">
            <p className="text-[10px] uppercase tracking-widest text-white/70">{item.category}</p>
            <h3 className="mt-1 font-display text-lg font-bold sm:text-xl">{item.client ?? item.title}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
