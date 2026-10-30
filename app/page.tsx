import Link from "next/link";
import Testimonials from "./components/Testimonial";
import Container from "./components/Container";
import VehicleCard from "./components/VehicleCard";
import ContactActions from "./components/ContactActions";
import { categories } from "./lib/categories";
import { getTestimonials,getVehicles } from "./lib/api";
const steps = [
  ["Choose", "Browse our brand new Isuzu range."],
  ["Get your price", "Call, WhatsApp, email or send the form."],
  ["Pay your way", "Cash, or hire purchase with a deposit."],
  ["Collect or delivery", "After full payment, pick it up or we deliver to your door."],
];

export default async function Home() {
  const [vehicles, testimonials] = await Promise.all([getVehicles({ limit: "6" }), getTestimonials()]);

  return (
    <>
      <section className="border-b border-border bg-primary-light">
        <Container className="py-12 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">100% brand new Isuzu</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            Pickups, trucks and buses that mean business.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-text-secondary">
            D-Max, N-Series and F-Series. Pay cash or hire purchase, then collect or have it delivered.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/vehicles" className="rounded-xl bg-primary px-6 py-3 text-center font-semibold text-white hover:bg-primary-dark">
              Browse vehicles
            </Link>
            <div className="sm:w-80"><ContactActions /></div>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <h2 className="font-display text-2xl font-bold">Shop by type</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {categories.map((c) => (
              <Link key={c.key} href={`/vehicles?category=${c.key}`}
                className="rounded-2xl border border-border bg-surface p-6 hover:border-primary">
                <p className="font-display text-xl font-semibold">{c.label}</p>
                <p className="mt-1 text-sm text-text-secondary">{c.desc}</p>
                <p className="mt-4 text-sm font-semibold text-primary">View all →</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {vehicles.length > 0 && (
        <section className="pb-12">
          <Container>
            <div className="flex items-end justify-between">
              <h2 className="font-display text-2xl font-bold">Available now</h2>
              <Link href="/vehicles" className="text-sm font-semibold text-primary">See all</Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((v) => <VehicleCard key={v.id} v={v} />)}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-surface py-12">
        <Container>
          <h2 className="font-display text-2xl font-bold">How buying works</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([t, d], i) => (
              <li key={t} className="rounded-2xl border border-border bg-bg p-5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-sm font-bold text-white">{i + 1}</span>
                <p className="mt-3 font-semibold">{t}</p>
                <p className="mt-1 text-sm text-text-secondary">{d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Testimonials items={testimonials.slice(0, 3)} />
    </>
  );
}