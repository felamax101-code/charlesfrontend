import { site } from "./site";

export const vehicleUrl = (slug: string) => `${site.url}/vehicles/${slug}`;

export function inquiryText(v?: { name: string; slug: string }) {
  return v
    ? `Hello ${site.name}, I'm interested in the ${v.name}. Please share the price and availability.\n${vehicleUrl(v.slug)}`
    : `Hello ${site.name}, I'd like to make an inquiry.`;
}

export const telHref = () => `tel:+${site.phone}`;
export const waHref = (text: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
export const mailHref = (subject: string, body: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;