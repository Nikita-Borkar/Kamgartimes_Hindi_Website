// src/lib/apiAdapters.ts
import type { Article, VideoItem, GalleryItem as UI_GalleryItem } from "@/data/types";
import type {
  ArticleListItem,
  ArticleDetail,
  MediaVideo,
  GalleryItem as API_GalleryItem,
} from "@/types/api";

/** Format ISO date into reader-friendly Hindi wire time */
export function formatHindiTime(isoDate?: string): string {
  if (!isoDate) return "ताज़ा अपडेट";
  try {
    const date = new Date(isoDate);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 5) return "अभी-अभी";
    if (diffMins < 60) return `${diffMins} मिनट पहले`;
    if (diffHours < 24) return `${diffHours} घंटे पहले`;
    if (diffDays < 7) return `${diffDays} दिन पहले`;

    return date.toLocaleDateString("hi-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "ताज़ा अपडेट";
  }
}

/** Convert a backend ArticleListItem into the frontend Article model */
export function adaptArticleListItem(item: ArticleListItem): Article {
  const fallbackImg = "/img/img01.png";
  const image = item.featuredImage && item.featuredImage.trim() !== ""
    ? item.featuredImage
    : fallbackImg;

  return {
    id: item.slug || item._id,
    apiId: item._id,
    category: item.category?.name || "समाचार",
    headline: item.title,
    excerpt: item.summary,
    image,
    meta: `${formatHindiTime(item.publishedAt)} · ${item.readTime || 3} मिनट`,
    views: item.views,
    shares: item.shares,
    publishedAt: item.publishedAt,
  };
}

/** Convert a backend ArticleDetail into the extended frontend Article model */
export function adaptArticleDetail(item: ArticleDetail): Article & {
  content?: string;
  tags?: string[];
  author?: { name: string; role?: string };
  likes?: number;
  dislikes?: number;
} {
  const base = adaptArticleListItem(item);
  const publisher = (item as ArticleDetail & { publishedBy?: { name?: string } }).publishedBy;
  return {
    ...base,
    apiId: item._id,
    content: item.content,
    tags: item.tags,
    author: item.author
      ? { name: publisher?.name || item.author.name, role: "प्रकाशितकर्ता" }
      : undefined,
    likes: item.likes,
    dislikes: item.dislikes,
  };
}

/** Convert a backend MediaVideo into frontend VideoItem */
export function adaptMediaVideo(video: MediaVideo): VideoItem & {
  embedUrl?: string;
  youtubeUrl?: string;
} {
  return {
    id: video._id,
    title: video.title,
    duration: video.videoType === "SHORT" ? "शॉर्ट्स" : "विशेष कवरेज",
    meta: video.category?.name ? `${video.category.name} · वीडियो` : "कामगार टाइम्स वीडियो",
    image:
      video.thumbnailUrl ||
      (video.youtubeUrl?.includes("v=")
        ? `https://img.youtube.com/vi/${video.youtubeUrl.split("v=")[1].split("&")[0]}/hqdefault.jpg`
        : "/img/img02.png"),
    embedUrl: video.embedUrl,
    youtubeUrl: video.youtubeUrl,
  };
}

/** Convert a backend GalleryItem into frontend GalleryItem */
export function adaptGalleryItem(item: API_GalleryItem): UI_GalleryItem {
  return {
    id: item._id,
    headline: item.title,
    category: "फोटो गैलरी",
    image: item.imageUrl || item.mediaUrl || item.thumbnailUrl || "",
  };
}
