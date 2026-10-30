import Container from "@/app/components/Container";
import ContactActions from "@/app/components/ContactActions";
import InquiryForm from "@/app/components/InquiryForm";
import { site } from "@/app/lib/site";

export const metadata = { title: "Contact us" };

export default function Contact() {
  return (
    <Container className="py-8">
      <h1 className="font-display text-3xl font-bold">Contact us</h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="mb-3 text-sm font-semibold">Reach us the way you prefer</p>
            <ContactActions />
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5 text-sm">
            <p className="font-semibold">Visit us</p>
            <p className="mt-1 text-text-secondary">{site.address}</p>
            <p className="text-text-secondary">{site.hours}</p>
          </div>
        </div>
        <InquiryForm kind="general" />
      </div>
    </Container>
  );
}