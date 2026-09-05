const BASE = import.meta.env.BASE_URL;

/**
 * Resolves an image filename to its path under `public/services/<slug>/`.
 * To add images to a service page: drop the file in
 * `public/services/<slug>/` and add its filename to that page's
 * `images` array — nothing else needs to change.
 */
export function serviceAsset(slug: string, file: string): string {
  return `${BASE}services/${slug}/${file}`;
}
