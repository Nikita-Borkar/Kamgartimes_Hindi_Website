import { Link2 } from "lucide-react";

const socialLabels: Record<string, string> = {
  facebook: "फेसबुक",
  instagram: "इंस्टाग्राम",
  telegram: "टेलीग्राम",
  twitter: "एक्स (ट्विटर)",
  x: "एक्स (ट्विटर)",
  whatsapp: "व्हाट्सएप",
  youtube: "यूट्यूब",
};

export function socialPlatformLabel(platform: string): string {
  const normalized = platform.trim().toLowerCase();
  return (
    socialLabels[normalized] ||
    normalized.replace(/[-_]+/g, " ").replace(/\b[a-z]/g, (letter) => letter.toUpperCase())
  );
}

export function getSafeSocialUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

export function SocialPlatformIcon({
  platform,
  size = 18,
}: {
  platform: string;
  size?: number;
}) {
  switch (platform.trim().toLowerCase()) {
    case "facebook":
      return <FacebookIcon size={size} />;
    case "instagram":
      return <InstagramIcon size={size} />;
    case "telegram":
      return <TelegramIcon size={size} />;
    case "twitter":
    case "x":
      return <TwitterXIcon size={size} />;
    case "whatsapp":
      return <WhatsappIcon size={size} />;
    case "youtube":
      return <YoutubeIcon size={size} />;
    default:
      return <Link2 size={size} aria-hidden="true" />;
  }
}

export function FacebookIcon({ size = 18, color = "#1877F2" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="#ffffff" />
      <path
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
        fill={color}
      />
    </svg>
  );
}

export function YoutubeIcon({ size = 18, color = "#FF0000" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function InstagramIcon({ size = 18, color = "#E4405F" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export function TwitterXIcon({ size = 18, color = "#0f1419" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function WhatsappIcon({ size = 18, color = "#25D366" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        fill={color}
        d="M12.04 2C6.54 2 2.08 6.46 2.08 11.96c0 1.96.57 3.8 1.56 5.36L2 22l4.82-1.57A9.91 9.91 0 0 0 12.04 22c5.5 0 9.96-4.46 9.96-9.96 0-5.5-4.46-10.04-9.96-10.04z"
      />
      <path
        fill="#ffffff"
        d="M17.52 14.39c-.29-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.67.15-.2.29-.76.96-.93 1.16-.17.2-.34.22-.64.07-.29-.15-1.24-.46-2.37-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.29-.02-.45.13-.6.13-.13.3-.34.44-.51.15-.17.2-.3.29-.49.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.91-2.2-.24-.58-.48-.5-.66-.51l-.57-.01c-.19 0-.51.07-.78.37-.27.29-1.03 1.01-1.03 2.46s1.05 2.85 1.2 3.05c.15.2 2.07 3.17 5.03 4.45.7.3 1.25.48 1.68.62.71.22 1.35.19 1.86.12.57-.08 1.74-.71 1.98-1.4.24-.69.24-1.28.17-1.4-.07-.12-.27-.22-.56-.37z"
      />
    </svg>
  );
}

export function TelegramIcon({ size = 18, color = "#229ED9" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill={color} />
      <path
        d="M17.8 7.2L5.8 11.9c-.8.3-.8.8-.1 1l3.1 1 1.2 3.6c.1.4.3.4.5.2l1.8-1.7 3.3 2.4c.6.3 1 .2 1.2-.5l2.2-10.1c.2-.9-.3-1.3-1-.6zM10.1 13.8l6.1-3.8c.3-.2.5-.1.3.1l-5.2 4.7-.2 2.2z"
        fill="#ffffff"
      />
    </svg>
  );
}
