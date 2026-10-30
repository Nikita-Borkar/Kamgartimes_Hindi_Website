export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://kamgartimes.com"
).replace(/\/$/, "");

export function articlePath(slug: string): string {
  return `/news/${encodeURIComponent(slug)}`;
}

export function absoluteSiteUrl(path: string): string {
  return new URL(path, `${SITE_URL}/`).toString();
}
