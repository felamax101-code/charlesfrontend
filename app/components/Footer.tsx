import Link from "next/link";
import Container from "./Container";
import { site } from "../lib/site";
import Year from "./Year";
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <Container className="grid gap-8 py-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold text-primary">{site.name}</p>
          <p className="mt-2 text-sm text-text-secondary">Brand new Isuzu pickups, trucks and buses.</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Explore</p>
          <ul className="mt-2 space-y-1 text-text-secondary">
            <li><Link href="/vehicles" className="hover:text-primary">Vehicles</Link></li>
            <li><Link href="/sold" className="hover:text-primary">Sold & reviews</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div className="text-sm text-text-secondary">
          <p className="font-semibold text-text-primary">Visit us</p>
          <p className="mt-2">{site.address}</p>
          <p>{site.hours}</p>
        </div>
      </Container>
      <p className="border-t border-border py-4 text-center text-xs text-text-muted">
  © <Year /> {site.name}
</p>
    </footer>
  );
}