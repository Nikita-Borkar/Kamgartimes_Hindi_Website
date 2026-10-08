/* Placeholder art is vector SVG served from /public, which next/image will
   not optimise without images.dangerouslyAllowSVG. A plain <img> is the
   correct tool here. When these are replaced with real raster photography,
   swap this wrapper for next/image — every call site already passes `sizes`. */
/* eslint-disable @next/next/no-img-element */

export function Media({
  src,
  alt,
  sizes,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      data-sizes={sizes}
    />
  );
}
