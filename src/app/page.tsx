import { BackToTop } from "@/components/layout/BackToTop";
import { BreakingTicker } from "@/components/layout/BreakingTicker";
import { MainNav } from "@/components/layout/MainNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { TopBar } from "@/components/layout/TopBar";
import { EditorsPicks } from "@/components/sections/EditorsPicks";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { LatestTrending } from "@/components/sections/LatestTrending";
import { LeadGrid } from "@/components/sections/LeadGrid";
import { PoliticsSection } from "@/components/sections/PoliticsSection";
import { TopicColumns } from "@/components/sections/TopicColumns";
import { VideoSection } from "@/components/sections/VideoSection";
import { AdSlot } from "@/components/ui/AdSlot";
import { HeroCarousel } from "@/components/ui/HeroCarousel";
import { leaderboardAds } from "@/data/ads";
import styles from "./globals.module.css";

/**
 * Section order mirrors the reference design exactly:
 * hero billboard, lead grid, latest/trending, politics, leaderboard,
 * economy+sport, leaderboard, entertainment+tech, health+education,
 * features, editor's picks, leaderboard, video, gallery, leaderboard.
 *
 * .main owns the 48px between blocks. Each section owns its own 24px
 * internal rhythm, so there are deliberately no wrapper divs here.
 */
export default function Home() {
  return (
    <>
      <header id="top">
        <TopBar />
        <MainNav />
        <BreakingTicker />
      </header>

      <main id="main" className={styles.main}>
        <HeroCarousel />

        <LeadGrid />

        <LatestTrending />

        <PoliticsSection />

        <AdSlot ad={leaderboardAds[0]} />

        <TopicColumns />

        <AdSlot ad={leaderboardAds[1]} />

        <FeaturesSection />

        <EditorsPicks />

        <AdSlot ad={leaderboardAds[2]} />

        <VideoSection />

        <GallerySection />

        <AdSlot ad={leaderboardAds[3]} />
      </main>

      <SiteFooter />
      <BackToTop />
    </>
  );
}
