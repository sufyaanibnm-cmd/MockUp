import { motion } from "motion/react";
import { ImageOff } from "lucide-react";
import { MediaTile } from "./MediaTile";
import { ServiceImageDeck } from "./ServiceImageDeck";
import type { PortfolioItem } from "@/data/portfolio";

interface ServiceGalleryGridProps {
  items: PortfolioItem[];
  accent: string;
  carousel?: boolean;
  carouselAspectRatio?: number;
}

export function ServiceGalleryGrid({ items, accent, carousel = false, carouselAspectRatio }: ServiceGalleryGridProps) {
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
      // Equal space at both page edges and between cards; each card retains its height-based sizing.
      <div className="grid grid-cols-1 gap-8 overflow-x-clip px-6 sm:flex sm:items-start sm:justify-evenly sm:gap-0 sm:px-0">
        {items.map((item) => <ServiceImageDeck key={item.slug} item={item} accent={accent} aspectRatio={carouselAspectRatio} />)}
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
