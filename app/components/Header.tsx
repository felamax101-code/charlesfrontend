"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { site } from "@/app/lib/site";
import { telHref } from "@/app/lib/contact";

const links = [
  { href: "/vehicles", label: "Vehicles" },
  { href: "/sold", label: "Sold & reviews" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const cls = (href: string) =>
    `rounded-lg px-3 py-2 text-sm font-medium ${
      path.startsWith(href) ? "bg-primary-light text-primary" : "text-text-secondary hover:text-text-primary"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-display text-lg font-bold text-primary">{site.name}</Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => <Link key={l.href} href={l.href} className={cls(l.href)}>{l.label}</Link>)}
        </nav>

        <div className="flex items-center gap-2">
          {/* <a href={telHref()}
            className="hidden items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark sm:inline-flex">
            <Phone size={16} /> Call us
          </a> */}
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface md:hidden">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border bg-surface p-3 md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={`${cls(l.href)} py-3 text-base`}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}