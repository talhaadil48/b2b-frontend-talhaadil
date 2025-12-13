"use client";

import { useGlobalContext } from "@/context/ScreenProvider";
import { Play, BookOpen, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import * as LucideIcons from "lucide-react";

export default function DKCHero() {
    const { is4K: is4k } = useGlobalContext();
    const [current, setCurrent] = useState(0);
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    const slides = [
        {
            id: 1,
            image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            title: "Global Artisan Network",
            desc: "500+ verified craftsmen • Handcrafted luxury • Direct trade",
            quote: "We don’t just sell products — we preserve centuries-old traditions.",
        },
        {
            id: 2,
            image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            title: "Sustainable Partnerships",
            desc: "Eco-friendly materials • Fair wages • Zero middlemen",
            quote: "Every purchase plants a tree and empowers a family.",
        },
        {
            id: 3,
            image: "https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            title: "Cultural Heritage Preserved",
            desc: "Kashmiri Papier-mâché • Pashmina • Walnut wood carving",
            quote: "Your order keeps ancient art alive for the next generation.",
        },
        {
            id: 4,
            image: "https://images.pexels.com/photos/5847700/pexels-photo-5847700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            title: "Verified Quality Assurance",
            desc: "GI tagged • Lab certified • Traceable origin",
            quote: "Authenticity guaranteed — or your money back.",
        },
    ];

    const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        touchEndX.current = e.changedTouches[0].screenX;
        if (touchStartX.current - touchEndX.current > 50) nextSlide();
        if (touchEndX.current - touchStartX.current > 50) prevSlide();
    };

    return (
        <>
            <section
                className={`
    relative overflow-hidden
    bg-gradient-to-br from-[var(--primary-color)] via-[var(--primary-hover-color)] to-[var(--secondary-color)] 
    text-white mt-25
    ${!is4k ? "py-10 lg:py-20" : "py-24 lg:py-40"}
  `}
            >
                <div className="absolute inset-0 bg-black/30" />

                {/* CONTAINER */}
                <div className="relative max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8">
                    {/* GRID: equal height, centered alignment */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[540px]">

                        {/* LEFT SIDE */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex flex-col justify-center h-full space-y-8 lg:space-y-14"
                        >
                            <div className="space-y-6">
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-18">
                                    DKC B2B
                                    <span className="block text-[var(--secondary-color)]">
                                        Connect Portal
                                    </span>
                                </h1>

                                <p className="text-lg sm:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl">
                                    Kashmir Crafts Connecting Global Buyers. Authentic sourcing through verified artisans in <strong>25+ languages</strong>.
                                </p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="bg-white/10 backdrop-blur-md rounded-2xl py-6 px-8 border border-white/20 shadow-xl"
                            >
                                <p className="text-white/80 text-sm uppercase tracking-wider mb-6">
                                    Artisan Promise
                                </p>
                                <blockquote className="text-xl sm:text-2xl italic font-medium">
                                    “Every craft tells a story, every order builds a legacy.”
                                </blockquote>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="flex flex-col sm:flex-row gap-4 -mt-6"
                            >
                                <Link
                                    href="#start"
                                    className="group inline-flex items-center justify-center gap-3 bg-[var(--secondary-color)] hover:bg-[var(--secondary-hover-color)] text-white px-8 py-5 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    <Play className="w-6 h-6 group-hover:translate-x-1 transition" />
                                    Explore Partnerships
                                </Link>

                                <Link
                                    href="#join"
                                    className="inline-flex items-center justify-center gap-3 border-2 border-white/50 hover:border-[var(--secondary-color)] hover:bg-[var(--secondary-color)]/10 text-white px-8 py-5 rounded-xl font-bold text-lg transition-all duration-300 backdrop-blur-sm"
                                >
                                    <BookOpen className="w-6 h-6" />
                                    Join As Buyer
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* RIGHT SIDE */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative flex justify-center items-center h-full group"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-black/20 w-full max-w-[1100px]">
                                <div
                                    className="flex transition-transform duration-700 ease-out"
                                    style={{ transform: `translateX(-${current * 100}%)` }}
                                >
                                    {slides.map((slide) => (
                                        <div
                                            key={slide.id}
                                            className="min-w-full relative flex-shrink-0 h-[480px] lg:h-[540px]"
                                        >
                                            <img
                                                src={slide.image}
                                                alt={slide.title}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                                            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 text-left">
                                                <motion.div
                                                    key={current}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                                    className="space-y-4"
                                                >
                                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
                                                        {slide.title}
                                                    </h3>
                                                    <p className="text-md sm:text-lg text-white/90 font-medium">
                                                        {slide.desc}
                                                    </p>
                                                    <div className="flex items-start gap-3 mt-6">
                                                        <Quote className="w-8 h-8 text-[var(--secondary-color)] mt-1 flex-shrink-0" />
                                                        <p className="text-base sm:text-lg text-white/80 italic max-w-2xl">
                                                            {slide.quote}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Arrows */}
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
                                >
                                    <ChevronLeft className="w-7 h-7 text-white" />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                                >
                                    <ChevronRight className="w-7 h-7 text-white" />
                                </button>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>
            <section
                className="
    bg-[var(--primary-color)]
    text-white py-10 lg:py-20
  "
            >
                <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            {
                                icon: "ShoppingCart",
                                title: "Core Trade",
                                desc: "We support global commerce through structured trading models, streamlined operations, and reliable distribution networks.",
                                link: "/core-trade",
                            },
                            {
                                icon: "Rocket",
                                title: "Brand Growth",
                                desc: "We help brands expand through strategic promotion, enhanced visibility, audience engagement, and consistent market positioning.",
                                link: "/brand-growth",
                            },
                            {
                                icon: "Users",
                                title: "Collaborative",
                                desc: "We build shared value by partnering creatively, aligning teams, and delivering strong outcomes across projects.",
                                link: "/collaborative",
                            },
                            {
                                icon: "Building",
                                title: "Institutional",
                                desc: "We work with organizations to strengthen systems, improve efficiency, and deliver sustainable long-term impact.",
                                link: "/institutional",
                            },
                        ].map((card, index) => {
                            const IconComponent = LucideIcons[card.icon] as React.ComponentType<{ size?: number; className?: string }>; // dynamically get Lucide icon

                            return (
                                <motion.a
                                    key={index}
                                    href={card.link}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                    className="
        bg-white/10 hover:bg-white/20
        backdrop-blur-xl rounded-3xl
        p-10 sm:p-12
        flex flex-col items-center text-center
        shadow-xl hover:shadow-2xl
        transition-all duration-300
      "
                                >
                                    <IconComponent className="w-10 h-10 mb-8 text-white" />
                                    <h3 className="text-2xl sm:text-3xl font-semibold mb-4">{card.title}</h3>
                                    <p className="text-white/80 text-lg sm:text-base leading-relaxed">
                                        {card.desc}
                                    </p>
                                </motion.a>
                            );
                        })}

                    </div>
                </div>
            </section>

        </>
    );
}