export type SectionId = "home" | "about" | "expertise" | "work" | "blog" | "contact";

export interface NavItem {
  id: SectionId;
  label: string;
  number: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", number: "00" },
  { id: "about", label: "About", number: "01" },
  { id: "expertise", label: "Expertise", number: "02" },
  { id: "work", label: "Work", number: "03" },
  { id: "blog", label: "Blog", number: "04" },
  { id: "contact", label: "Contact", number: "05" },
];

export const SITE_METADATA = {
  title: "Walid Khalladi — Senior Software Engineer",
  description:
    "Senior Software Engineer specializing in mobile development (Android/iOS, Kotlin Multiplatform) and AI/Computer Vision systems. Based in Munich, Germany.",
  url: "https://walidkhalladi.com",
  author: "Walid Khalladi",
};
