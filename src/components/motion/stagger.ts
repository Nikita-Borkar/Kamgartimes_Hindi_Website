import type { CSSProperties } from "react";

/**
 * Per-item delay for a staggered reveal. motion.css reads --reveal-delay,
 * so the timing lives in one place instead of being repeated inline.
 */
export function stagger(index: number, step = 60): CSSProperties {
  return { "--reveal-delay": `${index * step}ms` } as CSSProperties;
}
