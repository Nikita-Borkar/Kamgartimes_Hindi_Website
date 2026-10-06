import type { AdSlot } from "./types";

/** Every ad on the page. `variant` maps to a height in AdSlot's CSS module. */
export type AdVariant = "leaderboard" | "rail" | "billboard" | "tower";

export type Ad = AdSlot & { variant: AdVariant };

const creative = "/img/img00.svg";

export const heroAds: Ad[] = [
  {
    id: "hero-1",
    label: "जाहिरात",
    headline: "दिवाळी महोत्सव · खरेदीवर ५०% पर्यंत सूट",
    image: creative,
    href: "#",
    variant: "billboard",
  },
  {
    id: "hero-2",
    label: "जाहिरात",
    headline: "नवीन आरोग्य विमा योजना · जागतिक दर्जाची कवच",
    image: creative,
    href: "#",
    variant: "billboard",
  },
  {
    id: "hero-3",
    label: "जाहिरात",
    headline: "रविवाराची विशेष पाठ · शाळा महाविद्यालयांसाठी",
    image: creative,
    href: "#",
    variant: "billboard",
  },
  {
    id: "hero-4",
    label: "जाहिरात",
    headline: "सणासुदीच्या नवीन संग्रहातून निवडा",
    image: creative,
    href: "#",
    variant: "billboard",
  },
];

export const railAd: Ad = {
  id: "rail-1",
  label: "जाहिरात",
  image: creative,
  href: "#",
  variant: "rail",
};

export const leaderboardAds: Ad[] = [
  { id: "lb-1", label: "जाहिरात", image: creative, href: "#", variant: "leaderboard" },
  { id: "lb-2", label: "जाहिरात", image: creative, href: "#", variant: "leaderboard" },
  { id: "lb-3", label: "जाहिरात", image: creative, href: "#", variant: "leaderboard" },
  { id: "lb-4", label: "जाहिरात", image: creative, href: "#", variant: "leaderboard" },
  { id: "lb-5", label: "जाहिरात", image: creative, href: "#", variant: "leaderboard" },
];

/** Tall slot in the lead grid, level with the 420px hero story. */
export const leadRailAd: Ad = {
  id: "lead-rail-1",
  label: "जाहिरात",
  image: creative,
  href: "#",
  variant: "tower",
};

export const towerAd: Ad = {
  id: "tower-1",
  label: "जाहिरात",
  image: creative,
  href: "#",
  variant: "tower",
};
