export interface WebsiteArtwork {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Original WebPs from the supplied E-Commerce Store + Website folder.
const artworkFiles = [
  { file: "Cloud Website copy.webp", alt: "Cloud Apparels · Website design" },
  { file: "Lspace Website copy.webp", alt: "Lspace · Website design" },
  { file: "Cricketeria Website copy.webp", alt: "Cricketeria · Website design" },
] as const;

export const websiteArtwork: WebsiteArtwork[] = artworkFiles.map(({ file, alt }) => ({
  src: `${import.meta.env.BASE_URL}portfolio/E-Commerce Store + Website/${file}`,
  alt,
  width: 2160,
  height: 3840,
}));
