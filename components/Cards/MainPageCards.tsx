import type React from "react";
import {
  CheckCircle,
  AlertTriangle,
  Globe,
  Truck,
  Shield,
  DollarSign,
  Megaphone,
  Award,
  Network,
  Recycle,
  Lock,
} from "lucide-react";

export default function MainPageCards() {
  const solutions = [
    {
      icon: Globe,
      title: "US Handicraft Market Access",
      challenge:
        "Limited international entry for artisans reduces visibility and opportunity.",
      benefit:
        "De Koshur Crafts enables global visibility through e-commerce, exhibitions, and retail partnerships, connecting artisans to U.S. buyers.",
      color: "text-[var(--secondary-color)]",
    },
    {
      icon: Truck,
      title: "Infrastructure Challenges Solved",
      challenge:
        "Small businesses face obstacles in logistics, warehousing, and customs processes.",
      benefit:
        "De Koshur Crafts manages logistics end-to-end, ensuring seamless U.S. access so artisans can focus fully on craftsmanship.",
      color: "text-[var(--secondary-color)]",
    },
    {
      icon: Shield,
      title: "Ethical Standards Simplified",
      challenge:
        "Meeting global compliance, sustainability, and fair-trade standards is difficult for artisans.",
      benefit:
        "De Koshur Crafts ensures products follow global ethics requirements, strengthening sourcing credibility and international trust.",
      color: "text-[var(--secondary-color)]",
    },
    {
      icon: DollarSign,
      title: "Financial Risks Minimized",
      challenge:
        "High upfront costs for marketing, distribution, and international expansion.",
      benefit:
        "De Koshur Crafts offers flexible models like consignment, reducing financial risk and increasing global exposure.",
      color: "text-[var(--secondary-color)]",
    },
    {
      icon: Megaphone,
      title: "Branding and Marketing",
      challenge:
        "Building brand recognition in global markets is challenging for small producers.",
      benefit:
        "De Koshur Crafts provides branding tools, marketing platforms, and promotional opportunities to elevate product visibility.",
      color: "text-[var(--secondary-color)]",
    },
    {
      icon: Award,
      title: "Quality Improvement Resources",
      challenge:
        "Meeting international quality and packaging standards can be resource-intensive.",
      benefit:
        "De Koshur Crafts offers quality tools, expert photography, and eco-friendly packaging to help artisans compete globally.",
      color: "text-[var(--secondary-color)]",
    },
    {
      icon: Network,
      title: "Industry Network Access",
      challenge:
        "Artisans lack access to high-value networks and industry-leading buyers.",
      benefit:
        "De Koshur Crafts links artisans to strategic networks, opening doors to key markets and new opportunities.",
      color: "text-[var(--secondary-color)]",
    },
    {
      icon: Recycle,
      title: "Sustainable Business Models",
      challenge:
        "Seasonal demand and limited diversification restrict long-term stability.",
      benefit:
        "De Koshur Crafts provides diversified models—from e-commerce to franchising—ensuring sustainable growth for artisans.",
      color: "text-[var(--secondary-color)]",
    },
    {
      icon: Lock,
      title: "Counterfeit Product Protection",
      challenge:
        "Risk of counterfeits, misrepresentation, and loss of product authenticity.",
      benefit:
        "De Koshur Crafts protects authenticity using blockchain verification, ensuring only genuine products reach global customers.",
      color: "text-[var(--secondary-color)]",
    },
  ];


  return (
    <div
      className="px-3 sm:px-4 md:px-6 lg:px-8 bg-gray-100 py-8 lg:py-20"

    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-color)] mb-2 sm:mb-4 px-4">
            Why You Need De Koshur Crafts Partnerships
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mx-auto px-4 leading-relaxed">
            Empowering Kashmiri artisans through modern solutions that link traditional craftsmanship with global market access.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden )]"
              >
                {/* Card Header */}
                <div className="p-4 sm:p-5 md:p-6 pb-3 sm:pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3 sm:mb-4">
                    <div className="flex items-center gap-3"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="p-2 sm:p-2.5 rounded-lg flex-shrink-0">
                      <IconComponent
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${solution.color}`}
                      />
                    </div>
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-[var(--primary-color)] leading-tight">
                      {solution.title}
                    </h2>
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 space-y-4 sm:space-y-5">
                  {/* Challenge Section */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-800 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-red-800 uppercase tracking-wide">
                        Challenge
                      </span>
                    </div>
                    <div className="pl-5 sm:pl-6 border-l-2 border-[var(--secondary-color)]">
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {solution.challenge}
                      </p>
                    </div>
                  </div>

                  {/* Benefit Section */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--secondary-color)] flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-[var(--secondary-color)] uppercase tracking-wide">
                        Solution
                      </span>
                    </div>
                    <div className="pl-5 sm:pl-6 border-l-2 border-[var(--primary-color)] border-opacity-30">
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        {solution.benefit}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-hover-color)] opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl sm:rounded-2xl pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
