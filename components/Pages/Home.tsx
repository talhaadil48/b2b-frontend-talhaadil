"use client"
import Counter from "@/components/Material/Counter"
import { motion, useScroll } from "framer-motion"
import { useState, useCallback, useMemo, memo } from "react"
import { AnimationCardGrid } from "@/components/Cards/AnimationCard"
import { Playfair_Display } from "next/font/google"
import DKCHero from "@/components/Essentials/DKCHero"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Target, ArrowRight, CheckCircle, Scale, BookOpen, MapPin } from "lucide-react"
import { useRef } from "react"
import { useGlobalContext } from "@/context/ScreenProvider"
import ScrollSection from "@/components/Section/ScrollSection"
import MainPageCards from "@/components/Cards/MainPageCards"
import RecSquareSection from "@/components/Section/RecSquareSection"
import Homepage from "@/components/Essentials/HomePage"
import KashmirCraftsCarousel from "@/components/Material/ProfitBox"
import Location from "@/components/Essentials/Location"

export const incrementEachDay = (
    baseNumber: number,
    startDate: string = "2025-12-13" // hardcoded reference date
): number => {
    const start = new Date(startDate)
    const today = new Date()

    start.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)

    const daysPassed = Math.max(
        0,
        Math.floor(
            (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
        )
    )

    return baseNumber + daysPassed
}

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
})

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
}

const buyerslides = [
    { id: 1, title: "Individual Purchasers", number: incrementEachDay(1523) },
    { id: 2, title: "Retail Customers", number: incrementEachDay(351) },
    { id: 3, title: "Wholesale Purchasers", number: incrementEachDay(311) },
    { id: 4, title: "Online Purchasers", number: incrementEachDay(18) },
    { id: 5, title: "Interior Designers", number: incrementEachDay(68) },
    { id: 6, title: "Corporate Purchasers", number: incrementEachDay(8) },
    { id: 7, title: "Art Preservationists", number: incrementEachDay(205) },
    { id: 8, title: "Global Merchandisers", number: incrementEachDay(52) },
    { id: 10, title: "Hospitality Chains", number: incrementEachDay(21) },
    { id: 11, title: "Fashion Designers", number: incrementEachDay(28) },
]

const vendorslides = [
    { id: 1, title: "Individual Artisans", number: incrementEachDay(1032) },
    { id: 2, title: "Artisan Communities", number: incrementEachDay(15) },
    { id: 3, title: "Small Businesses", number: incrementEachDay(23) },
    { id: 4, title: "Women Entrepreneurs", number: incrementEachDay(6) },
    { id: 5, title: "Export Specialists", number: incrementEachDay(17) },
    { id: 6, title: "Online Merchandisers", number: incrementEachDay(22) },
    { id: 7, title: "Design Professionals", number: incrementEachDay(3) },
    { id: 8, title: "Luxury Merchandisers", number: incrementEachDay(16) },
    { id: 9, title: "Wholesale Suppliers", number: incrementEachDay(13) },
    { id: 10, title: "Craft Professionals", number: incrementEachDay(7) },
]

const partnershipCategories = [
    {
        label: "Core Trade",
        href: "/core-trade",
        summary: "Trade-centric partnerships including dropshipping, consignment, wholesale distribution and global import / export.",
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
        summary: "Expand market reach through exhibitions, auctions, white-label programs, and U.S based physical brick and mortar.",
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
        summary: "Collaboration across packaging, design studios, media production, and U.S based warehouse support services.",
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
        summary: "Institutional alliances with logistics, museums, NGOs, government sectors, and technology-driven innovation ecosystems.",
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
]

const whatSetsUsApartCards = [
    {
        icon: <MapPin className="w-8 h-8" />,
        title: "Our Mission",
        description: "Enabling growth through strategic expertise, capability, and execution.",
        buttonText: "READ MORE",
        link: "/our-mission",
    },
    {
        icon: <Scale className="w-8 h-8" />,
        title: "Our Values",
        description: "Built on integrity, fairness, accountability, and responsible practice across all operations.",
        buttonText: "READ MORE",
        link: "/our-values",
    },
    {
        icon: <BookOpen className="w-8 h-8" />,
        title: "Our Story",
        description: "From Kashmir’s heritage to global markets, strengthened by commitment, skill, and purpose.",
        buttonText: "READ MORE",
        link: "/our-story",
    },
    {
        icon: <Target className="w-8 h-8" />,
        title: "Business",
        description: "Connecting Kashmiri handcrafted products to global buyers with trusted processes.",
        buttonText: "READ MORE",
        link: "/business-niche",
    },
];


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
]

