import { cache } from 'react';
import {
  Category,
  ArticleListItem,
  ArticleDetail,
  ArticleReactions,
  ArticleComment,
  AdSlotResponse,
  MediaImage,
  MediaVideo,
  GalleryItem,
  NoticeTickerItem,
  QotdQuestion,
  QotdAnswerResult,
  ArchiveQuestionItem,
  QotdVoteResult,
  SiteSettings,
  StaticPage,
  StaticPageMenuItem,
  AuthResponse,
  UserProfile,
  LiveNewsItem,
  PublicCity,
  EpaperEditionItem,
  PublicPoll,
  PublicGallery,
  NewsTipPayload,
  AdInquiryPayload,
  ReporterApplicationPayload,
  ContactMessagePayload,
  PublicHomeFeed,
} from '@/types/api';

export function getApiBase(): string {
  const envUrl = (
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.VITE_API_URL ||
    'http://localhost:5000/api/v1'
  ).replace(/\/$/, '');

  // When running in the browser on another machine/device via LAN IP
  if (typeof window !== 'undefined') {
    try {
      const parsed = new URL(envUrl, window.location.origin);
      const isLocalOrLan =
        parsed.hostname === 'localhost' ||
        parsed.hostname === '127.0.0.1' ||
        parsed.hostname.startsWith('192.168.') ||
        parsed.hostname.startsWith('10.') ||
        parsed.hostname.startsWith('172.');

      if (
        isLocalOrLan &&
        window.location.hostname &&
        window.location.hostname !== parsed.hostname
      ) {
        parsed.hostname = window.location.hostname;
        return parsed.toString().replace(/\/$/, '');
      }
    } catch {
      // fallback
    }
  }

  return envUrl;
}

export const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.VITE_API_URL ||
  'http://localhost:5000/api/v1'
).replace(/\/$/, '');

export class ApiError extends Error {
  statusCode: number;
  errors?: string[];

  constructor(message: string, statusCode: number = 0, errors?: string[]) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

// Token storage helpers
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('kt_access_token');
};

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('kt_refresh_token');
};

export const setAuthTokens = (accessToken: string, refreshToken?: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('kt_access_token', accessToken);
  if (refreshToken) localStorage.setItem('kt_refresh_token', refreshToken);
};

export const clearAuthTokens = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('kt_access_token');
  localStorage.removeItem('kt_refresh_token');
};

