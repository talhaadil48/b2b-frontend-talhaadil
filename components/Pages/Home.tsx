"use client";
import Counter from "@/components/Material/Counter";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { AnimationCardGrid } from "@/components/Cards/AnimationCard";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import DKCHero from "@/components/Essentials/DKCHero";
import Link from "next/link";
import { UserPlus, CalendarCheck, ChevronLeft, ChevronRight } from "lucide-react";
import {
  DollarSign,
  Globe,
  Users,
  TrendingUp,
  Award,
  Target,
  Heart,
  Clock,
  Zap,
  Star,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  Calendar,
  CheckCircle,
  Sparkles,
  Building,
  Lightbulb,
  Shield,
  Handshake,
  ShieldCheck,
  Scale,
  BookOpen,
  MapPin,
} from "lucide-react";
import BannerWithFeatures from "@/components/Material/BannerwithFeatures";
import { useRef } from "react";
import { useGlobalContext } from "@/context/ScreenProvider";
import HowItWorksSection from "@/components/Section/HowItWorksSection";
import ScrollSection from "@/components/Section/ScrollSection";
import MainPageCards from "@/components/Cards/MainPageCards";
import RecSquareSection from "@/components/Section/RecSquareSection";
import Homepage from "@/components/Essentials/HomePage";
import KashmirCraftsCarousel from "@/components/Material/ProfitBox";
import FlagSection from "@/components/Material/FlagSection";
import Location from "@/components/Essentials/Location";


const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const howItWorksData = {
  title: "How It Works",
  description:
    "Swift Partnership Activation: Experience a seamless journey from registration to marketplace leadership through DKC's transformative onboarding process, empowering buyers with tools, training, and support to thrive in a global marketplace.",
  imageUrl: "/images/onboarding.jpg",
  imageAlt: "Onboarding Illustration",
  mini_desc: " Our Onboarding Process",
  phases: [
    "Registration Phase      ",
    "Document Submission Phase      ",
    "Eligibility Review Phase      ",
    "Agreement and Certification Phase      ",
    "Profile Setup Phase      ",
    "Partnership-Specific Onboarding Phase      ",
    "Training and Resource Checkup Phase      ",
    "Portal Access Activation Phase      ",
    "Partnership Launch and Support Phase      ",
    "KPI and Marketplace Engagement Phase      ",
  ],
};

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

const partnershipCategories = [
  {
    label: "Core Trade",
    href: "/core-trade",
    summary:
      "Trade-centric partnerships including dropshipping, consignment, distribution and import / export.",
    subItems: [
      {
        label: "Drop Shipping ",
        href: "/core-trade/dropshipping-ecommerce",
      },
      { label: "Consignment", href: "/core-trade/consignment" },
      {
        label: "Wholesale & Distribution",
        href: "/core-trade/wholesale&distribution",
      },
      { label: "Import & Export", href: "/core-trade/import-export" },
    ],
  },
  {
    label: "Brand Expansion",
    href: "/brand-growth",
    summary:
      "Expand reach via exhibitions, auction , white-label, and US based physical brick & mortar.",
    subItems: [
      { label: "Exhibition", href: "/brand-growth/exhibition" },
      { label: "Auction & Bidding", href: "/brand-growth/auction&bidding" },
      { label: "White-Label", href: "/brand-growth/white-label" },
      { label: "Brick & Mortar ", href: "/brand-growth/brick&mortar" },
    ],
  },
  {
    label: "Collaborative",
    href: "/collaborative",
    summary:
      "Collaboration through packaging, desgin, media and US based warehouse dasdhh dhasjhd.",
    subItems: [
      { label: "Packaging", href: "/collaborative/packaging" },
      {
        label: "Design Collaboration",
        href: "/collaborative/design-collaboration",
      },
      {
        label: "Storytelling & Media",
        href: "/collaborative/storytelling&media",
      },
      { label: "Warehouse", href: "/collaborative/warehouse" },
    ],
  },
  {
    label: "Institutional",
    href: "/institutional",
    summary:
      "Institutional alliances with logistics, museums, SGD-NGOs / governments and technology innovation.",
    subItems: [
      { label: "Logistics", href: "/institutional/logistics" },
      {
        label: "Museum / Institutional",
        href: "/institutional/museum-institutional",
      },
      { label: "NGO & Government", href: "/institutional/ngo&government" },
      {
        label: "Technology Partnership",
        href: "/institutional/technology-partnership",
      },
    ],
  },
];

