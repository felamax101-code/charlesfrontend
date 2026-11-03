"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const defaultSlides = [
    { src: "/hero/InShot_20261103_100729868.jpg", alt: "Brand new Isuzu D-Max automatic pickup" },
    { src: "/hero/InShot_20261103_101005991.jpg", alt: "Isuzu N-Series truck" },
    { src: "/hero/InShot_20261103_101102841.jpg", alt: "Brand new Isuzu D-Max manual pickup" },
    { src: "/hero/InShot_20261103_101134208.jpg", alt: "Brand new Isuzu D-Max manual single cab pickup" },
    { src: "/hero/InShot_20261103_101208060.jpg", alt: "frr90" },
    { src: "/hero/InShot_20261103_101237436.jpg", alt: "fseriesbus" },
    { src: "/hero/InShot_20261103_101308228.jpg", alt: "fseriesbus2" },
    { src: "/hero/InShot_20261103_101352535.jpg", alt: "mux" },
    { src: "/hero/FRR90-11-tonnes-truck.jpg", alt: "nseriesbus" },
    { src: "/hero/tipper.png", alt: "tipper" },
];
type Slide = { src: string; alt: string };
export default function HeroSlideshow({
    slides = defaultSlides,
    interval = 5000,
}: {
    slides?: Slide[];
    interval?: number;
}) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused || slides.length < 2) return;
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % slides.length);
        }, interval);
        return () => clearInterval(id);
    }, [paused, interval, slides.length]);

    return (
        <section
            className="relative sm:w-full md:max-w-lg md:mx-auto overflow-hidden bg-primary-light"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-roledescription="carousel"
            aria-label="Featured Isuzu vehicles"
        >
            <div className="relative aspect-[16/9] max-h-[560px] w-full sm:aspect-[21/9]">
                {slides.map((s, i) => (
                    <Image
                        key={s.src}
                        src={s.src}
                        alt={s.alt}
                        fill
                        sizes="100vw"
                        priority={i === 0}
                        aria-hidden={i !== index}
                        className={`object-cover transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${i === index ? "opacity-100" : "opacity-0"
                            }`}
                    />
                ))}

                {/* subtle bottom shade so the dots stay visible on any photo */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

                {slides.length > 1 && (
                    <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                        {slides.map((s, i) => (
                            <button
                                key={s.src}
                                type="button"
                                onClick={() => setIndex(i)}
                                aria-label={`Show slide ${i + 1}`}
                                aria-current={i === index}
                                className={`h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-white" : "w-2.5 bg-white/60 hover:bg-white"
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}