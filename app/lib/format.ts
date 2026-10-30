import { site } from "./site";

export function formatPrice(value: string | number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency", currency: site.currency, maximumFractionDigits: 0,
  }).format(Number(value));
}