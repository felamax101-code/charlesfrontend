import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, MessageCircle, Phone, FileText } from "lucide-react";
import Container from "@/app/components/Container";
import Gallery from "@/app/components/Gallery";
import Price from "@/app/components/Price";
import ContactActions from "@/app/components/ContactActions";
import InquiryForm from "@/app/components/InquiryForm";
import { getVehicle } from "@/app/lib/api";
import { inquiryText, telHref, vehicleUrl, waHref } from "@/app/lib/contact";

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const v = await getVehicle(slug);
  if (!v) return {};
  const description = v.description ?? `Brand new ${v.name}. Request the price today.`;
  const img = v.images[0]?.url;
  return {
    title: v.name,
    description,
    openGraph: { title: v.name, description, url: vehicleUrl(v.slug), images: img ? [img] : [] }, // WhatsApp link preview
  };
}

export default async function VehiclePage({ params }: P) {
  const { slug } = await params;
  const v = await getVehicle(slug);
  if (!v) notFound();

  const sold = v.status === "sold";
  const specs = Object.entries(v.specs ?? {}).filter(([, val]) => val);
  return (
    <>
      <Container className="py-6 pb-28 md:pb-10">
        <Link href="/vehicles" className="text-sm font-medium text-text-secondary hover:text-primary">← All vehicles</Link>

        <div className="mt-4 grid gap-8 lg:grid-cols-2">
          <Gallery images={v.images} alt={v.name} />

          <div className="space-y-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{v.series}</p>
              <h1 className="font-display text-3xl font-bold">{v.name}</h1>
              <div className="mt-3 text-2xl"><Price v={v} /></div>
              {!sold && <p className="mt-1 text-sm text-text-secondary">Brand new. Cash or hire purchase.</p>}
            </div>

            {sold ? (
              <div className="rounded-2xl border border-border bg-surface-2 p-4 text-sm">
                This unit has been sold. Interested in a similar one? Contact us below.
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-surface p-4">
                <p className="mb-3 text-sm font-semibold">Contact us the way you prefer</p>
                <ContactActions vehicle={{ name: v.name, slug: v.slug }} />
              </div>
            )}

            {specs.length > 0 && (
              <dl className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface text-sm">
                {specs.map(([k, val]) => (
                  <div key={k} className="flex justify-between gap-4 px-4 py-3">
                    <dt className="capitalize text-text-secondary">{k.replace(/_/g, " ")}</dt>
                    <dd className="text-right font-medium">{val}</dd>
                  </div>
                ))}
              </dl>
            )}

            {v.brochure_url && (
              <a href={v.brochure_url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                <Download size={16} /> <FileText size={16} /> Download brochure (PDF)
              </a>
            )}
          </div>
        </div>

        {v.description && (
          <section className="mt-10 max-w-3xl">
            <h2 className="font-display text-xl font-semibold">About this vehicle</h2>
            <p className="mt-2 whitespace-pre-line leading-relaxed text-text-secondary">{v.description}</p>
          </section>
        )}

        <section id="inquire" className="mt-10 max-w-2xl scroll-mt-24">
          <InquiryForm vehicleId={v.id} vehicleName={sold ? undefined : v.name} kind={sold ? "general" : "price_request"} />
        </section>
      </Container>

      {/* Mobile sticky action bar */}
      {!sold && (
        <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 gap-2 border-t border-border bg-surface p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
          <a href={telHref()} className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white">
            <Phone size={16} /> Call
          </a>
          <a href={waHref(inquiryText({ name: v.name, slug: v.slug }))} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-success py-3 text-sm font-semibold text-white">
            <MessageCircle size={16} /> Chat
          </a>
          <a href="#inquire" className="flex items-center justify-center rounded-xl border border-border py-3 text-sm font-semibold">
            Get price
          </a>
        </div>
      )}
    </>
  );
}