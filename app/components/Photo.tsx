import Image from "next/image";
import { Truck } from "lucide-react";

export default function Photo({ src, alt, sizes, priority }: {
  src?: string | null; alt: string; sizes: string; priority?: boolean;
}) {
        console.log("ggggg",src)

  if (!src)

    return <div className="grid h-full w-full place-items-center bg-surface-2 text-text-muted"><Truck size={40} /></div>;
  return (
    <Image src={src} alt={alt} fill sizes={sizes} priority={priority}
      unoptimized={process.env.NODE_ENV !== "production"} className="object-cover" />
  );
}