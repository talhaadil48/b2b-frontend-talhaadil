"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/ScreenProvider";

interface SectionProps {
  subtitle?: string;
  title?: string;
  highlight?: string;
  description?: string;
  steps?: string[];
  footerHeadline?: string;
  footerDescription?: string;
  mainImage?: string;
  smallImage?: string;
}

export default function DiagonalSection({
  subtitle = "WELCOME TO B2B CONNECT USA",
  title = "Empowering Kashmiri Artisans, Startups in Accessing American",
  highlight = "Markets",
  description = "At De Koshur Crafts, our mission transcends the typical e-commerce experience. We believe that authentic Kashmiri craftsmanship deserves global respect, recognition, and reach. Our platform empowers artisans, preserves heritage crafts, and connects them to international markets through sustainable, fair trade practices and innovation.",
  steps = [
    "Honor It: Celebrate Kashmir’s artistry by uplifting Pashmina, Kani weaving, and Papier Mâché through global recognition and fair trade.",
    "Preserve It: Protect centuries‑old craftsmanship with sustainable methods, cultural safeguarding, and technology‑backed authenticity.",
    "Empower It: Equip artisans with training, tools, and direct markets so they grow businesses and earn fair compensation.",
    "Share It: Carry each artisan’s story worldwide using digital platforms, transparent sourcing, and innovative outreach.",
  ],
  footerHeadline = "Crafting a Borderless Platform Rooted in Legacy",
  footerDescription = "Empowering Artisans | Preserving Culture | Advancing Ethical Innovation",
  mainImage = "/images/new-pic6.webp",
  smallImage = "/images/new-pic4.webp",
}: SectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { is4K } = useGlobalContext();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <section className="relative bg-white text-gray-900 overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(#e5e5e5 1px, transparent 1px)`,
          backgroundSize: `20px 20px`,
        }}
      />

      <div
        className={`relative z-10 flex flex-col lg:flex-row items-center justify-center ${is4K ? "px-24 py-24" : "px-6 py-12 lg:px-12"}`}
      >
        <div className="w-full lg:w-1/2 flex justify-center mb-12 lg:mb-0">
          <Image
            src='/images/image222.webp'
            alt="Main visual"
            width={600}
            height={700}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-cover rounded-xl shadow-lg"
          />
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start mb-4">
            <div className="w-12 h-0.5 bg-[var(--primary-color)] mr-3"></div>
            <p className="text-sm font-semibold uppercase text-gray-600">
              {subtitle}
              <span className="text-[var(--secondary-color)] ml-2">Mission</span>
            </p>
          </div>

          <h1 className={`${is4K ? "text-6xl leading-[1.2]" : "text-3xl sm:text-4xl md:text-5xl"} font-bold mb-6`}>
            {title} <br className="hidden md:block" />
            <span className="text-[var(--secondary-color)]">{highlight}</span>
          </h1>

          <p className={`${is4K ? "text-xl" : "text-base sm:text-lg"} text-gray-700 leading-relaxed mb-8 px-2 sm:px-0`}>
            {description}
          </p>

          <div className="grid gap-6 mb-8">
            {steps.map((text, i) => {
              const [before, after] = text.split(":");
              return (
                <div key={i} className="flex items-start group text-left">
                  <div className="w-8 h-0.5 bg-[var(--primary-color)] mt-3 mr-4 transition-all duration-300"></div>
                  <p className={`font-bold ${is4K ? "text-xl" : "text-lg"}`}>
                    <span className="text-[var(--secondary-color)]">{before}</span>
                    <span className="font-medium text-gray-700">{after ? `:${after}` : ""}</span>
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-sm text-gray-600 mt-8">
            <p className="font-bold text-[var(--primary-color)] mb-1">{footerHeadline}</p>
            <p>{footerDescription}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
