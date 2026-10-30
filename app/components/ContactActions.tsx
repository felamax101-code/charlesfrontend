import { Mail, MessageCircle, Phone } from "lucide-react";
import { mailHref,telHref,waHref,inquiryText } from "../lib/contact";
export default function ContactActions({ vehicle }: { vehicle?: { name: string; slug: string } }) {
  const text = inquiryText(vehicle);
  const subject = vehicle ? `Inquiry: ${vehicle.name}` : "Inquiry";
  const base = "flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-3 text-sm font-semibold sm:flex-row sm:gap-2";

  return (
    <div className="grid grid-cols-3 gap-2">
      <a href={telHref()} className={`${base} bg-primary text-white hover:bg-primary-dark`}>
        <Phone size={18} /> Call
      </a>
      <a href={waHref(text)} target="_blank" rel="noopener noreferrer"
        className={`${base} bg-success text-white hover:opacity-90`}>
        <MessageCircle size={18} /> WhatsApp
      </a>
      <a href={mailHref(subject, text)} className={`${base} border border-border bg-surface hover:border-primary`}>
        <Mail size={18} /> Email
      </a>
    </div>
  );
}