import Link from "next/link";
import Photo from "./Photo";
import Price from "./Price";
import type { Vehicle } from "../lib/types";
export default function VehicleCard({ v }: { v: Vehicle }) {
  const badge =
    v.status === "sold" ? { t: "Sold", c: "bg-text-primary text-bg" }
    : v.status === "on_order" ? { t: "On order", c: "bg-warning-light text-warning" }
    : { t: "Brand new", c: "bg-primary-light text-primary" };
    console.log("vvvvv",v.images)
  return (
    <Link href={`/vehicles/${v.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition hover:border-primary hover:shadow-md">
      <div className="relative aspect-[4/3] bg-surface-2">
        <Photo src={v.images[0]?.url} alt={v.name} sizes="(min-width:1024px) 360px, (min-width:640px) 50vw, 100vw" />
        <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${badge.c}`}>{badge.t}</span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{v.series}</p>
        <h3 className="font-display text-lg font-semibold group-hover:text-primary">{v.name}</h3>
        <div className="mt-auto flex items-center justify-between pt-3">
          <Price v={v} />
          <span className="text-sm font-semibold text-primary">View car details →</span>
        </div>
      </div>
    </Link>
  );
}