const data = [
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
];


const categories = {
    bazaar: {
        title: "De Koshur Crafts Bazaar",
        subtitle: "Parent Platform Unifying Craft Commerce",
        logo: "/images/flags/18.webp",
        description: "De Koshur Crafts Bazaar operates as the central platform overseeing strategy, governance, and shared services across all DKC divisions. We manage onboarding, compliance, digital infrastructure, and global partner relationships to ensure a unified ecosystem. Our integrated model strengthens sourcing, logistics, vendor coordination, and institutional alliances, allowing each sister company to specialize while delivering consistent value to buyers across international craft categories.",
    },

    pashmina: {
        title: "DKC Himalayan Pashmina Luxe",
        subtitle: "Authentic Himalayan Pashmina For Markets",
        logo: "/images/flags/14.webp",
        description: "DKC Himalayan Pashmina Luxe serves wholesalers, boutiques, and corporate buyers seeking reliable access to certified Himalayan pashmina. We provide curated assortments, documentation, and consistent standards supporting premium positioning and strong margins. Through coordinated sampling, bulk ordering, and timely delivery, partners can confidently scale pashmina as a globally recognized luxury category.",
    },

    couture: {
        title: "DKC Couture Boutique",
        subtitle: "Premium Kashmiri Couture For Markets",
        logo: "/images/flags/15.webp",
        description: "DKC Couture Boutique collaborates with fashion retailers, buying offices, and private labels seeking distinctive Kashmiri apparel. We translate artisanal techniques into market-ready collections aligned with seasonal trends, pricing structures, and brand guidelines. Sampling, customization, and disciplined production planning help partners launch exclusive lines that elevate brand storytelling and premium positioning globally.",
    },

    heritage: {
        title: "DKC Heritage Interiors",
        subtitle: "Elevating American Interiors with Kashmiri Craftsmanship",
        logo: "/images/flags/16.webp",
        description: "DKC Heritage Interiors works with designers, developers, hospitality brands, and retailers sourcing authentic Kashmiri interior elements. We coordinate handcrafted woodwork, textiles, and décor to meet project specifications, finishes, and volumes. Our support across sampling, value engineering, and phased delivery enables cultural storytelling while meeting budgets, timelines, and institutional standards.",
    },

    gemstone: {
        title: "DKC Kashmir Gemstone",
        subtitle: "Curated Kashmir Gemstones For Designers",
        logo: "/images/flags/17.webp",
        description: "DKC Kashmir Gemstone supplies handcrafted gemstone jewelry and components to designers, retailers, galleries, and specialty buyers worldwide. We manage sourcing, grading, craftsmanship, sampling, customization, and export logistics to align with collection briefs, price points, and certification needs—helping partners build distinctive gemstone assortments for design-conscious markets.",
    },

    wooden: {
        title: "DKC Wooden Wonders",
        subtitle: "Heritage Wooden Solutions For Interiors",
        logo: "/images/flags/19.webp",
        description: "DKC Wooden Wonders collaborates with furniture retailers, décor brands, and project buyers seeking premium Kashmiri woodcraft. We develop carved décor, functional pieces, and custom elements aligned with style guidelines, durability requirements, and price bands. Prototyping, packaging, and export coordination enable commercially viable wooden collections with responsible sourcing credibility.",
    },
}

