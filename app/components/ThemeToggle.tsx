"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
    setDark(next);
  }
  return (
    <button onClick={toggle} aria-label="Toggle dark mode"
      className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface text-text-secondary hover:text-text-primary">
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}