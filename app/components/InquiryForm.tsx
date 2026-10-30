"use client";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitInquiry } from "../lib/api";
import { InquiryPayload } from "../lib/types";
const field =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none";

type Props = { vehicleId?: number; vehicleName?: string; kind?: InquiryPayload["kind"] };

export default function InquiryForm({ vehicleId, vehicleName, kind }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "rate" | "invalid" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    const res = await submitInquiry({
      vehicle_id: vehicleId ?? null,
      kind: kind ?? (vehicleId ? "price_request" : "general"),
      name: String(f.get("name")).trim(),
      email: String(f.get("email")).trim(),
      phone: String(f.get("phone")).trim(),
      message: String(f.get("message") || "").trim() || null,
      website: String(f.get("website") || ""),
    });
    setState(res.ok ? "done" : res.reason);
  }

  if (state === "done")
    return (
      <div className="rounded-2xl border border-border bg-success-light p-6 text-center">
        <CheckCircle2 className="mx-auto text-success" size={36} />
        <p className="mt-3 font-display text-lg font-semibold">Thank you!</p>
        <p className="mt-1 text-sm text-text-secondary">We received your request and will reach you shortly on the number you gave.</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div>
        <h3 className="font-display text-xl font-semibold">
          {vehicleName ? `Get the price for the ${vehicleName}` : "Send us a message"}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">No account needed. We reply the same day.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">Full name
          <input name="name" required minLength={2} maxLength={120} autoComplete="name" className={`${field} mt-1`} />
        </label>
        <label className="block text-sm font-medium">Phone number
          <input name="phone" type="tel" inputMode="tel" required autoComplete="tel"
            pattern="^\+?[0-9\s\-]{7,20}$" title="e.g. 0712 345 678" className={`${field} mt-1`} />
        </label>
      </div>

      <label className="block text-sm font-medium">Email
        <input name="email" type="email" required autoComplete="email" className={`${field} mt-1`} />
      </label>

      <label className="block text-sm font-medium">Message <span className="font-normal text-text-muted">(optional)</span>
        <textarea name="message" rows={3} maxLength={2000} className={`${field} mt-1`}
          placeholder="e.g. Cash or hire purchase? Delivery or pickup?" />
      </label>

      {/* honeypot: hidden from real users */}
      <div aria-hidden className="absolute -left-[9999px]">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state === "rate" && <p className="rounded-lg bg-warning-light p-3 text-sm text-warning">Too many requests from your connection. Please call or WhatsApp us instead.</p>}
      {state === "invalid" && <p className="rounded-lg bg-error-light p-3 text-sm text-error">Please check your name, phone number and email.</p>}
      {state === "error" && <p className="rounded-lg bg-error-light p-3 text-sm text-error">Something went wrong. Please try again or call us.</p>}

      <button disabled={state === "sending"}
        className="w-full rounded-xl bg-primary px-5 py-3 text-base font-semibold text-white hover:bg-primary-dark disabled:opacity-60">
        {state === "sending" ? "Sending..." : vehicleName ? "Request price" : "Send message"}
      </button>
    </form>
  );
}