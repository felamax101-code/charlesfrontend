import Container from "@/app/components/Container";
import VehicleCard from "@/app/components/VehicleCard";
import { getSold, getTestimonials } from "@/app/lib/api";
import Testimonials from "../components/Testimonial";
export const metadata = { title: "Sold vehicles & customer reviews" };

export default async function SoldPage() {
  const [ testimonials] = await Promise.all([ getTestimonials()]);
  const { items: sold } = await getSold();
  return (
    <>
      <Container className="py-8">
        <h1 className="font-display text-3xl font-bold">Recently sold</h1>
        <p className="mt-2 text-text-secondary">Real units delivered to real customers.</p>
        {sold.length ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sold.map((v) => <VehicleCard key={v.id} v={v} />)}
          </div>
        ) : (
          <p className="mt-6 text-text-muted">Sold vehicles will appear here.</p>
        )}
      </Container>
      <Testimonials items={testimonials.items} />
    </>
  );
}