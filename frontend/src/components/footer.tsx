"use client";

import { Link } from "react-router-dom";

const links = [
  {
    title: "Features",
    href: "#",
  },
  {
    title: "Solution",
    href: "#",
  },
  {
    title: "Brands",
    href: "#",
  },
  {
    title: "Pricing",
    href: "#",
  },
  {
    title: "Design",
    href: "#",
  },
  {
    title: "AI",
    href: "#",
  },
];

export function Footer() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <footer className="w-full border-y py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-wrap justify-between gap-6">
            <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
              © {2026} Ali Imam, All rights reserved
            </span>
            <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
              {links.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="text-muted-foreground hover:text-primary block duration-150"
                >
                  <span>{link.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
