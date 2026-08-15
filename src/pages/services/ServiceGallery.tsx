import { ImageOff } from "lucide-react";

interface ServiceGalleryProps {
  /** Image URLs (e.g. `${import.meta.env.BASE_URL}services/<slug>/file.png`). */
  images: string[];
  /** Used for alt text and the empty-state label. */
  label: string;
}

/**
 * Same visual language as `ProjectPlaceholder`/gallery tiles in
 * `Portfolio.tsx`: a rounded-xl black tile with a muted "Coming soon"
 * state when no images have been added yet. Drop files into
 * `public/services/<slug>/` and list them in the page's `images` array
 * to populate this grid — no other wiring required.
 */
export function ServiceGallery({ images, label }: ServiceGalleryProps) {
  if (images.length === 0) {
    return (
      <div className="aspect-4/3 w-full overflow-hidden rounded-xl bg-black/40 ring-1 ring-white/10">
        <div
          className="flex h-full w-full items-center justify-center"
          role="img"
          aria-label={`${label} gallery coming soon`}
        >
          <div className="flex flex-col items-center gap-2 text-white/30">
            <ImageOff className="h-8 w-8" aria-hidden="true" />
            <span className="text-xs uppercase tracking-widest">Coming soon</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((src, i) => (
        <div
          key={src}
          className={`overflow-hidden rounded-xl bg-black ring-1 ring-white/10 ${
            i === 0 ? "col-span-2 aspect-16/9" : "aspect-4/3"
          }`}
        >
          <img
            src={src}
            alt={`${label} preview ${i + 1}`}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
