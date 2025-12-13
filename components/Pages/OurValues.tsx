"use client";
import { useGlobalContext } from "@/context/ScreenProvider";
import { AnimationCardGrid } from "@/components/Cards/AnimationCard";
import { FlipCard } from "@/components/Cards/FlipCard";
import VerticalHeroSlider from "@/components/Essentials/VerticalBanner";
import PartnershipModel from "@/components/Essentials/PartnershipModel";
import {
  Star,
  Globe,
  Target,
  Heart,
  Zap,
  Users,
  Leaf,
  Cpu,
  Snowflake,
  ShieldCheck,
  Handshake,
  Sparkles,
  Sun,
  Cloud,
  Package,
  GalleryVertical,
  Building,
  Store,
  Network,
  Gem,
  Boxes,
  Gavel,
  Tag,
  PenTool,
  Video,
  GraduationCap,
  Lightbulb,
  Coins,
  Library,
  BarChart
} from "lucide-react";
import DiagonalSection from "@/components/Section/DiagonalSection";
import OurVision from "@/components/Essentials/OurVision";
import EthicalSourcingSustainability from "@/components/Essentials/EthicalSourcing";

export default function OurValue() {
  const { is4K } = useGlobalContext();
  // Default data if no props are passed
  const coreTradeModels = [
    {
      model: "DropShipping/Ecommerce",
      subtitle: "Zero-inventory model for small resellers",
      purpose:
        "Sell products without stocking inventory. Vendors ship directly to customers, making it ideal for online resellers and beginners.",
      icon: Package
    },
    {
      model: "Consignment",
      subtitle: "Risk-free retail listing",
      purpose:
        "Place products in stores/platforms and pay vendors only after a sale. Perfect for testing market demand without upfront cost.",
      icon: Store
    },
    {
      model: "Import Export",
      subtitle: "Global sourcing with compliance",
      purpose:
        "Facilitate cross-border trade with certified and documented crafts. Ideal for expanding authentic Kashmiri goods internationally.",
      icon: Globe
    },
    {
      model: "Wholesale & Distribution",
      subtitle: "Bulk orders for resale",
      purpose:
        "Purchase large quantities at discounted rates for resale in retail chains, marketplaces, or hospitality outlets.",
      icon: Boxes
    },
  ];
  
  const growthExpansionModels = [
    {
      model: "Exhibition",
      subtitle: "Event-based exposure for vendors",
      purpose:
        "Participate in trade shows or cultural expos to showcase products, connect with buyers, and boost brand recognition.",
      icon: GalleryVertical,
    },
    {
      model: "Auction & Bidding",
      subtitle: "Premium crafts via bidding",
      purpose:
        "Sell high-value or rare crafts through a bidding process, creating exclusivity and competitive pricing opportunities.",
      icon: Gavel,
    },
    {
      model: "White-Label",
      subtitle: "Private-label branding",
      purpose:
        "Rebrand artisan-made products under your own label while maintaining ethical sourcing and production integrity.",
      icon: Tag,
    },
    {
      model: "Brick & Mortar",
      subtitle: "Retail shelf partnership",
      purpose:
        "Offer physical retail space for artisan products, increasing visibility and encouraging customer engagement.",
      icon: Building,
    },
  ];
  
  const creativeModels = [
    {
      model: "Design Collaboration",
      subtitle: "Co-create new product lines",
      purpose:
        "Work directly with artisans to create custom designs or seasonal collections that reflect shared creativity.",
      icon: PenTool,
    },
    {
      model: "Storytelling & Media",
      subtitle: "Craft-focused media creation",
      purpose:
        "Produce visual or written content showcasing artisan stories to strengthen brand image and customer connection.",
      icon: Video,
    },
    {
      model: "Warehouse",
      subtitle: "Vendor training and guidance",
      purpose:
        "Provide storage, logistics, and operational support for artisan goods, streamlining inventory management.",
      icon: GraduationCap,
    },
    {
      model: "Packaging",
      subtitle: "Support craft innovation",
      purpose:
        "Enhance product presentation with high-quality, sustainable, and brand-aligned packaging solutions.",
      icon: Lightbulb,
    },
  ];
  
  const institutionalModels = [
    {
      model: "Logistics",
      subtitle: "Equity and infra for scale",
      purpose:
        "Offer transportation, supply chain solutions, and infrastructure to ensure efficient product movement and delivery.",
      icon: Coins,
    },
    {
      model: "Museum/Institutional",
      subtitle: "Cultural-grade sourcing",
      purpose:
        "Acquire heritage-grade crafts for preservation, exhibition, and educational purposes in cultural institutions.",
      icon: Library,
    },
    {
      model: "NGO & Government",
      subtitle: "Public good procurement",
      purpose:
        "Partner with public and nonprofit entities to source crafts for social impact, development goals, and community projects.",
      icon: ShieldCheck,
    },
    {
      model: "Technology Partnership",
      subtitle: "Data-driven traceability",
      purpose:
        "Integrate technology for tracking production, quality, and sustainability metrics to ensure transparency and trust.",
      icon: BarChart,
    },
  ];
  

  const whatSetsUsApartCards = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Real Craft",
      description:
        "Every item is tracked on blockchain, ensuring genuine Kashmiri craftsmanship and trusted quality for every buyer worldwide.",
      buttonText: "READ MORE",
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "Fair Trade",
      description:
        "Artisans are paid fairly and work in ethical, sustainable conditions, preserving Kashmiri traditions through honest practices.",
      buttonText: "READ MORE",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description:
        "Our platform links skilled Kashmiri creators with buyers worldwide, growing markets and sustaining handcrafted excellence.",
      buttonText: "READ MORE",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Skill Growth",
      description:
        "We provide guidance, mentorship, and training so artisans adapt, thrive, and build sustainable futures in global markets.",
      buttonText: "READ MORE",
    },
  ];

  const cards = [
    {
      title: "Preserving Heritage",
      description: "Keeping alive Kashmir’s timeless handcraft legacy",
      detailedDescription:
        "De Koshur Crafts safeguards the intricate artistry of Kashmir by preserving its designs and cultural traditions. We ensure these crafts remain relevant and accessible worldwide, empowering artisans to share their heritage on a global stage and keep it thriving for generations.",
      icon: Sparkles,
    },
    {
      title: "Empowering Artisans",
      description: "Providing tools and support for every artisan",
      detailedDescription:
        "At De Koshur Crafts, artisans are at the core of our mission. We provide fair compensation, access to buyers, and training on modern business practices. Through a direct-to-buyer model, we remove intermediaries, ensuring artisans receive recognition and lasting growth.",
      icon: Users,
    },
    {
      title: "Sustainable Ethics",
      description: "Green fair trade methods trusted worldwide",
      detailedDescription:
        "Sustainability drives every step of our work. We help artisans adopt eco‑friendly methods, reduce waste, and uphold ethical trade standards. Every craft sold reflects fair pay, safe conditions, and a commitment to building a responsible, high‑quality marketplace for all.",
      icon: Leaf,
    },
    {
      title: "Technology Craftwork",
      description: "Modern tech empowers authentic craftsmanship",
      detailedDescription:
        "We use modern technology to connect tradition with innovation. Blockchain ensures authenticity and traceability, while AI tools assist artisans in scaling production and managing inventory. This fusion of heritage and tech makes Kashmiri crafts efficient, transparent, and globally accessible.",
      icon: Cpu,
    },
  ];

  return (
    <main className="min-h-screen w-full text-white overflow-x-hidden">
      <section className="relative z-10">
        <VerticalHeroSlider />
      </section>

      <section className={`${is4K ? "mt-52" : "mt-30 lg:mt-20"}`}>
        <DiagonalSection
          subtitle="WELCOME TO B2B CONNECT USA"
          title="Empowering Kashmiri Artisans, Startups in Accessing American"
          highlight="Markets"
          description="At De Koshur Crafts B2B Connect, our mission transcends the typical e-commerce experience.We believe that authentic Kashmiri craftsmanship deserves global respect, recognition, and reach.Our platform empowers artisans, preserves heritage crafts, and connects them to international markets through sustainable, fair trade practices and innovation."
          steps={[
            "Honor It: Celebrate Kashmir’s craft legacy while scaling with next-gen trade tools like blockchain, digital ledgers, and carbon scorecards.",
            "Preserve It: Protect authentic crafts, Pashmina, Kani weaving, Papier Mâché, and woodwork, with full traceability and GI tagging.",
            "Empower It: Provide vendors with smart pricing engines, training dashboards, and global buyer APIs, cutting out intermediaries.",
            "Share It: Use AI-driven catalogs, virtual hubs, and global logistics to bring Kashmir’s story across America.",
          ]}
          footerHeadline="Crafting a Borderless Platform Rooted in Legacy"
          footerDescription="Empowering Artisans | Preserving Culture | Advancing Ethical Innovation"
          mainImage="/images/new-pic6.webp"
          smallImage="/images/new-pic4.webp"
        />
      </section>

      <section
        className={`${
          is4K
            ? "py-24 px-28 mx-10"
            : "sm:py-4 md:py-8 lg:py-10 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-20 mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10"
        }`}
      >
        <h2
          className={`text-center ${
            is4K
              ? "text-7xl mb-20"
              : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl sm:mb-2 md:mb-4 lg:mb-6"
          } drop-shadow-md text-[var(--primary-color)] font-bold leading-tight`}
        >
          Our Values
        </h2>

        <div className="flex justify-center">
          <section
            className={`w-full ${
              is4K ? "max-w-[1800px] py-32" : "max-w-6xl py-4 md:py-10 lg:py-12"
            }`}
          >
            <div
              className={`${
                is4K ? "gap-12" : "gap-8"
              } grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`}
            >
              {cards.map((card, index) => (
                <FlipCard key={index} {...card} />
              ))}
            </div>
          </section>
        </div>
      </section>

      <section
        className={`px-2 ${
          is4K ? "py-32" : "py-16"
        } md:px-6 lg:px-8 bg-white text-center`}
      >
        <h2
          className={`${
            is4K ? "text-7xl mb-20" : "text-3xl md:text-4xl lg:text-5xl mb-12"
          } font-bold text-[var(--primary-color)]`}
        >
          What Sets Us Apart
        </h2>
        <AnimationCardGrid data={whatSetsUsApartCards} />
      </section>

      <section>
        <PartnershipModel
          title="Core Trade Partnerships"
          subtitle="Entry-level sourcing tiers for verified vendor access."
          models={coreTradeModels}
        />
        <PartnershipModel
          title="Growth & Brand Expansion Partnerships"
          subtitle="For buyers amplifying artisan exposure and market reach."
          models={growthExpansionModels}
        />
        <PartnershipModel
          title="Creative & Collaborative Partnerships"
          subtitle="Empowering artisans through co-creation and storytelling."
          models={creativeModels}
        />
        <PartnershipModel
          title="Institutional & Strategic Partnerships"
          subtitle="For buyers creating systemic uplift and public value."
          models={institutionalModels}
        />
      </section>

      <section className={`${is4K ? "px-40" : "px-4 xl:px-0"}`}>
        <OurVision />
      </section>

      <section>
        <EthicalSourcingSustainability />
      </section>
    </main>
  );
}
