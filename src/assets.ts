/** Fotografias em WebP: 640, 960 e o arquivo base (1292 ou 1448 px). */
export function srcSet(name: string, full = 1448) {
  return `/images/${name}-640.webp 640w, /images/${name}-960.webp 960w, /images/${name}.webp ${full}w`
}
export const STILL_FULL = 1292