const categoryTabs = [
    { key: "pashmina", label: "Pashmina Luxe" },
    { key: "couture", label: "Couture" },
    { key: "heritage", label: "Heritage" },
    { key: "gemstone", label: "Gemstone" },
    { key: "bazaar", label: "Bazaar" },
    { key: "wooden", label: "Wooden Wonders" },
]

const PartnershipCard = memo(
    ({ category, index, is4K }: { category: (typeof partnershipCategories)[0]; index: number; is4K: boolean }) => (
        <motion.div
            className={`bg-[var(--secondary-color)] ${is4K ? "p-14" : "p-8"} rounded-lg border border-gray-700 hover:border-[var(--secondary-color)] transition-all duration-300`}
            whileHover={{ scale: 1.02 }}
        >
            <h3 className={`${is4K ? "text-4xl" : "text-2xl"} font-bold text-white mb-4`}>{category.label}</h3>
            <p className={`${is4K ? "text-xl" : "text-lg"} text-white mb-6`}>{category.summary}</p>
            <ul className="space-y-3 mb-8">
                {category.subItems.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-3 text-white">
                        <CheckCircle size={is4K ? 28 : 20} className="text-[var(--white)] flex-shrink-0" />
                        <Link
                            href={item.href}
                            className={`${is4K ? "text-lg" : "text-base"} hover:text-white transition-colors duration-200`}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <Link
                href={category.href}
                className={`inline-flex items-center gap-2 ${is4K ? "px-8 py-4 text-xl" : "px-6 py-3 text-lg"} bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--primary-hover-color)] transition-colors duration-300`}
            >
                Read More
                <ArrowRight size={is4K ? 28 : 20} />
            </Link>
        </motion.div>
    ),
)
PartnershipCard.displayName = "PartnershipCard"

const TabButton = memo(
    ({
        categoryKey,
        label,
        isActive,
        onClick,
    }: {
        categoryKey: string
        label: string
        isActive: boolean
        onClick: (key: string) => void
    }) => {
        const handleClick = useCallback(() => {
            onClick(categoryKey)
        }, [categoryKey, onClick])

        return (
            <button
                onClick={handleClick}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${isActive ? "bg-[var(--primary-color)] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
            >
                {label}
            </button>
        )
    },
)
TabButton.displayName = "TabButton"

export default function Home() {
    const [activeTab, setActiveTab] = useState<"buyer" | "vendor">("buyer")
    const [selectedCategory, setSelectedCategory] = useState("pashmina")

    const { is4K } = useGlobalContext()
    const { scrollYProgress } = useScroll()
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const handleTabChange = useCallback((tab: "buyer" | "vendor") => {
        setActiveTab(tab)
    }, [])

    const handleCategoryChange = useCallback((category: string) => {
        setSelectedCategory(category)
    }, [])

    const handlePrevCategory = useCallback(() => {
        setSelectedCategory((prev) => {
            const currentIndex = categoryTabs.findIndex((cat) => cat.key === prev)
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : categoryTabs.length - 1
            return categoryTabs[prevIndex].key
        })
    }, [])

    const handleNextCategory = useCallback(() => {
        setSelectedCategory((prev) => {
            const currentIndex = categoryTabs.findIndex((cat) => cat.key === prev)
            const nextIndex = currentIndex < categoryTabs.length - 1 ? currentIndex + 1 : 0
            return categoryTabs[nextIndex].key
        })
    }, [])

    const currentCategory = useMemo(() => categories[selectedCategory as keyof typeof categories], [selectedCategory])

    const currentSlides = useMemo(() => (activeTab === "buyer" ? buyerslides : vendorslides), [activeTab])

    return (
        <div className="min-h-screen bg-white overflow-x-hidden">
            <DKCHero />

            <div className="pb-10 lg:pb-20">
                <Homepage />
            </div>

            <div className="lg:pb-20">
                <ScrollSection features={scrollFeatures} />
            </div>

            <section className="px-2 md:px-6 lg:px-8 bg-white text-center pb-10 lg:pb-20">
                <AnimationCardGrid data={whatSetsUsApartCards} />
            </section>

            <section className={`bg-gray-100 text-left ${is4K ? "py-28 px-20" : "px-4"} py-20 lg:pb-20`}>
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
                            <PartnershipCard key={index} category={category} index={index} is4K={is4K} />
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
                <div className="text-center max-w-5xl mx-auto">
                    <h2
                        className={`text-4xl lg:text-5xl font-bold text-[var(--primary-color)] mb-4 ${is4K ? "2xl:text-6xl 2xl:mb-6" : ""
                            }`}
                    >
                        Our Business Network
                    </h2>

                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        Two-Way Pathways Grid
                    </h1>

                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed px-4">
                        A structured network connecting buyers and vendors through clear pathways
                        that enable trusted sourcing, transparent operations, and scalable growth
                        across global craft markets. Designed to empower buyers and vendors equally,
                        our pathways create reliable access, strengthen trade relationships, and
                        support sustainable expansion within international craft ecosystems. Our
                        network bridges buyers and vendors with coordinated pathways that simplify
                        trade, enhance visibility, reduce risk, and enable long-term commercial
                        success globally.
                    </p>
                </div>
                <div className="flex justify-center space-x-6 border-[var(--primary-color)] mt-8">
                    <button
                        onClick={() => handleTabChange("buyer")}
                        className={`py-3 px-6 font-bold text-2xl focus:outline-none rounded-md ${activeTab === "vendor"
                            ? "border-[var(--primary-color)] text-[var(--primary-color)]"
                            : "bg-gray-400 text-white"
                            }`}
                    >
                        Buyer
                    </button>
                    <button
                        onClick={() => handleTabChange("vendor")}
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
                        <Counter slides={currentSlides} />
                    </div>
                </section>
            </div>

            <div>
                <KashmirCraftsCarousel />
            </div>

            <div className="bg-white pt-10 pb-8 lg:pb-14 lg:pt-16 min-w-[280px]">
                <div className="text-center">
                    <h2
                        className={`text-4xl lg:text-5xl font-bold text-[var(--primary-color)] mb-4 ${is4K ? "2xl:text-6xl 2xl:mb-6" : ""}`}
                    >
                        Our Business Network
                    </h2>
                </div>

                <div className="px-4 mb-8">
                    <div className="hidden md:flex justify-center flex-wrap gap-3">
                        {categoryTabs.map((item) => (
                            <TabButton
                                key={item.key}
                                categoryKey={item.key}
                                label={item.label}
                                isActive={selectedCategory === item.key}
                                onClick={handleCategoryChange}
                            />
                        ))}
                    </div>

                    <div className="md:hidden flex items-center justify-between gap-4">
                        <button
                            onClick={handlePrevCategory}
                            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                            aria-label="Previous category"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <div className="flex-1 text-center">
                            <span className="px-6 py-3 rounded-lg font-semibold bg-[var(--primary-color)] text-white inline-block">
                                {categoryTabs.find((cat) => cat.key === selectedCategory)?.label}
                            </span>
                        </div>
                        <button
                            onClick={handleNextCategory}
                            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                            aria-label="Next category"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="px-4 max-w-6xl mx-auto">
                    <motion.div
                        key={selectedCategory}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8"
                    >
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">

                            {/* Logo */}
                            <div className="flex-shrink-0 w-full md:w-80">
                                <img
                                    src={currentCategory.logo}
                                    alt={currentCategory.title}
                                    className="w-full h-48 sm:h-56 md:h-100 object-cover md:object-contain rounded-lg"
                                />
                                F
                            </div>

                            {/* Text */}
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl md:text-3xl font-bold text-[var(--primary-color)] mb-2">
                                    {currentCategory.title}
                                </h3>
                                <p className="text-lg md:text-xl text-gray-700 mb-2 italic font-semibold">
                                    {currentCategory.subtitle}
                                </p>
                                <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
                                    {currentCategory.description}
                                </p>
                            </div>

                        </div>
                    </motion.div>

                </div>

            </div>

            <div>
                <Location />
            </div>
        </div>
    )
}
