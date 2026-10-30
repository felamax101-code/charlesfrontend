import { site } from "./site";
import type { Vehicle, VehicleDetail, Testimonial, InquiryPayload } from "./types";
type ListResult<T> = { items: T[]; failed: boolean };
async function getList<T>(path: string, revalidate = 60): Promise<ListResult<T>> {
  try {
    const res = await fetch(`${site.api}${path}`, { next: { revalidate } });
    if (!res.ok) return { items: [], failed: true };
    const data: unknown = await res.json();
    return Array.isArray(data)
      ? { items: data as T[], failed: false }
      : { items: [], failed: true };
  } catch {
    return { items: [], failed: true };
  }
}
async function get<T>(path: string, revalidate = 60): Promise<T | null> {
  try {
    const res = await fetch(`${site.api}${path}`, { next: { revalidate } });
    return res.ok ? ((await res.json()) as T) : "error" as T;
  } catch {
    return null;
  }
}

export async function getVehicles(params: Record<string, string | undefined> = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => v && qs.set(k, v));
  return getList<Vehicle>(`/vehicles?${qs}`);
}
export const getVehicle = (slug: string) => get<VehicleDetail>(`/vehicles/${slug}`);
export const getSold = () => getList<Vehicle>("/vehicles/sold?limit=48");
export const getTestimonials = () => getList<Testimonial>("/testimonials");
export async function submitInquiry(
  payload: InquiryPayload
): Promise<{ ok: true } | { ok: false; reason: "rate" | "invalid" | "error" }> {
  try {
    const res = await fetch(`${site.api}/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { ok: true };
    if (res.status === 429) return { ok: false, reason: "rate" };
    if (res.status === 422) return { ok: false, reason: "invalid" };
    return { ok: false, reason: "error" };
  } catch {
    return { ok: false, reason: "error" };
  }
}