const whatSetsUsApartCards = [
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Our Mission",
    description:
      "Empowering innovation through expertise and excellence.",
    buttonText: "READ MORE",
    link: "/our-mission",
  },
  {

    icon: <Scale className="w-8 h-8" />,
    title: "Our Values",
    description:
      "Rooted in authenticity, fairness, and cultural preservation at every step.",
    buttonText: "READ MORE",
    link: "/our-values",
  },

  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Our Story",
    description:
      "From Kashmir's valleys to the world, driven by passion and artisanship.",
    buttonText: "READ MORE",
    link: "/our-story",
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Business",
    description:
      "Connecting Kashmiri handmade products with global buyers.",
    buttonText: "READ MORE",
    link: "/business-niche",
  },

];

export default function Home() {
  const [activeTab, setActiveTab] = useState("buyer");
  const { is4K } = useGlobalContext();
  const { scrollYProgress } = useScroll();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("pashmina");
  const categories = {
    pashmina: {
      title: "DKC Himalayan Pashmina Luxe",
      subtitle: "Feel the Luxury, Wear the Heritage.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    couture: {
      title: "DKC Couture Boutique",
      subtitle: "Crafting Style with a Kashmiri Touch.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    heritage: {
      title: "DKC Heritage Interiors",
      subtitle: "Infusing Your Home with Kashmir's Rich Legacy.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    gemstone: {
      title: "DKC Kashmir Gemstone",
      subtitle: "Jewels as Pure and Radiant as Kashmir's Heart.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    bazaar: {
      title: "De Koshur Crafts Bazaar",
      subtitle: "Parent Company",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    wooden: {
      title: "DKC Wooden Wonders",
      subtitle: "Turning Wood into Wonders with Kashmir's Touch.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    }
  };


  const scrollFeatures = [
    {
      title: "Direct Market Access",
      description:
        "Eliminate the middlemen. Showcase your creations directly to buyers worldwide, ensuring you get the full value of your work.",
    },
    {
      title: "Seamless Branding & Outreach",
      description:
        "From storytelling to social media, gain professional branding and marketing support that amplifies your voice and vision.",
    },
    {
      title: "Global Connections",
      description:
        "Tap into a vast network of international buyers, collectors, and enthusiasts who value authentic Kashmiri craftsmanship.",
    },
    {
      title: "Thriving Artisan Network",
      description:
        "Collaborate, share knowledge, and grow alongside a supportive community of artisans and craft entrepreneurs.",
    },
    {
      title: "Ethical & Sustainable Growth",
      description:
        "Embrace fair trade principles and eco-friendly practices that honor both the artisan and the environment.",
    },
    {
      title: "Heritage in Every Thread",
      description:
        "Preserve and celebrate the timeless artistry of Kashmiri crafts, passing its beauty and traditions to future generations.",
    },
  ];

  const data = [
    {
      icon: "ShoppingCart",
      title: "Core Trade",
      desc: "We focus on trade quality, efficiency, and lasting global reliability.",
      link: "/core-trade",
    },
    {
      icon: "Rocket",
      title: "Brand Growth",
      desc: "We help brands expand reach, boost presence, and achieve success.",
      link: "/brand-growth",
    },
    {
      icon: "Users",
      title: "Collaborative",
      desc: "We build networks, share resources, and drive growth.",
      link: "/collaborative",
    },
    {
      icon: "Building",
      title: "Institutional",
      desc: "We partner with firms, strengthen ties, and foster lasting trust.",
      link: "/institutional",
    },
  ];







  return (
    <div className="min-h-screen bg-white overflow-x-hidden">


      {/* Hero Section */}
      <DKCHero />


      <div className="pb-10 lg:pb-20">
        <Homepage />
      </div>

      <div className="lg:pb-20">
        <ScrollSection features={scrollFeatures} />
      </div>


      {/* About Us Sections */}
      <section
        className="px-2 md:px-6 lg:px-8 bg-white text-center pb-10 lg:pb-20"
      >
        <AnimationCardGrid data={whatSetsUsApartCards} />
      </section>


      {/* Partnerships Section */}
      <section
        className={`bg-gray-100 text-left ${is4K ? "py-28 px-20" : "px-4"
          } py-20 lg:pb-20 `}
      >
        <div className={`${is4K ? "max-w-[1600px]" : "max-w-7xl"} mx-auto`}>
          <motion.div
            className="text-center mb-16 flex flex-col gap-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            viewport={{ once: true }}
          >
            <div className={`max-w-5xl mx-auto ${playfair.className}`}>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 text-left md:text-center mb-4">
                De Koshur Crafts Partnerships
              </h1>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 text-left md:text-center mb-4">
                Four Pathways Grid
              </h1>

              <h2 className="text-xl md:text-2xl text-gray-700 font-semibold text-left md:text-center mb-2">
                Tailored Pathways for Artisans, Buyers & Institutions
              </h2>


            </div>


          </motion.div>
          <div className={`grid md:grid-cols-4 ${is4K ? "gap-14" : "gap-6"}`}>
            {partnershipCategories.map((category, index) => (
              <motion.div
                key={index}
                className={`bg-[var(--secondary-color)] ${is4K ? "p-14" : "p-8"
                  } rounded-lg border border-gray-700 hover:border-[var(--secondary-color)] transition-all duration-300`}
                whileHover={{ scale: 1.02 }}
              >
                <h3
                  className={`${is4K ? "text-4xl" : "text-2xl"
                    } font-bold text-white mb-4`}
                >
                  {category.label}
                </h3>
                <p
                  className={`${is4K ? "text-xl" : "text-lg"
                    } text-white mb-6`}
                >
                  {category.summary}
                </p>
                <ul className="space-y-3 mb-8">
                  {category.subItems.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center gap-3 text-white"
                    >
                      <CheckCircle
                        size={is4K ? 28 : 20}
                        className="text-[var(--white)] flex-shrink-0"
                      />
                      <Link
                        href={item.href}
                        className={`${is4K ? "text-lg" : "text-base"
                          } hover:text-white transition-colors duration-200`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={category.href}
                  className={`inline-flex items-center gap-2 ${is4K ? "px-8 py-4 text-xl" : "px-6 py-3 text-lg"
                    } bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--primary-hover-color)] transition-colors duration-300`}
                >
                  Read More
                  <ArrowRight size={is4K ? 28 : 20} />
                </Link>
              </motion.div>
            ))}
          </div>
          <p className={`text-md md:text-xl text-gray-600 text-center mt-10 ${playfair.className} font-bold`}>
            A dynamic framework for trade, growth, and collaboration in the global craft ecosystem
          </p>
        </div>
      </section>

      <div className="pt-6 md:pt-0 md:pb-10 bg-white">
        <RecSquareSection />
      </div>

      <div>
        <MainPageCards />
      </div>

      <div className="bg-white pt-10 lg:pb-6 lg:pt-16">
        <div className="text-center">

          <h2
            className={`text-4xl lg:text-5xl font-bold text-[var(--primary-color)] mb-4 ${is4K ? "2xl:text-6xl 2xl:mb-6" : ""
              }`}
          >
            Our Business Network
          </h2>
           <h1 className="text-3xl md:text-5xl font-bold text-gray-900 text-left md:text-center mb-4">
                Four Pathways Grid
              </h1>

              <h2 className="text-xl md:text-2xl text-gray-700 font-semibold text-left md:text-center mb-2">
                Tailored Pathways for Artisans, Buyers & Institutions
              </h2>
              <h2 className="text-xl md:text-2xl text-gray-700 font-semibold text-left md:text-center mb-2">
                Tailored Pathways for Artisans, Buyers & Institutions
              </h2>
              <h2 className="text-xl md:text-2xl text-gray-700 font-semibold text-left md:text-center mb-2">
                Tailored Pathways for Artisans, Buyers & Institutions
              </h2>
              <h2 className="text-xl md:text-2xl text-gray-700 font-semibold text-left md:text-center mb-2">
                Tailored Pathways for Artisans, Buyers & Institutions
              </h2>
        </div>
        <div className="flex justify-center space-x-6 border-[var(--primary-color)] mt-8">
          <button
            onClick={() => setActiveTab("buyer")}
            className={`py-3 px-6 font-bold text-2xl focus:outline-none rounded-md ${activeTab === "vendor"
              ? "border-[var(--primary-color)] text-[var(--primary-color)]"
              : "bg-gray-400 text-white"
              }`}
          >
            Buyer
          </button>
          <button
            onClick={() => setActiveTab("vendor")}
            className={`py-3 px-6 font-bold text-2xl focus:outline-none rounded-md ${activeTab === "buyer"
              ? "border-[var(--primary-color)] text-[var(--primary-color)]"
              : "bg-gray-400 text-white"
              }`}
          >
            Vendor
          </button>
        </div>
        <section className={`py-6 ${is4K ? "2xl:py-10" : ""}`}>
          <div className="container mx-auto px-4 text-center">
            {activeTab === "buyer" && (
              <>

                <Counter slides={buyerslides} />
              </>
            )}
            {activeTab === "vendor" && (
              <>

                <Counter slides={vendorslides} />
              </>
            )}
          </div>
        </section>
      </div>

      <div>
        <KashmirCraftsCarousel />
      </div>

      {/* <div>
        <FlagSection />
      </div> */}


      <div className="bg-white pt-10 pb-8 lg:pb-14 lg:pt-16 min-w-[280px]">
        <div className="text-center">
          <h2
            className={`text-4xl lg:text-5xl font-bold text-[var(--primary-color)] mb-4 ${is4K ? "2xl:text-6xl 2xl:mb-6" : ""
              }`}
          >
            Our Business Network
          </h2>
        </div>

        {/* TABS - Desktop: All | Mobile: One + Arrows */}
        <div className="px-4 mb-8">
          {/* Desktop Tabs */}
          <div className="hidden md:flex justify-center flex-wrap gap-3">
            {[
              { key: "pashmina", label: "Pashmina Luxe" },
              { key: "couture", label: "Couture" },
              { key: "heritage", label: "Heritage" },
              { key: "gemstone", label: "Gemstone" },
              { key: "bazaar", label: "Bazaar" },
              { key: "wooden", label: "Wooden Wonders" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedCategory(item.key)}
                className={`py-3 px-6 font-bold text-lg focus:outline-none rounded-md transition-all ${selectedCategory === item.key
                  ? "bg-[var(--primary-color)] text-white"
                  : "bg-gray-400 text-white hover:bg-gray-500"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile: Single Fixed-Size Tab + Arrows */}
          <div className="flex md:hidden items-center justify-center gap-4">
            {/* Left Arrow */}
            <button
              onClick={() => {
                const order = ["pashmina", "couture", "heritage", "gemstone", "bazaar", "wooden"];
                const i = order.indexOf(selectedCategory);
                setSelectedCategory(order[i === 0 ? order.length - 1 : i - 1]);
              }}
              className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl active:scale-95 transition-all"
              aria-label="Previous category"
            >
              <ChevronLeft className="w-6 h-6 text-[var(--primary-color)]" />
            </button>

            {/* Active Tab - Fixed Width */}
            <button
              className="w-[200px] py-3 font-bold rounded-md bg-[var(--primary-color)] text-white shadow-xl whitespace-nowrap text-center"
            >
              <span
                className={`${selectedCategory === "pashmina" || selectedCategory === "wooden"
                  ? "text-base"
                  : "text-lg"
                  }`}
              >
                {selectedCategory === "pashmina"
                  ? "Pashmina Luxe"
                  : selectedCategory === "wooden"
                    ? "Wooden Wonders"
                    : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
              </span>
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => {
                const order = ["pashmina", "couture", "heritage", "gemstone", "bazaar", "wooden"];
                const i = order.indexOf(selectedCategory);
                setSelectedCategory(order[(i + 1) % order.length]);
              }}
              className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl active:scale-95 transition-all"
              aria-label="Next category"
            >
              <ChevronRight className="w-6 h-6 text-[var(--primary-color)]" />
            </button>
          </div>
        </div>

        {/* Content Section - Mobile: Logo > Title > Subtitle */}
        <section className={`py-6 ${is4K ? "2xl:py-10" : ""}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-[940px] mx-auto rounded-lg shadow-lg p-6 bg-white">
              {/* Mobile: Centered Logo, Title, Subtitle */}
              <div className="flex flex-row md:items-center md:h-[160px]">
                <div className="-mt-6 md:-mt-4 md:mb-0 md:-ml-6 lg:-ml-6">
                  <Image
                    alt={categories[selectedCategory].title}
                    width={120}
                    height={120}
                    src="/images/flags/15.webp"
                  />
                </div>
                <div className="text-left">
                  <h3 className="text-xl lg:text-3xl font-bold text-[var(--primary-color)] mb-2">
                    {categories[selectedCategory].title}
                  </h3>
                  <p className="text-sm lg:text-xl text-gray-600 italic mb-4">
                    {categories[selectedCategory].subtitle}
                  </p>
                </div>
              </div>
              <p className="text-sm lg:text-lg text-gray-700 leading-relaxed text-left">
                {categories[selectedCategory].description}
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className="pb-8 lg:pb-10">
        <Location />
      </div>

      <section
        className="w-full py-16 md:py-24 lg:py-18 text-white lg:pb-20"
        style={{
          background: "var(--primary-hover-color)",
        }}
      >
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center gap-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Unlock Your Potential: Join Our Community!
          </h2>
          <p className="max-w-3xl text-lg md:text-xl lg:text-2xl opacity-90">
            Discover a world of opportunities. Whether you're looking to connect
            with like-minded individuals or seeking expert guidance, we're here
            to help you thrive.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg flex flex-col items-center text-center border border-white/20 transition-all duration-300 hover:bg-white/20">
              <UserPlus className="h-12 w-12 text-white mb-4" />
              <h3 className="text-2xl font-bold mb-2">Become a Member</h3>
              <p className="text-base opacity-80 mb-6">
                Access exclusive content, connect with experts, and grow your
                skills within our vibrant community.
              </p>
              <Link href="/registration" className="w-full">
                <button
                  className="w-full bg-white rounded-lg font-semibold transition-colors duration-300 px-8 py-4 text-lg shadow-md hover:shadow-xl"
                  style={{
                    color: "var(--primary-color)",
                    backgroundColor: "white",
                  }}
                >
                  Register Now
                </button>
              </Link>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg flex flex-col items-center text-center border border-white/20 transition-all duration-300 hover:bg-white/20">
              <CalendarCheck className="h-12 w-12 text-white mb-4" />
              <h3 className="text-2xl font-bold mb-2">Book an Appointment</h3>
              <p className="text-base opacity-80 mb-6">
                Schedule a personalized session with our specialists to get
                tailored advice and support for your needs.
              </p>
              <Link href="/appointment" className="w-full">
                <button
                  className="w-full bg-white rounded-lg font-semibold transition-colors duration-300 px-8 py-4 text-lg shadow-md hover:shadow-xl"
                  style={{
                    color: "var(--primary-color)",
                    backgroundColor: "white",
                  }}
                >
                  Schedule a Call
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}