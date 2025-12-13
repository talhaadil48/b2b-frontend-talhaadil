"use client";

import VerticalHeroSlider from "@/components/Essentials/VerticalBanner";
import { motion } from "framer-motion";
import {
  Mountain,
  Globe,
  Award,
  Users,
  Sparkles,
  Heart,
  Star,
  Recycle,
  Plane,
  Cpu,
  TrendingUp,
  Palette,
  Store,
} from "lucide-react";
import Link from "next/link";
export default function DeKoshurCrafts() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-x-hidden">
      <VerticalHeroSlider />

      {/* Brand Origin Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-bold text-[var(--primary-color)] mb-6"
            >
              Our Brand Origin
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              At the heart of De Koshur Crafts lies a profound connection to
              Kashmir's cultural soul. Rooted in the term "Koshur," meaning
              "Kashmiri," our brand embodies a legacy of authenticity and
              artistry.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Mountain,
                title: "Inspired by the Himalayas",
                description:
                  "Nestled in the breathtaking expanse of the Himalayas, Kashmir's natural beauty and cultural vibrancy shape each piece, channeling the spirit of this majestic landscape.",
              },
              {
                icon: Globe,
                title: "Legacy of the Silk Route",
                description:
                  "Once a vital node on the ancient Silk Route, Kashmir has been a melting pot of cultures, ideas, and artistic expressions infused in our crafts.",
              },
              {
                icon: Award,
                title: "UNESCO Recognition",
                description:
                  "Recognized by UNESCO's Creative Cities Network, Kashmir's unparalleled cultural legacy holds a prestigious global place in preserving traditional arts.",
              },
              {
                icon: Star,
                title: "WCC Recognition",
                description:
                  "Recognized by the World Craft Council for exceptional artisanal traditions, Kashmir proudly holds a distinguished position in the global craft community.",
              },
              {
                icon: Heart,
                title: "Artistry & Sufi Legacy",
                description:
                  "Rooted in the Sufi lineage, Kashmiri artisans' creations transcend commerce, embodying soulful expression and spiritual depth in every piece.",
              },
              {
                icon: Sparkles,
                title: "Global Fashion Legacy",
                description:
                  "From European aristocracy's passion for luxurious Pashmina shawls to royal courts, Kashmiri crafts have profoundly influenced global fashion and luxury.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--secondary-light-color)] to-[var(--secondary-color)]/20 rounded-full mb-6">
                  <item.icon className="w-8 h-8 text-[var(--secondary-color)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--primary-color)] mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <img
        src="/images/image55.png"
        className="w-full md:w-[60vw] h-[45vh] md:h-[80vh] mx-auto block"
      ></img>

      {/* Common Connection Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--primary-color)]/5 to-[var(--secondary-color)]/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-bold text-[var(--primary-color)] mb-6"
            >
              Common Connection
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              The Bridge Between Home and Heritage... US-based Kashmiri
              immigrants are the heartbeat of De Koshur Crafts' journey
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {[
              {
                title: "Catalysts for Positive Change",
                desc: "Kashmiri immigrants in the United States act as catalysts for transformation, leveraging their deep ties to Kashmir.",
              },
              {
                title: "Bridging Key Connections",
                desc: "US-based Kashmiris create vital connections between major American companies and Kashmir's handicraft sector.",
              },
              {
                title: "Advocates for a Unified Brand",
                desc: "Kashmiri immigrants in the US champion the creation of a unified, globally recognized brand—De Koshur Crafts.",
              },
              {
                title: "Elevating Craft Standards",
                desc: "De Koshur Crafts commits to elevating Kashmiri handicrafts to global standards through modern business practices.",
              },
              {
                title: "Preserving Cultural Heritage",
                desc: "De Koshur Crafts embodies a deep reverence for Kashmiri cultural heritage by merging centuries-old traditions.",
              },
              {
                title: "Framework for Empowerment",
                desc: "Central to De Koshur Crafts' mission is a holistic framework designed to uplift Kashmiri artisans.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-[var(--secondary-color)] rounded-full flex-shrink-0 mt-2"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--primary-color)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Defining Moments Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-bold text-[var(--primary-color)] mb-6"
            >
              Defining Moments
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              The establishment of De Koshur Crafts in 2022 marked a
              transformative milestone, setting the brand on a path to global
              prominence
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Commitment to Equity",
                year: "2022",
                desc: "Equity is at the heart of De Koshur Crafts, shaping its operations and community interactions.",
              },
              {
                title: "Diverse Leadership",
                year: "2023",
                desc: "De Koshur Crafts thrives on the strength of its diverse leadership, blending unique perspectives.",
              },
              {
                title: "Blueprint for Growth",
                year: "2024",
                desc: "De Koshur Crafts represents a blueprint for sustainable growth, balancing cultural preservation with innovation.",
              },
              {
                title: "Community Engagement",
                year: "2025",
                desc: "De Koshur Crafts actively fosters engagement with communities in both Kashmir and the USA.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-[var(--secondary-light-color)] to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="text-3xl font-bold text-[var(--secondary-color)] mb-2">
                  {item.year}
                </div>
                <h3 className="text-lg font-semibold text-[var(--primary-color)] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <div className="bg-white">
        <Link href="https://craftlore.org/">
          <img
            src="/images/image100.webp"
            className="w-full md:w-[60vw] h-[45vh] md:h-[80vh] mx-auto block"
          ></img>
        </Link>
      </div>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--secondary-color)]/5 to-[var(--primary-color)]/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-bold text-[var(--primary-color)] mb-6"
            >
              Business Transformation
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              De Koshur Crafts has evolved into a seamless omni-channel
              business, integrating innovation with tradition
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Store,
                title: "Retail and E-Commerce Fusion",
                description:
                  "Building a unified bridge between digital and physical retail, De Koshur Crafts merges online B2B trade with U.S. store experiences, creating a trusted, tactile, and technology-enabled journey.",
              },
              {
                icon: Recycle,
                title: "Sustainable Recommerce",
                description:
                  "Championing a circular craft economy by offering certified pre-owned Kashmiri products, extending lifecycles, reducing waste, and honoring artisanship beyond first ownership.",
              },
              {
                icon: Palette,
                title: "Global Craft Showcase",
                description:
                  "Bringing Kashmiri artistry to the world stage through international exhibitions, cultural partnerships, and luxury showrooms—turning artisan stories into global collectible experiences.",
              },
              {
                icon: Plane,
                title: "Ethical Imports Expansion",
                description:
                  "Delivering authenticity from Kashmir to America via ethical sourcing, legal compliance, and seamless logistics, strengthening the artisan economy while expanding heritage crafts.",
              },
              {
                icon: Cpu,
                title: "Technology-Driven Efficiency",
                description:
                  "Fusing tradition with technology through AI-powered ERP, CRM, and blockchain systems, ensuring transparent sourcing, reduced delays, and measurable operational precision.",
              },
              {
                icon: TrendingUp,
                title: "Strategic Marketing Excellence",
                description:
                  "Amplifying artisan voices with advanced analytics, SEO, influencer collaborations, and storytelling campaigns, positioning Kashmiri craftsmanship in premium global markets.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--primary-color)]/20 rounded-full mb-6">
                  <item.icon className="w-8 h-8 text-[var(--secondary-color)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--primary-color)] mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--primary-color)] mb-4">
            Brand Transformation Journey
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            From traditional craftsmanship to modern technology, preserving
            heritage while embracing innovation
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Heritage Foundation",
              description:
                "Rooted in Kashmiri traditions, we preserve authentic artistry and discipline of master craftsmen, keeping heritage alive with integrity and cultural devotion.",
            },
            {
              title: "Modern Integration",
              description:
                "Blending craftsmanship with technology, we build connected ecosystems of artisans and enterprises, ensuring transparency and authenticity.",
            },
            {
              title: "Global Reach",
              description:
                "Bridging Kashmir’s artistry with international markets, we expand heritage through exports and collaborations, uniting cultural legacy with global recognition.",
            },
            {
              title: "Sustainable Future",
              description:
                "Championing conscious commerce, we extend product lifecycles through recommerce, eco-responsible sourcing, and carbon tracking to preserve culture and planet.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg sm:text-xl font-bold text-[var(--primary-color)] mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--primary-color)] mb-4">
            Let’s Uphold the Legacy of Kashmir Craft Together
          </h2>
          <div className="text-left">

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-4">
              Kashmir is not just a region. It is one of humanity’s oldest creative sanctuaries, a place where hands, not machines, shaped history. In a world racing toward mass production, Kashmir stands as a rare stronghold of soul, precision, and artistic truth. Its capital, Srinagar, remains the living heartbeat of a craft civilization that has endured for centuries.
            </p>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-4">
              Recognized among UNESCO Creative Cities, honored as a World Craft City, and rooted in the legacy of the Silk Route, Kashmir represents an unbroken chain of mastery from ancient times to the present. Across millennia, it has served as a crossroads of ideas, artisans, merchants, cultures, and kingdoms, each leaving behind threads that today form the fabric of Kashmiri craftsmanship.
            </p>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-4">
              This land has nurtured the largest living guild of master artisans on earth. Their skills cannot be automated, replicated, or replaced. These are generational lineages, fathers teaching sons, mothers teaching daughters, passing forward sacred knowledge with patience, devotion, and discipline. But heritage survives only when people choose to protect it. And that choice belongs to all of us.
            </p>
          </div>



        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            "/images/image8.png",
            "/images/image9.png",
            "/images/image10.png",
            "/images/image11.png",
          ].map((src, index) => (
            <div key={index} className="overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                src={src}
                alt={`Transformation step ${index + 1}`}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
