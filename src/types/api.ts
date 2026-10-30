// ==================== Common API Envelope ====================
export interface ApiResponse<T> {
  success: boolean;
  statusCode?: number;
  message: string;
  data: T;
  errors?: string[];
}

// ==================== Auth & User ====================
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'reporter' | 'user';
  permissions?: string[];
  isActive?: boolean;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: UserProfile;
}

// ==================== Categories ====================
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  parent?: string | null;
  isActive: boolean;
  order?: number;
  children?: Category[];
  subcategories?: Category[];
}

// ==================== Articles ====================
export interface ArticleAuthor {
  _id?: string;
  name: string;
  avatar?: string;
}

export interface ArticleListItem {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  featuredImage: string;
  category: Pick<Category, '_id' | 'name' | 'slug'>;
  author: ArticleAuthor;
  views: number;
  shares: number;
  publishedAt: string;
  readTime: number;
}

export interface ArticleDetail extends ArticleListItem {
  content: string; // HTML markup
  featuredImageAlt?: string;
  tags?: string[];
  likes: number;
  dislikes: number;
  clicks?: number;
}

export interface ArticleReactions {
  likes: number;
  dislikes: number;
  userReaction: 'LIKE' | 'DISLIKE' | null;
}

export interface ArticleComment {
  _id: string;
  body: string;
  author: {
    _id?: string;
    name: string;
  };
  createdAt: string;
  replies?: ArticleComment[];
}

// ==================== Advertisements ====================
export interface AdSlot {
  _id?: string;
  key: string;
  name: string;
  size: {
    width: number;
    height: number;
  };
}

export interface PublicAd {
  adCampaignId: string;
  adSlotId: string;
  title: string;
  imageUrl: string;
  imageAlt?: string;
  clickUrl: string;
  target?: '_blank' | '_self';
  width?: number;
  height?: number;
}

export interface AdSlotResponse {
  slot: AdSlot;
  ads: PublicAd[];
}

// ==================== Media & Video ====================
export interface MediaImage {
  _id: string;
  title: string;
  url: string;
  altText?: string;
}

export interface MediaVideo {
  _id: string;
  title: string;
  youtubeUrl: string;
  embedUrl: string;
  thumbnailUrl?: string;
  videoType: 'VIDEO' | 'SHORT';
  category?: Pick<Category, '_id' | 'name' | 'slug'>;
  status: string;
  createdAt?: string;
  youtubeVideoID?: string;
}

// ==================== Photo Gallery ====================
export interface GalleryItem {
  _id: string;
  title: string;
  mediaType?: 'image' | 'video';
  mediaUrl?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  caption?: string;
  isHomeFeatured?: boolean;
}

// ==================== Ticker & Notices ====================
export interface NoticeTickerItem {
  _id: string;
  message: string;
  linkUrl?: string;
  kind?: "NOTICE" | "BREAKING";
  createdAt?: string;
}

// ==================== Question of the Day ====================
export interface QotdOptionMeta {
  id: string;
  label: string;
  votes: number;
  percent: number;
}

export interface QotdQuestion {
  _id: string;
  id?: string;
  question: string;
  options: string[];
  category?: string;
  startDate: string;
  endDate: string;
  totalVotes?: number;
  optionVotes?: number[];
  description?: string;
  winningOptionId?: string;
}

export interface ArchiveQuestionItem {
  _id: string;
  id: string;
  question: string;
  category: string;
  description: string;
  date: string;
  endDate: string;
  totalVotes: number;
  options: QotdOptionMeta[];
  winningOptionId: string;
  correctAnswer: string;
  isActive: boolean;
}

export interface QotdVoteResult {
  questionId: string;
  totalVotes: number;
  optionVotes: number[];
  options: QotdOptionMeta[];
  correct: boolean;
  correctAnswer: string;
}

export interface QotdAnswerResult {
  correct: boolean;
  correctAnswer: string;
}

// ==================== Site Settings ====================
export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface SiteSettings {
  _id: string;
  siteName: string;
  tagline: string;
  logoUrl?: string;
  logoLightUrl?: string;
  logoDarkUrl?: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  isMaintenanceMode: boolean;
  socialLinks: SocialLink[];
}

// ==================== Static Pages ====================
export interface StaticPageMenuItem {
  _id: string;
  title: string;
  slug: string;
  showInFooter?: boolean;
  sortOrder?: number;
}

export interface StaticPage extends StaticPageMenuItem {
  content: string;
  excerpt?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

// ==================== Live News ====================
export interface LiveNewsItem {
  _id: string;
  heading: string;
  linkText: string;
  linkUrl: string;
  category: { _id: string; name: string; slug: string } | string;
  isActive: boolean;
  priority: number;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ==================== Cities (Hyperlocal) ====================
export interface PublicCity {
  _id: string;
  name: string;
  slug: string;
  state?: string;
  description?: string;
  coverImage?: string;
  order?: number;
}

// ==================== E-Paper ====================
export interface EpaperEditionItem {
  _id: string;
  title: string;
  slug: string;
  editionDate: string;
  pdfUrl: string;
  coverImageUrl?: string;
  pageCount?: number;
  fileSize?: string;
  blurb?: string;
  city?: { _id: string; name: string; slug: string } | null;
}

// ==================== Public Polls ====================
export interface PublicPollOption {
  _id: string;
  text: string;
  votes: number;
  percentage: number;
}

export interface PublicPoll {
  _id: string;
  question: string;
  totalVotes: number;
  options: PublicPollOption[];
}

// ==================== Public Galleries ====================
export interface PublicGalleryImage {
  _id?: string;
  imageUrl: string;
  caption?: string;
  order?: number;
}

export interface PublicGallery {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  images: PublicGalleryImage[];
  category?: { _id: string; name: string; slug: string };
  publishedAt?: string;
}

// ==================== Public Submissions ====================
export interface NewsTipPayload {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  location?: string;
  description: string;
  attachments?: string[];
}

export interface AdInquiryPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  adType?: string;
  budget?: string;
  preferredSlot?: string;
  startDate?: string;
  endDate?: string;
  message?: string;
}

export interface ReporterApplicationPayload {
  fullName: string;
  email: string;
  phone: string;
  city?: string;
  experience?: string;
  portfolioUrl?: string;
  coverLetter?: string;
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

// ==================== Public Home Feed ====================
export interface PublicHomeFeed {
  generatedAt: string;
  breaking: any[];
  lead: any;
  featured: any[];
  trending: any[];
  editorsPicks: any[];
  latest: any[];
  sections: any[];
  videos: any[];
  shorts: any[];
  galleries: any[];
  epaper: EpaperEditionItem | null;
  notices: any[];
  poll: PublicPoll | null;
}
