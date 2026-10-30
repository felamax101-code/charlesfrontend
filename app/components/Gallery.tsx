"use client";
import { useState } from "react";
import Photo from "./Photo";
import type { Img } from "../lib/types";
export default function Gallery({ images, alt }: { images: Img[]; alt: string }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface-2">
        <Photo src={images[i]?.url} alt={alt} priority sizes="(min-width:1024px) 560px, 100vw" />
      </div>
      {images.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {images.map((im, idx) => (
            <button key={im.url} onClick={() => setI(idx)} aria-label={`Show photo ${idx + 1}`}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 ${idx === i ? "border-primary" : "border-transparent opacity-70"}`}>
              <Photo src={im.url} alt="" sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}