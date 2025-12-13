

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useGlobalContext } from "@/context/ScreenProvider"

const defaultSlides = [
  {
    id: 0,
    title: "DKC B2B Connect Portal",
    subtitle: "Kashmir Crafts Connecting Global Buyers",
    primaryButton: {
      text: "Explore Partnerships",
      link: "#start",
    },
    secondaryButton: {
      text: "Join As Buyer",
      link: "#join",
    },
  },
  {
    id: 1,
    title: "Discover Amazing Experiences",
    subtitle: "Unleash your potential with our innovative solutions",
    primaryButton: {
      text: "Get Started",
      link: "#",
    },
    secondaryButton: {
      text: "Watch Demo",
      link: "#demo",
    },
  },
  {
    id: 2,
    title: "Transform Your Business",
    subtitle: "Built With Artisans",
    primaryButton: {
      text: "Learn More",
      link: "#learn",
    },
    secondaryButton: {
      text: "View Case Studies",
      link: "#cases",
    },
  },


]

export default function VerticalHeroSlider({ slides = defaultSlides, isBanner = false }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { is4K: is4k } = useGlobalContext()
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000000)
    return () => clearInterval(timer)
  }, [slides.length])

  const getSlideOffset = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return currentSlide * 60
      if (window.innerWidth < 1024) return currentSlide * 75
      return currentSlide * 100
    }
    return currentSlide * 100
  }

  return (
    <div className={`relative w-full overflow-hidden mt-20 bg-[#e5e5e5] ${!is4k ? "h-[60vh] sm:h-[75vh] lg:h-[80vh]" : "h-[65vh]"}`}>
      <motion.div
        className="flex flex-col w-full"
        animate={{ y: `-${getSlideOffset()}vh` }}
        transition={{
          duration: 2,
          ease: [0.25, 0.1, 0.25, 1],
          type: "tween",
        }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative w-full h-[60vh] sm:h-[75vh] lg:h-screen flex-shrink-0">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
             
            >
              <div className="absolute inset-0" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4 sm:px-6 lg:px-8 max-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-[1800px] mx-auto">
              <motion.h1
                className="text-xl md:text-6xl font-bold leading-tight mt-4 lg:-mt-25 text-[#0d1308]"
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: currentSlide === index ? 1 : 0,
                  y: currentSlide === index ? 0 : 50,
                }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {slide.title}
              </motion.h1>
              <motion.h1
                className="flex text-xl md:text-4xl font-bold leading-tight text-[var(--secondary-color)]"
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: currentSlide === index ? 1 : 0,
                  y: currentSlide === index ? 0 : 50,
                }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {slide.subtitle}
              </motion.h1>


              <motion.p
                className="text-sm sm:text-md md:text-2xl lg:font-bold opacity-90 max-w-4xl leading-relaxed mb-6 lg:mb-8 mt-2 text-[#0d1308]"
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: currentSlide === index ? 0.9 : 0,
                  y: currentSlide === index ? 0 : 30,
                }}
                transition={{ duration: 1.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Authentic sourcing through verified artisans.

              </motion.p>

              <motion.div
                className={`flex flex-col sm:flex-row gap-4 mt-1 lg:mt-6 ${isBanner ? "lg:mb-65" : "mb-4"}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: currentSlide === index ? 1 : 0,
                  y: currentSlide === index ? 0 : 30,
                }}
                transition={{ duration: 1.5, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <a
                  href={slide.primaryButton.link}
                  className="bg-[var(--secondary-color)] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-[var(--secondary-hover-color)] transition-colors duration-300"
                >
                  {slide.primaryButton.text}
                </a>
                <a
                  href={slide.secondaryButton.link}
                  className="border-2 border-[var(--secondary-color)] text-[var(--secondary-color)] px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-white hover:text-black transition-colors duration-300"
                >
                  {slide.secondaryButton.text}
                </a>
              </motion.div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Indicators */}
      <div className="absolute right-3 sm:right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col space-y-2 sm:space-y-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-[var(--primary-color)] scale-125" : "bg-[var(--primary-hover-color)] hover:bg-[var(--secondary-color)"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-3 sm:left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] text-white p-1.5 sm:p-2 lg:p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute left-3 sm:left-4 lg:left-8 top-1/2 transform translate-y-6 sm:translate-y-8 z-20 bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] text-white p-1.5 sm:p-2 lg:p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  )
}
