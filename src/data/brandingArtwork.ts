import { brandingImageFiles } from "./portfolioImages";

export interface BrandingArtwork {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Follow the approved fan preview, with all original artwork in one collection.
const artworkDetails = [
  { fileIndex: 10, alt: "Cricketeria · Hoodies, front and back" },
  { fileIndex: 3, alt: "Cricketeria · Visual identity" },
  { fileIndex: 7, alt: "Cricketeria · Dimensional logo sign" },
  { fileIndex: 8, alt: "Cricketeria · Logo stickers" },
  { fileIndex: 9, alt: "Cricketeria · Branded caps" },
  { fileIndex: 11, alt: "Cricketeria · Hoodie design" },
  { fileIndex: 12, alt: "Cricketeria · Sportswear" },
  { fileIndex: 13, alt: "Cricketeria · Wall signage" },
  { fileIndex: 0, alt: "Lspace · Visual identity" },
  { fileIndex: 1, alt: "Cloud Apparels · Visual identity" },
  { fileIndex: 2, alt: "Purple Curve · Visual identity" },
  { fileIndex: 4, alt: "JR Dental Clinic · Visual identity" },
  { fileIndex: 5, alt: "Armar’s · Visual identity" },
  { fileIndex: 6, alt: "The Sheikh Shawarma · Visual identity" },
  { fileIndex: 14, alt: "Cloud Apparels · Document envelope" },
  { fileIndex: 15, alt: "Cloud Apparels · Box packaging" },
  { fileIndex: 16, alt: "Cloud Apparels · Branded keychain" },
  { fileIndex: 17, alt: "Cloud Apparels · Textured logo detail" },
  { fileIndex: 18, alt: "Cloud Apparels · Business cards" },
  { fileIndex: 19, alt: "Cloud Apparels · Laptop sticker" },
  { fileIndex: 20, alt: "Cloud Apparels · Storefront signage" },
] as const;

export const brandingArtwork: BrandingArtwork[] = artworkDetails.map(({ fileIndex, alt }) => ({
  src: `${import.meta.env.BASE_URL}portfolio/Branding + Presentation/${brandingImageFiles[fileIndex]}`,
  alt,
  width: fileIndex === 16 ? 1536 : 2160,
  height: fileIndex === 16 ? 2752 : 3840,
}));
