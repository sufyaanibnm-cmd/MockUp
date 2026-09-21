import { motion } from "motion/react";
import { ArrowUpRight, ImageOff } from "lucide-react";
import { MediaTile } from "./MediaTile";
import type { PortfolioItem } from "@/data/portfolio";

interface ServiceGalleryGridProps {
  items: PortfolioItem[];
  accent: string;
}

/**
 * Asymmetric editorial gallery (varying tile sizes, not a uniform card
 * grid) — see brief section 3 "SELECTED BRANDING WORK". Falls back to a
 * placeholder tile if there's no portfolio data yet for this service, so
 * the layout never breaks.
 */
export function ServiceGalleryGrid({ items, accent }: ServiceGalleryGridProps) {
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

  const spanFor = (i: number) => (i === 0 ? "md:col-span-4 md:row-span-2" : "md:col-span-2");
  const aspectFor = (i: number) => (i === 0 ? "aspect-square md:aspect-auto md:h-full" : "aspect-4/3");

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-6 md:auto-rows-[180px]">
      {items.map((item, i) => {
        const cover = item.images[0];
        return (
          <motion.div
            key={item.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
            className={`group relative overflow-hidden rounded-xl bg-black ring-1 ring-white/10 ${spanFor(i)}`}
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
              src={cover}
              alt={item.title}
              eager={i === 0}
              className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${aspectFor(i)}`}
            />
            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between bg-linear-to-t from-black/90 via-black/30 to-transparent p-5 text-white">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/70">{item.category}</p>
                <h3 className="mt-1 font-display text-lg font-bold sm:text-xl">
                  {item.client ?? item.title}
                </h3>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-white/70 transition-transform duration-300 group-hover:rotate-45" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
