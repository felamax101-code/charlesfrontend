import Link from "next/link";
import { Search } from "lucide-react";
import Container from "../components/Container";
import VehicleCard from "../components/VehicleCard";
import ContactActions from "../components/ContactActions";
import { categories } from "../lib/categories";
import { getVehicles } from "../lib/api";
import { Suspense } from "react";

export const metadata = { title: "Vehicles" };
export default function Vehicles({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }) {
  return (
    <Container className="py-8">
      <h1 className="font-display text-3xl font-bold">Our vehicles</h1>
      <Suspense fallback={<p className="mt-6 text-text-muted">Loading vehicles...</p>}>
        <Results searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}
async function Results({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }) {
  const { category, q } = await searchParams;
  const cat = categories.find((c) => c.key === category)?.key;
const { items: vehicles, failed } = await getVehicles({ category: cat, q, limit: "48" });

  const tab = (active: boolean) =>
    `shrink-0 rounded-full border px-2 py-1 text-sm font-medium ${
      active ? "border-primary bg-primary text-white" : "border-border bg-surface text-text-secondary hover:border-primary"
    }`;

  return (
    <>
      <h1 className="font-display text-3xl font-bold">Our vehicles</h1>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sticky top-15 z-50">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          <Link href="/vehicles" className={tab(!cat)}>All</Link>
          {failed && (
  <p className="rounded-xl bg-warning-light p-4 text-sm text-warning">
    We couldn't load vehicles right now. Please call or WhatsApp us.
  </p>
)}
          {categories.map((c) => (
            <Link key={c.key} href={`/vehicles?category=${c.key}`} className={tab(cat === c.key)}>{c.label}</Link>
          ))}
        </div>
        <form action="/vehicles" className="relative sm:w-64">
          {cat && <input type="hidden" name="category" value={cat} />}
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input name="q" defaultValue={q} placeholder="Search e.g. NMR"
            className="w-full rounded-xl border border-border bg-surface py-3 pl-10 pr-4 text-base focus:border-primary focus:outline-none" />
        </form>
      </div>

      {vehicles.length ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((v) => <VehicleCard key={v.id} v={v} />)}
        </div>
      ) : !vehicles.length && !failed?(

       
        <div className="mt-10 rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="font-display text-lg font-semibold">No vehicles match your search</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-text-secondary">Tell us what you need and we will help you find it.</p>
          <div className="mx-auto mt-5 max-w-sm"><ContactActions /></div>
        </div>
      ):
    <>
    </>
    }
    </>
  );
}