import { IconType } from "react-icons";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

type Link = {
  icon?: IconType;
  name: string;
  href: string;
};

const headerLinks: Link[] = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
];

const footerLinks: Link[] = [
  { name: "Pricing", href: "/pricing" },
  { name: "About Us", href: "/about-us" },
  { name: "Features", href: "/features" },
  { name: "Help Center", href: "/help-center" },
  { name: "Contact Us", href: "/contact-us" },
  { name: "FAQs", href: "/faqs" },
  { name: "Careers", href: "/careers" },
];

const iconsLinks: Link[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ahmad-mayallo/",
    icon: FaLinkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com/Ahmad-Mayallo-2002",
    icon: FaGithub,
  },
  { name: "X (Twitter)", href: "https://twitter.com", icon: FaXTwitter },
];

const mainEndPoint: string = "http://localhost:3000/";

export { headerLinks, footerLinks, iconsLinks, mainEndPoint };