// Auto-refresh token locking mechanism
let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const res = await fetch(`${getApiBase()}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) return false;
    const data = await res.json();
    const newAccessToken = data?.data?.accessToken;
    if (newAccessToken) {
      setAuthTokens(newAccessToken);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export async function request<T>(
  endpoint: string,
  options: RequestInit & {
    requiresAuth?: boolean;
    _retry?: boolean;
    timeoutMs?: number;
    next?: { revalidate?: number | false; tags?: string[] };
  } = {}
): Promise<T> {
  const { requiresAuth = false, _retry = false, headers = {}, timeoutMs = 12000, next, ...rest } = options;

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string>),
  };

  const token = getAuthToken();
  if (requiresAuth && token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  let response: Response;
  try {
    const fetchOptions: any = {
      ...rest,
      signal: rest.signal || controller.signal,
      headers: requestHeaders,
    };
    if (next) {
      fetchOptions.next = next;
    }
    response = await fetch(`${getApiBase()}${endpoint}`, fetchOptions);
  } catch {
    throw new ApiError(
      'Unable to connect to Kamgar Times server. Please check your internet connection.',
      0
    );
  } finally {
    clearTimeout(timeoutId);
  }

  // Token expired handle (401)
  if (response.status === 401 && requiresAuth && !_retry) {
    if (!refreshPromise) {
      refreshPromise = refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
    }
    const refreshed = await refreshPromise;
    if (refreshed) {
      return request<T>(endpoint, { ...options, _retry: true });
    } else {
      clearAuthTokens();
    }
  }

  const json = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage = json?.message || 'Something went wrong';
    throw new ApiError(errorMessage, response.status, json?.errors);
  }

  return (json && 'data' in json ? json.data : json) as T;
}

// Low-level HTTP helper
export const api = {
  get: <T>(
    url: string,
    requiresAuth = false,
    options?: { next?: { revalidate?: number | false; tags?: string[] } }
  ) =>
    request<T>(url, { method: 'GET', requiresAuth, ...options }),
  post: <T>(url: string, body?: any, requiresAuth = false) =>
    request<T>(url, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      requiresAuth,
    }),
  put: <T>(url: string, body?: any, requiresAuth = false) =>
    request<T>(url, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
      requiresAuth,
    }),
  patch: <T>(url: string, body?: any, requiresAuth = false) =>
    request<T>(url, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
      requiresAuth,
    }),
  delete: <T>(url: string, requiresAuth = false) =>
    request<T>(url, { method: 'DELETE', requiresAuth }),
};

// High-level Domain API Methods (Section 4 of PUBLIC_API.md)
export const kamgarApi = {
  // 4.1 Health Check
  getHealth: () => request<{ success: boolean; message: string }>('/health'),

  // 4.2 Auth APIs
  register: (body: { name: string; email: string; password: string }) =>
    api.post<UserProfile>('/auth/register', body),

  login: (body: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/login', body),

  refreshToken: (refreshToken: string) =>
    api.post<{ accessToken: string }>('/auth/refresh', { refreshToken }),

  getMe: () => api.get<UserProfile>('/auth/me', true),

  // 4.3 Articles
  getArticles: (params?: {
    category?: string;
    city?: string;
    citySlug?: string;
    search?: string;
    tag?: string;
    page?: number;
    limit?: number;
  }) => {
    const query = new URLSearchParams();
    if (params?.category) query.set('category', params.category);
    if (params?.city) query.set('city', params.city);
    if (params?.citySlug) query.set('citySlug', params.citySlug);
    if (params?.search) query.set('search', params.search);
    if (params?.tag) query.set('tag', params.tag);
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));
    const qs = query.toString();
    return api.get<{ articles: ArticleListItem[]; total: number; page: number; limit: number }>(
      `/public/articles${qs ? `?${qs}` : ''}`,
      false,
      { next: { revalidate: 30 } }
    );
  },

  getArticleBySlug: cache((slug: string) =>
    api.get<ArticleDetail>(`/public/articles/${slug}`, false, {
      next: { revalidate: 30 },
    })
  ),

  recordArticleView: (idOrSlug: string) =>
    api.post<{ views: number }>(`/public/articles/${idOrSlug}/view`),

  recordArticleShare: (idOrSlug: string) =>
    api.post<{ shares: number }>(`/public/articles/${idOrSlug}/share`),

  recordArticleClick: (idOrSlug: string) =>
    api.post<{ clicks: number }>(`/public/articles/${idOrSlug}/clicks`),

  getArticleReactions: (idOrSlug: string) =>
    api.get<ArticleReactions>(`/public/articles/${idOrSlug}/reactions`, !!getAuthToken()),

  toggleArticleReaction: (idOrSlug: string, type: 'LIKE' | 'DISLIKE') =>
    api.post<ArticleReactions>(`/public/articles/${idOrSlug}/reactions`, { type }, true),

  getArticleComments: (idOrSlug: string, page = 1, limit = 20) =>
    api.get<{ comments: ArticleComment[]; total: number; page: number; limit: number }>(
      `/public/articles/${idOrSlug}/comments?page=${page}&limit=${limit}`
    ),

  postArticleComment: (idOrSlug: string, body: { body: string; parent?: string | null }) =>
    api.post<{ _id: string; body: string; user: { _id: string; name: string }; createdAt: string }>(
      `/public/articles/${idOrSlug}/comments`,
      body,
      true
    ),

  // 4.4 Categories
  getCategories: cache((isActive = true) =>
    api.get<{ categories: Category[]; total: number }>(`/categories?isActive=${isActive}`, false, {
      next: { revalidate: 30 },
    })
  ),

  getCategoryTree: async (): Promise<Category[]> => {
    const response = await api.get<
      Category[] | { data?: Category[]; categories?: Category[] } | null
    >('/public/categories');

    if (Array.isArray(response)) return response;

    const tree = response?.data ?? response?.categories;
    if (Array.isArray(tree)) return tree;

    throw new ApiError('The public category response was not a list.');
  },

  // 4.5 Public Ads
  getAds: (slotKey: string) =>
    api.get<AdSlotResponse>(`/public/ads?slot=${encodeURIComponent(slotKey)}`),

  recordAdClick: async (adCampaignId: string, adSlotId?: string) => {
    return api.post<{ clickUrl: string; target: string }>('/public/ads/click', {
      adCampaignId,
      adSlotId,
    });
  },

  recordAdImpression: async (adCampaignId: string, adSlotId?: string) => {
    return api.post<{ recorded: boolean }>('/public/ads/impression', {
      adCampaignId,
      adSlotId,
    });
  },

  // 4.6 Media Library
  getMediaImages: (page = 1, limit = 20, search?: string) => {
    const qs = search ? `&search=${encodeURIComponent(search)}` : '';
    return api.get<{ images: MediaImage[]; total: number; page: number; limit: number }>(
      `/public/media/images?page=${page}&limit=${limit}${qs}`
    );
  },

  getMediaVideos: (params?: { videoType?: 'VIDEO' | 'SHORT'; category?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.videoType) query.set('videoType', params.videoType);
    if (params?.category) query.set('category', params.category);
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));
    const qs = query.toString();
    return api.get<{ videos: MediaVideo[]; total: number; page: number; limit: number }>(
      `/public/media/videos${qs ? `?${qs}` : ''}`
    );
  },

  // 4.7 Photo Gallery
  getHomeGallery: () => api.get<GalleryItem[]>('/gallery/home'),
  getGallery: (page = 1, limit = 12) =>
    api.get<{ items: GalleryItem[]; pagination: any }>('/gallery?page=' + page + '&limit=' + limit),

  // 4.8 Breaking News Ticker
  getNoticeTicker: () => api.get<NoticeTickerItem[]>('/public/notices/ticker'),
  getLatestArticleTicker: (limit = 20) =>
    api.get<ArticleListItem[]>(`/public/articles/ticker?limit=${limit}`),

  // 4.9 Question of the Day (QOTD)
  getTodayQuestion: (category?: string) =>
    api.get<QotdQuestion>(`/public/question-of-the-day${category ? `?category=${encodeURIComponent(category)}` : ''}`),

  getPastQuestions: (params?: { category?: string; search?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.category && params.category !== "सभी") query.set("category", params.category);
    if (params?.search) query.set("search", params.search);
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    return api.get<{ questions: ArchiveQuestionItem[]; total: number; page: number; limit: number }>(
      `/public/question-of-the-day/archive${qs ? `?${qs}` : ''}`
    );
  },

  voteQuestion: (body: { questionId: string; optionIndex: number; optionLabel?: string }) =>
    api.post<QotdVoteResult>('/public/question-of-the-day/vote', body),

  checkAnswer: (body: { answer: string; category?: string; questionId?: string }) =>
    api.post<QotdAnswerResult>('/public/question-of-the-day/check', body),

  // 4.10 Site Settings
  getSiteSettings: cache(() =>
    api.get<SiteSettings>('/public/site-setting', false, { next: { revalidate: 30 } })
  ),

  // 4.11 Static Pages
  getStaticPages: (params?: { showInFooter?: boolean }) => {
    const query = new URLSearchParams();
    if (params?.showInFooter !== undefined) query.set('showInFooter', String(params.showInFooter));
    const qs = query.toString();
    return api.get<{ pages: StaticPageMenuItem[]; total: number }>(
      `/public/static-pages${qs ? `?${qs}` : ''}`
    );
  },

  getStaticPage: (slug: string) =>
    api.get<StaticPage>(`/public/static-pages/${encodeURIComponent(slug)}`),

  // 4.12 Live News
  getLiveNews: (limit?: number) => {
    const qs = limit ? `?limit=${limit}` : '';
    return api.get<LiveNewsItem[]>(`/public/live-news${qs}`);
  },

  // 4.13 Composed Homepage Feed
  getPublicHome: () => api.get<PublicHomeFeed>('/public/home'),

  // 4.14 Hyperlocal Cities
  getCities: () => api.get<{ cities: PublicCity[]; total: number }>('/public/cities'),
  getCityBySlug: (slug: string) => api.get<PublicCity>(`/public/cities/${encodeURIComponent(slug)}`),

  // 4.15 Digital E-Paper
  getEpaperEditions: (params?: { citySlug?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.citySlug) query.set('citySlug', params.citySlug);
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));
    const qs = query.toString();
    return api.get<{
      editions: EpaperEditionItem[];
      latest: EpaperEditionItem | null;
      total: number;
      page: number;
      limit: number;
    }>(`/public/epaper${qs ? `?${qs}` : ''}`);
  },
  getEpaperBySlug: (slug: string) => api.get<EpaperEditionItem>(`/public/epaper/${encodeURIComponent(slug)}`),

  // 4.16 Public Polls
  getActivePoll: () => api.get<PublicPoll | null>('/public/polls/active'),
  votePoll: (id: string, optionId: string) =>
    api.post<PublicPoll>(`/public/polls/${id}/vote`, { optionId }, !!getAuthToken()),

  // 4.17 Public Galleries
  getPublicGalleries: (params?: { categorySlug?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.categorySlug) query.set('categorySlug', params.categorySlug);
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));
    const qs = query.toString();
    return api.get<{
      galleries: PublicGallery[];
      total: number;
      page: number;
      limit: number;
    }>(`/public/galleries${qs ? `?${qs}` : ''}`);
  },
  getPublicGalleryBySlug: (slug: string) =>
    api.get<PublicGallery>(`/public/galleries/${encodeURIComponent(slug)}`),

  // 4.18 Public Submissions
  submitNewsTip: (body: NewsTipPayload) =>
    api.post<{ _id: string; status: string }>('/public/submissions/news-tips', body),

  submitAdInquiry: (body: AdInquiryPayload) =>
    api.post<{ _id: string; status: string }>('/public/submissions/ad-inquiries', body),

  submitReporterApplication: (body: ReporterApplicationPayload) =>
    api.post<{ _id: string; status: string }>('/public/submissions/reporter-applications', body),

  submitContactMessage: (body: ContactMessagePayload) =>
    api.post<{ _id: string; status: string }>('/public/submissions/contact-messages', body),
};
