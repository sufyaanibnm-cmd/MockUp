import { useState, type CSSProperties } from "react";
import { ImageOff } from "lucide-react";

interface MediaTileProps {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
  style?: CSSProperties;
}

/**
 * An <img> that gracefully falls back to a muted "Coming soon" state if
 * the asset is missing or fails to load — so galleries never break when
 * real media hasn't been dropped into `public/` yet (see ServiceGallery
 * for the original version of this pattern).
 */
export function MediaTile({ src, alt, className, eager = false, style }: MediaTileProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-white/[0.03] ${className ?? ""}`}
        style={style}
        role="img"
        aria-label={`${alt} — image coming soon`}
      >
        <div className="flex flex-col items-center gap-2 text-white/25">
          <ImageOff className="h-6 w-6" aria-hidden="true" />
          <span className="text-[10px] uppercase tracking-widest">Coming soon</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
      style={style}
    />
  );
}
