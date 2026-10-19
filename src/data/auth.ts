import type { AuthPageData } from "./types";

/* ---------------------------------------------------------------------------
   Account surfaces. No auth backend is wired yet, so these pages render the
   real forms with an honest "sample" success state, ready for an API to be
   dropped in later.
   ------------------------------------------------------------------------- */

export const loginPage: AuthPageData = {
  slug: "login",
  eyebrow: "उपयोगकर्ता खाता",
  title: "लॉग इन करें",
  lede: "कामगार टाइम्स पर अपने खाते में लॉग इन करें — सहेजे गए समाचार, नोटिफिकेशन और विज्ञापन आवेदन एक ही स्थान पर.",
};

export const registerPage: AuthPageData = {
  slug: "register",
  eyebrow: "उपयोगकर्ता खाता",
  title: "पंजीकरण करें",
  lede: "निःशुल्क खाता बनाएं और पर्सनलाइज़्ड समाचार, दैनिक सूचनाएं व विज्ञापन सुविधाएं प्राप्त करें.",
};
