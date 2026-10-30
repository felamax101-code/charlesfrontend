import { formatPrice } from "../lib/format";
import type { Vehicle } from "../lib/types";
export default function Price({ v, className = "" }: { v: Vehicle; className?: string }) {
  if (v.status === "sold") return <span className={`font-semibold text-text-muted ${className}`}>Sold</span>;
  if (v.price_on_request || !v.public_price)
    return <span className={`font-semibold text-primary ${className}`}>Price on request</span>;
  return <span className={`font-display font-bold ${className}`}>{formatPrice(v.public_price)}</span>;
}