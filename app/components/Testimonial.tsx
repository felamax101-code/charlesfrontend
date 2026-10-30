import Container from "./Container";
import Photo from "./Photo";
import type { Testimonial } from "../lib/types";
export default function Testimonials({ items, title = "What our customers say" }: { items: Testimonial[]; title?: string }) {
  if (!items.length) return null;
  return (
    <section className="py-12">
      <Container>
        <h2 className="font-display text-2xl font-bold">{title}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <figure key={t.id} className="flex flex-col rounded-2xl border border-border bg-surface p-5">
              <blockquote className="flex-1 text-sm leading-relaxed text-text-secondary">“{t.message}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-primary-light">
                  {t.photo_url
                    ? <Photo src={t.photo_url} alt={t.customer_name} sizes="40px" />
                    : <span className="grid h-full place-items-center font-semibold text-primary">{t.customer_name[0]}</span>}
                </div>
                <span className="text-sm font-semibold">{t.customer_name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}