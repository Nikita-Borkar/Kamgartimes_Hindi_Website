'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Clock, Eye, MessageCircle, Share2, ThumbsUp, Heart, Bookmark, 
  ArrowLeft, Check, Copy, HardHat, Send, UserCheck, ShieldCheck 
} from 'lucide-react';
import { FacebookIcon, TwitterIcon, WhatsappIcon } from '@/components/SocialIcons';
import { ARTICLES } from '@/data/newsData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AudioPlayer from '@/components/AudioPlayer';
import SearchModal from '@/components/SearchModal';
import AdBanner from '@/components/AdBanner';
import WhatsAppBanner from '@/components/WhatsAppBanner';

export default function ArticlePage() {
  const params = useParams();
  const articleId = params?.id as string;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('नागपुर');
  const [currentLang, setCurrentLang] = useState('hi');
  const [copied, setCopied] = useState(false);
  const [likesCount, setLikesCount] = useState<number | null>(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<string[]>([
    "कामगारों के हक में यह बहुत ही ऐतिहासिक निर्णय है। न्यूनतम वेतन समय पर मिलना चाहिए।",
    "ई-श्रम कार्ड धारकों को भी इस योजना का सीधा लाभ मिलना चाहिए।"
  ]);
  const [newComment, setNewComment] = useState('');

  // Find target article or fallback to first
  const article = ARTICLES.find(a => a.id === articleId) || ARTICLES[0];
  const relatedArticles = ARTICLES.filter(a => a.id !== article.id).slice(0, 3);

  const initialLikes = likesCount === null ? article.likes : likesCount;

  const handleLike = () => {
    if (!hasLiked) {
      setLikesCount(initialLikes + 1);
      setHasLiked(true);
    } else {
      setLikesCount(initialLikes - 1);
      setHasLiked(false);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([newComment.trim(), ...comments]);
      setNewComment('');
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://kamgartimes.com';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappShareText = encodeURIComponent(`*${article.title}*\n\nपूरी खबर पढ़ें कामगार टाइम्स पर:\n${shareUrl}`);

  // JSON-LD NewsArticle Schema for Google News SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': article.title,
    'description': article.summary,
    'image': [article.imageUrl],
    'datePublished': article.publishedAt,
    'dateModified': article.updatedAt || article.publishedAt,
    'author': [{
      '@type': 'Person',
      'name': article.author?.name || 'कामगार टाइम्स',
      'jobTitle': article.author?.role || 'संपादकीय मंडळ'
    }],
    'publisher': {
      '@type': 'Organization',
      'name': 'कामगार टाइम्स (Kamgar Times)',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://kamgartimes.com/logo.png'
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Google News Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header
        onSearchOpen={() => setIsSearchOpen(true)}
        selectedCity={selectedCity}
        onCitySelect={setSelectedCity}
        currentLang={currentLang}
        onLangToggle={() => setCurrentLang(prev => prev === 'hi' ? 'en' : 'hi')}
      />

      <main className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
          <Link href="/" className="hover:text-red-600 font-medium">होम</Link>
          <span>/</span>
          <Link href={`/category/${article.category}`} className="hover:text-red-600 font-medium">
            {article.categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-zinc-400 truncate max-w-[200px]">{article.title}</span>
        </div>

        {/* Article Container */}
        <article className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-10 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-6">
          
          {/* Category Tag & Reading Stats */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <span className="bg-red-600 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <HardHat className="w-3.5 h-3.5 text-amber-300" />
              {article.categoryLabel}
            </span>
            <div className="flex items-center gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-red-500" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <Eye className="w-3.5 h-3.5" />
                {article.views.toLocaleString()} पाठक
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-4xl font-extrabold text-zinc-900 dark:text-white font-serif leading-tight">
            {article.title}
          </h1>

          {/* Subheadline / Dek */}
          {article.subheadline && (
            <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed border-l-4 border-red-600 pl-4 bg-zinc-50 dark:bg-zinc-800/40 py-2.5 rounded-r-xl">
              {article.subheadline}
            </p>
          )}

          {/* Author EEAT Card & Date */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <img
                src={article.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={article.author?.name || 'विशेष रिपोर्टर'}
                className="w-12 h-12 rounded-full object-cover border-2 border-red-600"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-sm text-zinc-900 dark:text-white">
                    {article.author?.name || 'विशेष रिपोर्टर'}
                  </h4>
                  <span title="सत्यापित पत्रकार">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {article.author?.role || 'कामगार टाइम्स न्यूज़ डेस्क'}
                </p>
              </div>
            </div>

            <div className="text-xs text-zinc-500 sm:text-right space-y-0.5">
              <p><span className="font-semibold text-zinc-700 dark:text-zinc-300">प्रकाशित:</span> {new Date(article.publishedAt).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              {article.updatedAt && (
                <p className="text-emerald-600 dark:text-emerald-400"><span className="font-semibold">अपडेटेड:</span> 24 सितम्बर 2026, 08:30 AM IST</p>
              )}
            </div>
          </div>

          {/* Social Share Buttons Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 py-2 border-y border-zinc-100 dark:border-zinc-800">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">शेयर करें:</span>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`https://api.whatsapp.com/send?text=${whatsappShareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition shadow-sm"
              >
                <WhatsappIcon className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition"
              >
                <FacebookIcon className="w-4 h-4" />
                <span>Facebook</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-zinc-900 hover:bg-black text-white font-bold text-xs px-3.5 py-2 rounded-xl transition"
              >
                <TwitterIcon className="w-4 h-4" />
                <span>X / Twitter</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs px-3 py-2 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'कॉपी हुआ!' : 'कॉपी लिंक'}</span>
              </button>
            </div>
          </div>

          {/* Text-to-Speech Audio Reader Component */}
          <AudioPlayer textToRead={article.content.join(' ')} title={article.title} />

          {/* Featured Image & Caption */}
          <div className="space-y-2">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-zinc-950/80 text-amber-400 text-[10px] font-black px-2.5 py-1 rounded-md tracking-widest border border-amber-400/30">
                कामगार टाइम्स वाटरमार्क ©
              </div>
            </div>
            {article.imageCaption && (
              <p className="text-xs text-zinc-500 text-center italic">
                {article.imageCaption}
              </p>
            )}
          </div>

          {/* Article Body Content Paragraphs */}
          <div className="prose dark:prose-invert max-w-none space-y-5 text-base sm:text-lg text-zinc-800 dark:text-zinc-200 leading-relaxed font-sans pt-4">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="first-letter:text-4xl first-letter:font-extrabold first-letter:text-red-600 first-letter:mr-2 first-letter:float-left">
                {paragraph}
              </p>
            ))}
          </div>

          {/* In-Article Advertisement */}
          <AdBanner slot="in-article" />

          {/* Reactions & Like Button */}
          <div className="py-6 border-y border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-extrabold text-xs transition shadow-md ${
                  hasLiked ? 'bg-red-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-red-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current text-white' : 'text-rose-500'}`} />
                <span>{initialLikes} पसंद (Likes)</span>
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <span key={tag} className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs px-2.5 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Comments System Section */}
          <section className="space-y-6 pt-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="font-extrabold text-xl text-zinc-900 dark:text-white font-serif">
                पाठकों की प्रतिक्रियाएं (Comments - {comments.length})
              </h3>
              <span className="text-xs text-zinc-500">नियम: मर्यादित भाषा का प्रयोग करें</span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="space-y-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="इस खबर पर अपनी राय लिखें..."
                rows={3}
                className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 text-sm focus:outline-none focus:border-red-600"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition"
              >
                टिप्पणी पोस्ट करें
              </button>
            </form>

            {/* Comment List */}
            <div className="space-y-3 pt-2">
              {comments.map((comment, index) => (
                <div key={index} className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span className="font-bold text-zinc-700 dark:text-zinc-300">पाठक टिप्पणी #{index + 1}</span>
                    <span>आज</span>
                  </div>
                  <p className="text-sm text-zinc-800 dark:text-zinc-200">{comment}</p>
                </div>
              ))}
            </div>
          </section>

        </article>

        {/* Related Articles Grid */}
        <section className="mt-12 space-y-6">
          <h3 className="font-extrabold text-2xl text-zinc-900 dark:text-white font-serif border-l-4 border-red-600 pl-3">
            संबंधित अन्य प्रमुख खबरें
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <article key={rel.id} className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
                <img
                  src={rel.imageUrl}
                  alt={rel.title}
                  className="w-full h-36 object-cover rounded-xl"
                />
                <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase">
                  {rel.categoryLabel}
                </span>
                <Link href={`/news/${rel.id}`}>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 hover:text-red-600 line-clamp-2">
                    {rel.title}
                  </h4>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <WhatsAppBanner />
      </main>

      <Footer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
