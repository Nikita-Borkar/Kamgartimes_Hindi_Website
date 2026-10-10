import type { AuthPageData } from "./types";

/* ---------------------------------------------------------------------------
   Account surfaces. No auth backend is wired yet, so these pages render the
   real forms with an honest "sample" success state, ready for an API to be
   dropped in later.
   ------------------------------------------------------------------------- */

export const loginPage: AuthPageData = {
  slug: "login",
  eyebrow: "खाते",
  title: "लॉग इन",
  lede: "कामगार टाइम्सवरील आपल्या खात्यात लॉग इन करा — जतन केलेल्या बातम्या, सूचना आणि जाहिरात अर्ज एकाच ठिकाणी.",
};

export const registerPage: AuthPageData = {
  slug: "register",
  eyebrow: "खाते",
  title: "नोंदणी करा",
  lede: "विनामूल्य खाते तयार करा आणि वैयक्तिकृत बातम्या, सूचना व जाहिरात सुविधा मिळवा.",
};
