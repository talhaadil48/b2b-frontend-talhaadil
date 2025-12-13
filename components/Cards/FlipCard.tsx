"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { useGlobalContext } from "@/context/ScreenProvider";

interface FlipCardProps {
  title: string;
  description: string;
  detailedDescription: string;
  icon: LucideIcon;
}

export function FlipCard({
  title,
  description,
  detailedDescription,
  icon: Icon,
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const { is4K } = useGlobalContext();

  return (
    <div
      className={`group w-full ${is4K ? "h-[500px]" : "h-90"} [perspective:1000px]`}
      onClick={() => setFlipped((prev) => !prev)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        } group-hover:[transform:rotateY(180deg)]`}
      >
        {/* Front Side */}
        <div className={`absolute inset-0 w-full h-full [backface-visibility:hidden] bg-[var(--secondary-color)] text-white rounded-lg shadow-lg flex flex-col items-center justify-center text-center ${
          is4K ? "p-10" : "p-6"
        }`}>
          <div className={`mb-4 text-white`}>
            <Icon size={is4K ? 64 : 48} />
          </div>
          <h3 className={`text-[1.2rem] md:text-[2.4rem] font-bold text-white mb-2`}>
            {title}
          </h3>
          
        </div>

        {/* Back Side */}
        <div className={`absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[var(--secondary-color)] text-white rounded-lg shadow-lg flex flex-col items-center justify-center text-center ${
          is4K ? "p-10" : "p-6"
        }`}>
         
          <p className={`text-[1rem] md:text-[1rem] font-semibold text-gray-200 leading-relaxed text-left md:text-center`}>
            {detailedDescription}
          </p>
        </div>
      </div>
    </div>
  );
}
