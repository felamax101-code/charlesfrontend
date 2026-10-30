export const site = {
  name: process.env.NEXT_PUBLIC_DEALER_NAME ?? "Isuzu Dealer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  api: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "",
  address: process.env.NEXT_PUBLIC_ADDRESS ?? "",
  hours: process.env.NEXT_PUBLIC_HOURS ?? "",
  currency: process.env.NEXT_PUBLIC_CURRENCY ?? "KES",
};