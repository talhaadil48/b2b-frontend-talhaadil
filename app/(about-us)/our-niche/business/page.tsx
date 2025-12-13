"use client";
import React from "react";
import { useGlobalContext } from "@/context/ScreenProvider";
import { useEffect, useState } from "react";
import {
  Shirt,
  Palette,
  Scissors,
  TreePine,
  Settings,
  Gem,
  Landmark,
  Leaf,
  Gift,
} from "lucide-react";
import Accordion from "@/components/Material/Accordion";
import PremiumTabs from "@/components/Material/PremiumTabs";
import Counter from "@/components/Material/Counter";
import VerticalHeroSlider from "@/components/Essentials/VerticalBanner";
function page() {
  const { is4K } = useGlobalContext();

  const buyerslides = [
    { id: 1, title: "Individual Purchasers", number: 1523 },
    { id: 2, title: "Retail Customers", number: 351 },
    { id: 3, title: "Wholesale Purchasers", number: 311 },
    { id: 4, title: "Online Purchasers", number: 18 },
    { id: 5, title: "Interior Designers", number: 68 },
    { id: 6, title: "Corporate Purchasers", number: 8 },
    { id: 7, title: "Art Preservationists", number: 205 },
    { id: 8, title: "Global Merchandisers", number: 52 },
    { id: 10, title: "Hospitality Chains", number: 21 },
    { id: 11, title: "Fashion Designers", number: 28 },
  ];
  const vendorslides = [
    { id: 1, title: "Individual Artisans", number: 1032 },
    { id: 2, title: "Artisan Communities", number: 15 },
    { id: 3, title: "Small Businesses", number: 23 },
    { id: 4, title: "Women Entrepreneurs", number: 6 },
    { id: 5, title: "Export Specialists", number: 17 },
    { id: 6, title: "Online Merchandisers", number: 22 },
    { id: 7, title: "Design Professionals", number: 3 },
    { id: 8, title: "Luxury Merchandisers", number: 16 },
    { id: 9, title: "Wholesale Suppliers", number: 13 },
    { id: 10, title: "Craft Professionals", number: 7 },
  ];
  const cards = [
    {
      icon: <Gem className="w-8 h-8 text-white" />,
      title: "Luxury Buyers",
      description:
        "People who seek rare crafted items with lasting charm and elegant appeal, making each purchase feel truly unique.",
    },
    {
      icon: <Landmark className="w-8 h-8 text-white" />,
      title: "Culture Lovers",
      description:
        "People who value art and heritage, looking for timeless goods that honor traditions and bring meaning to life.",
    },
    {
      icon: <Leaf className="w-8 h-8 text-white" />,
      title: "Green Seekers",
      description:
        "People who choose products built with care for nature, ensuring every item supports a kind and safe future.",
    },
    {
      icon: <Gift className="w-8 h-8 text-white" />,
      title: "Home Stylers",
      description:
        "People who love fine decor and unique gifts, searching for pieces that enrich spaces and bring lasting joy.",
    },
  ];

  const impactData = [
    {
      id: "artisan-income",
      title: "Artisan Income",
      content:
        "Boosted artisan earnings through direct-to-buyer sales, removing middlemen and ensuring fairer profits for their craft.",
      icon: "users",
    },
    {
      id: "women-growth",
      title: "Women Growth",
      content:
        "Expanded women’s participation in craft trade, giving them fair wages, market visibility, and lasting financial independence.",
      icon: "heartHandshake",
    },
    {
      id: "skill-training",
      title: "Skill Training",
      content:
        "Equipped artisans with digital tools, design expertise, and export-ready skills to enhance craftsmanship and sales outreach.",
      icon: "graduationCap",
    },
    {
      id: "family-care",
      title: "Family Care",
      content:
        "Provided artisan families with health grants, educational support, and welfare initiatives to improve household well-being.",
      icon: "stethoscope",
    },
    {
      id: "local-growth",
      title: "Local Growth",
      content:
        "Stimulated village economies through jobs, micro-loans, and craft hubs to sustain traditional skills and rural livelihoods.",
      icon: "building2",
    },
    {
      id: "green-craft",
      title: "Green Craft",
      content:
        "Promoted eco-friendly materials, organic dyes, and responsible production methods to preserve heritage sustainably.",
      icon: "leaf",
    },
    {
      id: "fair-trade",
      title: "Fair Trade Access",
      content:
        "Ensured transparent pricing, certifications, and policies that empower artisans to earn rightful value for their creations.",
      icon: "award",
    },
    {
      id: "world-sales",
      title: "World Sales",
      content:
        "Kashmiri crafts reached 100+ nations, 300+ partners, and 100,000+ sales globally, sharing heritage with the world.",
      icon: "globe2",
    },
  ];
  return (
    <div>
      {/* {header} */}
      <VerticalHeroSlider />
      {/* Market Differentiation */}
      <section
        className={`px-4 md:px-8 lg:px-12 py-20 bg-gradient-to-b from-gray-50 to-white ${
          is4K ? "2xl:py-32" : ""
        }`}
      >
        <div
          className={`max-w-6xl mx-auto ${is4K ? "2xl:max-w-[2000px]" : ""}`}
        >
          <h2
            className={`text-4xl lg:text-5xl font-bold text-center mb-4 text-[color:var(--primary-color)] ${
              is4K ? "2xl:text-6xl" : ""
            }`}
          >
            What Makes Us Unique
          </h2>
          <p
            className={`text-center md:text-center lg:text-center text-lg text-[color:var(--secondary-color)] mb-16 max-w-3xl mx-auto ${
              is4K ? "2xl:text-xl 2xl:mb-20" : ""
            }`}
          >
            Standing out in the handmade crafts market through authenticity and
            ethical practices
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[color:var(--primary-color)] hover:scale-105 duration-500">
              <h3
                className={`text-2xl font-bold text-[color:var(--primary-color)] mb-4 ${
                  is4K ? "2xl:text-3xl 2xl:mb-6" : ""
                }`}
              >
                Authenticity & Tradition
              </h3>
              <p
                className={`text-gray-700 leading-relaxed ${
                  is4K ? "2xl:text-lg" : ""
                }`}
              >
                Only authentic Kashmiri crafts made by artisans who have
                inherited techniques through generations. Each item carries the
                story of the land and culture.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[color:var(--primary-color)] hover:scale-105 duration-500">
              <h3
                className={`text-2xl font-bold text-[color:var(--primary-color)] mb-4 ${
                  is4K ? "2xl:text-3xl 2xl:mb-6" : ""
                }`}
              >
                Fair Trade & Empowerment
              </h3>
              <p
                className={`text-gray-700 leading-relaxed ${
                  is4K ? "2xl:text-lg" : ""
                }`}
              >
                Ensuring fair wages, training access, and global showcase
                opportunities for artisans, creating sustainable livelihoods for
                families.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[color:var(--primary-color)] hover:scale-105 duration-500">
              <h3
                className={`text-2xl font-bold text-[color:var(--primary-color)] mb-4 ${
                  is4K ? "2xl:text-3xl 2xl:mb-6" : ""
                }`}
              >
                Sustainability Focus
              </h3>
              <p
                className={`text-gray-700 leading-relaxed ${
                  is4K ? "2xl:text-lg" : ""
                }`}
              >
                Eco-friendly materials and sustainable crafting practices ensure
                minimal environmental footprint while preserving traditional
                methods.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[color:var(--primary-color)] hover:scale-105 duration-500">
              <h3
                className={`text-2xl font-bold text-[color:var(--primary-color)] mb-4 ${
                  is4K ? "2xl:text-3xl 2xl:mb-6" : ""
                }`}
              >
                Global Reach, Local Impact
              </h3>
              <p
                className={`text-gray-700 leading-relaxed ${
                  is4K ? "2xl:text-lg" : ""
                }`}
              >
                Connecting Kashmiri artisans to global markets while providing
                employment, education, and healthcare support to local
                communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Market */}
      <section
        className={`px-4 md:px-8 lg:px-12 py-20 text-white bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-hover-color)] ${
          is4K ? "2xl:py-32" : ""
        }`}
      >
        <div
          className={`max-w-6xl mx-auto ${is4K ? "2xl:max-w-[2000px]" : ""}`}
        >
          <h2
            className={`text-4xl lg:text-5xl font-bold text-center mb-4 text-[var(--secondary-light-color)] ${
              is4K ? "2xl:text-6xl" : ""
            }`}
          >
            Our Global Audience
          </h2>
          <p
            className={`text-center md:text-center lg:text-center px-2 text-lg mb-16 max-w-3xl mx-auto opacity-90 ${
              is4K ? "2xl:text-xl 2xl:mb-20" : ""
            }`}
          >
            Serving customers who value authenticity, tradition, and ethical
            business practices
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-white shadow-md"
              >
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto bg-[var(--secondary-color)] ${
                    is4K ? "2xl:w-24 2xl:h-24 2xl:mb-6" : ""
                  }`}
                >
                  {card.icon}
                </div>
                <h3
                  className={`text-xl font-bold mb-3 text-[var(--primary-color)] ${
                    is4K ? "2xl:text-2xl 2xl:mb-4" : ""
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`text-sm text-left md:text-center lg:text-center text-gray-700 ${
                    is4K ? "2xl:text-base" : ""
                  }`}
                >
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Impact Metrics Section */}
      <section
        className={`px-4 md:px-8 lg:px-12 py-30 ${
          is4K ? "mx-auto max-w-[2400px] 2xl:py-40" : ""
        }`}
      >
        <h1
          className={`text-center font-bold mb-6 text-3xl sm:text-4xl md:text-5xl text-[color:var(--primary-color)] ${
            is4K ? "2xl:text-6xl 2xl:mb-8" : ""
          }`}
        >
          Global Impact Metrics
        </h1>
        <p
          className={`text-center mb-10 text-base sm:text-lg md:text-xl text-[color:var(--secondary-color)] ${
            is4K ? "2xl:text-2xl 2xl:mb-12" : ""
          }`}
        >
          Discover the journey of our brand and what makes us unique.
        </p>
        <Accordion data={impactData} />
      </section>

      <PremiumTabs />

      <div className="bg-gradient-to-b from-blue-50 to-blue-100 pt-4">
        <div className="text-center mt-16 mb-6">
          <h2
            className={`text-4xl lg:text-5xl font-bold text-[var(--primary-color)] mb-4 ${
              is4K ? "2xl:text-6xl 2xl:mb-6" : ""
            }`}
          >
            Our Reach
          </h2>
        </div>
        <section className={`py-6 ${is4K ? "2xl:py-10" : ""}`}>
          <div className="container mx-auto px-4 text-center">
            <h3
              className={`text-3xl font-bold text-[var(--secondary-color)] mb-3 ${
                is4K ? "2xl:text-4xl 2xl:mb-4" : ""
              }`}
            >
              Buyer
            </h3>
            <Counter slides={buyerslides} />
          </div>
        </section>
        <section className={`py-6 ${is4K ? "2xl:py-10" : ""}`}>
          <div className="container mx-auto px-4 text-center">
            <h3
              className={`text-3xl font-bold text-[var(--secondary-color)] mb-3 ${
                is4K ? "2xl:text-4xl 2xl:mb-4" : ""
              }`}
            >
              Vendor
            </h3>
            <Counter slides={vendorslides} />
          </div>
        </section>
      </div>

      {/* Future Vision */}
      <section
        className={`px-4 md:px-8 lg:px-12 py-20 ${is4K ? "2xl:py-32" : ""}`}
      >
        <div
          className={`max-w-4xl mx-auto text-center ${
            is4K ? "2xl:max-w-[2000px]" : ""
          }`}
        >
          <h2
            className={`text-4xl lg:text-5xl font-bold mb-6 text-[color:var(--primary-color)] ${
              is4K ? "2xl:text-6xl 2xl:mb-8" : ""
            }`}
          >
            Our Future Vision
          </h2>
          <p
            className={`text-lg text-left  md:text-center lg:text-center sm:text-xl text-gray-700 leading-relaxed mb-8 ${
              is4K ? "2xl:text-2xl 2xl:mb-10" : ""
            }`}
          >
            Expanding our global reach while staying true to our roots. We aim
            to be the go-to destination for luxury Kashmiri crafts, offering
            customers an authentic, sustainable, and impactful shopping
            experience through new crafts, custom offerings, and global
            partnerships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
            <div className="bg-white rounded-lg p-6 shadow-lg flex-1 min-w-[220px]">
              <h3
                className={`text-xl font-bold text-[color:var(--primary-color)] mb-2 ${
                  is4K ? "2xl:text-2xl 2xl:mb-3" : ""
                }`}
              >
                Expand Globally
              </h3>
              <p
                className={`text-gray-700 text-sm ${
                  is4K ? "2xl:text-base" : ""
                }`}
              >
                Reaching new markets worldwide
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg flex-1 min-w-[220px]">
              <h3
                className={`text-xl font-bold text-[color:var(--primary-color)] mb-2 ${
                  is4K ? "2xl:text-2xl 2xl:mb-3" : ""
                }`}
              >
                New Crafts
              </h3>
              <p
                className={`text-gray-700 text-sm ${
                  is4K ? "2xl:text-base" : ""
                }`}
              >
                Introducing more Kashmiri traditions
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg flex-1 min-w-[220px]">
              <h3
                className={`text-xl font-bold text-[color:var(--primary-color)] mb-2 ${
                  is4K ? "2xl:text-2xl 2xl:mb-3" : ""
                }`}
              >
                Custom Excellence
              </h3>
              <p
                className={`text-gray-700 text-sm ${
                  is4K ? "2xl:text-base" : ""
                }`}
              >
                Expanding bespoke offerings
              </p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
          <div className="w-full overflow-hidden rounded-xl shadow-lg">
            <img
              src="/images/image888.webp"
              alt="Future Vision"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
