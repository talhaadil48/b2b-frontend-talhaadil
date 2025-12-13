import VerticalHeroSlider from "@/components/Essentials/VerticalBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <VerticalHeroSlider />
      {/* First Section - Video on Right */}
      <div className="mb-2 lg:mb-4 mt-20 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--primary-color)] mb-4">
          Certified for Success
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
          Building Trust, Unlocking Markets, Empowering Growth Globally
        </p>
      </div>
      <section className="py-16 px-10 max-w-7xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12">
          {/* Content Area */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 h-fit">
              <div className="bg-[var(--secondary-light-color)] p-4 sm:p-6 rounded-lg border-l-4 border-[var(--secondary-color)]">
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--primary-color)] mb-3">
                  Product Credibility
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Certifications validate quality, authenticity, origin, and
                  global compliance standards.
                </p>
              </div>

              <div className="bg-[var(--secondary-light-color)] p-4 sm:p-6 rounded-lg border-l-4 border-[var(--secondary-color)]">
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--primary-color)] mb-3">
                  Market Access
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Certified products unlock premium global markets and verified
                  trade opportunities.
                </p>
              </div>

              <div className="bg-[var(--secondary-light-color)] p-4 sm:p-6 rounded-lg border-l-4 border-[var(--secondary-color)]">
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--primary-color)] mb-3">
                  Competitive Edge
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Recognized certifications enhance reputation, reliability, and
                  global business differentiation.
                </p>
              </div>

              <div className="bg-[var(--secondary-light-color)] p-4 sm:p-6 rounded-lg border-l-4 border-[var(--secondary-color)]">
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--primary-color)] mb-3">
                  Customer Trust
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Verified quality assurance builds transparency, loyalty, and
                  long-term buyer confidence.
                </p>
              </div>

              <div className="bg-[var(--secondary-light-color)] p-4 sm:p-6 rounded-lg border-l-4 border-[var(--secondary-color)]">
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--primary-color)] mb-3">
                  Sustainability Edge
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Certified eco-practices attract conscious buyers and promote
                  ethical global commerce.
                </p>
              </div>

              <div className="bg-[var(--secondary-light-color)] p-4 sm:p-6 rounded-lg border-l-4 border-[var(--secondary-color)]">
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--primary-color)] mb-3">
                  Growth Potential
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Certification drives expansion through partnerships,
                  scalability, and new market access.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg flex-1">
              <video
                className="w-full h-full object-fill"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section - Video on Left */}
      <div className="mb-2 lg:mb-4 text-center mt-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--primary-color)] mb-4">
          Empowering Global Growth
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
          Unlock markets, build trust, and elevate success
        </p>
      </div>
      <section className="py-16 px-10 max-w-7xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1 order-2 lg:order-1">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg h-full">
              <video
                className="w-full h-full object-fill"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/4.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 h-fit">
              <div className="bg-white p-4 sm:p-6 rounded-lg border-l-4 border-[var(--secondary-color)] shadow-sm">
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--primary-color)] mb-3">
                  Global Access
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Expand your reach and unlock premium global market
                  opportunities.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg border-l-4 border-[var(--secondary-color)] shadow-sm">
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--primary-color)] mb-3">
                  Enhanced Credibility
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Boost trust, strengthen reputation, and elevate your brand
                  globally.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg border-l-4 border-[var(--secondary-color)] shadow-sm">
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--primary-color)] mb-3">
                  Strategic Networks
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Forge impactful partnerships and thrive within influential
                  business circles.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg border-l-4 border-[var(--secondary-color)] shadow-sm">
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--primary-color)] mb-3">
                  Sales Acceleration
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Drive demand consistently and amplify your revenue potential
                  exponentially.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg border-l-4 border-[var(--secondary-color)] shadow-sm">
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--primary-color)] mb-3">
                  Industry Insights
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Stay ahead with knowledge of trends, innovation, and
                  opportunity.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg border-l-4 border-[var(--secondary-color)] shadow-sm">
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--primary-color)] mb-3">
                  Brand Empowerment
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Strengthen presence, inspire confidence, and achieve
                  sustainable business growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Final Section - Free Certification Help Card */}
      <section className="py-16 px-6 sm:px-10 flex justify-center">
        <div className="max-w-3xl w-full bg-[var(--primary-color)] border border-[var(--secondary-color)] rounded-2xl shadow-lg p-8 sm:p-10 text-center transition-transform duration-300 hover:scale-[1.02]">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Free Certification Help
          </h2>
          <p className="text-white text-base sm:text-lg mb-6 leading-relaxed">
            Don’t use our certifications? We’ll help you earn yours — free consultation,
            requirement mapping, paperwork, audits, and liaison until final approval.
          </p>
          <a
            href="https://khcrf.org/business_certification_evaluation.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[var(--secondary-color)] text-white font-medium px-6 py-3 rounded-full hover:bg-[var(--primary-color)] transition-colors"
          >
            Get My Certification →
          </a>
        </div>
      </section>

    </div>
  );
}
