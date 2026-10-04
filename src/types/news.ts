export interface NewsArticle {
  id: string;
  title: string;
  subheadline?: string;
  summary: string;
  content: string[];
  category: string;
  categoryLabel: string;
  city?: string;
  imageUrl: string;
  imageCaption?: string;
  publishedAt: string;
  updatedAt?: string;
  author?: {
    name: string;
    role: string;
    avatar: string;
  };
  readTime: string;
  views: number;
  commentsCount: number;
  likes: number;
  isBreaking?: boolean;
  isTrending?: boolean;
  isHero?: boolean;
  isLive?: boolean;
  tags: string[];
}

export interface LiveUpdateItem {
  id: string;
  time: string;
  title: string;
  description: string;
  tag?: string;
  isImportant?: boolean;
}

export interface VideoReel {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  views: string;
  category: string;
}

export interface EpaperEdition {
  id: string;
  date: string;
  title: string;
  thumbnail: string;
  pdfUrl: string;
  totalPages: number;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
}
