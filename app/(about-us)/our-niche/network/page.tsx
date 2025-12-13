'use client'
import VerticalHeroSlider from '@/components/Essentials/VerticalBanner'
import React from 'react'
import { useGlobalContext } from '@/context/ScreenProvider';

function page() {
  const { is4K } = useGlobalContext();

  const items = [
     {
      image: "/logos/dekoshur.png",
      title: "De Koshur Crafts",
      description:
        "A multi-vendor, headless e-commerce platform powered by American business strategy and modern technology — bridging Kashmiri craftsmanship with global markets through blockchain traceability, fair-value trade, and innovation-driven authenticity.",
      link: "https://dekoshur.org",
    },
    {
      image: "/logos/craftlore.png",
      title: "Craftlore",
      description:
        "A non-commercial digital intelligence platform preserving Kashmir’s 700-year craft heritage through geo-certification, blockchain traceability, carbon tracking, and fair-value pricing — eliminating middlemen and empowering artisans with authenticity and transparency.",
      link: "https://craftlore.org",
    },
    {
      image: "/logos/artstay.png",
      title: "ArtStay",
      description:
        "A Kashmir Craft & Tourism Convergence Marketplace connecting travelers with artisan-led stays, craft safaris, eco-retreats, dining voyages, and cultural workshops — transforming tourism into a craft-sustaining movement that preserves heritage and empowers communities.",
      link: "https://artstay.org",
    },
   
    {
      image: "/logos/sufi.png",
      title: "Sufi Science Center",
      description:
        "A faith-based e-commerce and knowledge platform merging spirituality with craftsmanship — rooted in Kashmir’s Sufi heritage and connecting sacred wisdom, ethical commerce, and digital innovation for a conscious global community.",
      link: "https://sufisciencecenter.org",
    },
    {
      image: "/logos/prime.png",
      title: "Prime Logic Solutions",
      description:
        "A technology-driven company delivering smart digital solutions that accelerate innovation, efficiency, and global growth — powering Kashmir’s craft ecosystem through software, web development, automation, and digital marketing excellence.",
      link: "https://primelogicsolutions.org",
    },
    {
      image: "/logos/kashmir.png",
      title: "Hamadan Craft Revival Foundation",
      description:
        "Kashmir’s first handicraft policy think tank advancing research, governance, and advocacy — driving policy insights, certifications, and grants that strengthen sustainability, transparency, and global recognition of Kashmir’s craft legacy.",
      link: "https://khcrf.org",
    },
  ];

  return (
    <div>
      <VerticalHeroSlider />
      <section
        className={`px-4 md:px-8 lg:px-12 py-20 bg-white ${is4K ? "2xl:py-32" : ""}`}
      >
        <div
          className={`max-w-7xl mx-auto ${is4K ? "2xl:max-w-[2000px]" : ""}`}
        >
          <h2
            className={`text-4xl lg:text-5xl font-bold text-center mb-4 text-[color:var(--primary-color)] ${is4K ? "2xl:text-6xl" : ""}`}
          >
            Our Network
          </h2>
          <p
            className={`text-center text-lg text-[color:var(--secondary-color)] mb-16 max-w-3xl mx-auto ${is4K ? "2xl:text-xl 2xl:mb-20" : ""}`}
          >
            Each piece represents centuries of perfected tradition and cultural heritage
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div
                  className="bg-gradient-to-br from-[color:var(--primary-color)] to-[color:var(--primary-hover-color)] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between h-full"
                >
                  <div>
                    <div
                      className={`w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 mx-auto overflow-hidden ${is4K ? "2xl:w-24 2xl:h-24 2xl:mb-8" : ""}`}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <h3
                      className={`text-2xl font-bold text-white mb-4 text-center h-16 flex items-center justify-center ${is4K ? "2xl:text-3xl 2xl:h-20" : ""}`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-gray-200 text-left md:text-center lg:text-center leading-relaxed ${is4K ? "2xl:text-lg" : ""}`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default page
