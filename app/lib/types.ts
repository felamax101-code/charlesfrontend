export type Category = "pickup" | "truck" | "bus";
export type Status = "available" | "on_order" | "sold";
export interface Img { url: string; position: number }

export interface Vehicle {
  id: number; slug: string; name: string; series: string | null;
  category: Category; status: Status;
  public_price: string | null; price_on_request: boolean; images: Img[];
}
export interface VehicleDetail extends Vehicle {
  description: string | null; specs: Record<string, string>;
  brochure_url: string | null; sold_at: string | null;
}
export interface Testimonial {
  id: number; customer_name: string; message: string;
  photo_url: string | null; vehicle_id: number | null;
}
export interface InquiryPayload {
  vehicle_id: number | null; kind: "price_request" | "test_drive" | "general";
  name: string; email: string; phone: string; message: string | null; website: string;
}