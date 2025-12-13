"use client"

import type React from "react"
import { useEffect, useState, useMemo, memo } from "react"
import Link from "next/link"
import { FiLock } from "react-icons/fi"
import { X, ChevronRight, ChevronDown, Lock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { UserProfileDisplay } from "./UserProfileDisplay"
import Cookies from "js-cookie"
import { useAuthentication } from "@/context/AuthenticationWrapper"
import Image from "next/image"
import { getUserProfile } from "@/services/admin"


// Reusable Lock-Protected Link Component
const LockedLink = memo(
  ({
    href,
    children,
    isSignedIn,
    onClick,
    className = "",
    showLock = true,
  }: {
    href: string
    children: React.ReactNode
    isSignedIn: boolean
    onClick?: (e: React.MouseEvent) => void
    className?: string
    showLock?: boolean
  }) => {
    const router = useRouter()
    const [showTooltip, setShowTooltip] = useState(false)

    const handleClick = (e: React.MouseEvent) => {
      if (!isSignedIn) {
        e.preventDefault()
        setShowTooltip(true)
        setTimeout(() => setShowTooltip(false), 3000) // Auto hide
      } else if (onClick) {
        onClick(e)
      }
    }

    return (
      <div className="relative inline-block">
        <Link
          href={isSignedIn ? href : "#"}
          onClick={handleClick}
          className={`${className} ${!isSignedIn && showLock ? "flex items-center gap-2" : ""}`}
        >
          {children}
          {!isSignedIn && showLock && <FiLock size={14} />}
        </Link>

        <AnimatePresence>
          {showTooltip && !isSignedIn && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-4 py-3 bg-white text-[var(--primary-color)] text-sm rounded-lg shadow-lg z-50 border border-gray-200 whitespace-nowrap"
            >
              <p className="text-center mb-2">First you need to register</p>
              <button
                onClick={() => router.push("/login")}
                className="text-[var(--secondary-color)] underline hover:text-[var(--secondary-hover-color)] text-xs"
              >
                Click here to login
              </button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent border-b-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

LockedLink.displayName = "LockedLink"

// Desktop Dropdown
const DesktopDropdown = memo(({ title, items, isSignedIn }: { title: string; items: any[]; isSignedIn: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)
  const isLocked = title.toLowerCase() === "partnerships" && !isSignedIn

  return (
    <div
      className="relative"
      onMouseEnter={() => !isLocked && setIsOpen(true)}
      onMouseLeave={() => !isLocked && setIsOpen(false)}
    >
      <LockedLink href="#" isSignedIn={!isLocked} className="flex items-center gap-2 py-2 text-white text-md font-medium relative">
        {title}
        <span className="absolute bottom-0 left-0 w-full h-1 bg-[var(--secondary-hover-color)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      </LockedLink>

      <AnimatePresence>
        {isOpen && !isLocked && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 mt-2 w-56 bg-white shadow-xl rounded-lg py-2 z-50"
          >
            {items.map((item, i) =>
              item.subItems ? (
                <SubMenu key={i} item={item} />
              ) : (
                <Link
                  key={i}
                  href={item.href}
                  className="block px-6 py-3 text-gray-800 hover:bg-gray-100 hover:text-[var(--primary-color)]"
                >
                  {item.label}
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

const SubMenu = memo(({ item }: { item: any }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative group" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div className="flex items-center justify-between px-6 py-3 text-gray-800 hover:bg-gray-100 cursor-default">
        {item.label}
        <ChevronRight className="w-4 h-4" />
      </div>
      <AnimatePresence>
        {open && item.subItems && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute left-full top-0 w-56 bg-white shadow-xl rounded-lg py-2"
          >
            {item.subItems.map((sub: any, i: number) => (
              <Link
                key={i}
                href={sub.href}
                className="block px-6 py-3 text-gray-800 hover:bg-gray-100 hover:text-[var(--primary-color)]"
              >
                {sub.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

// Mobile Menu Components
const MobileMenuItem = memo(({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <Link
    href={href}
    onClick={onClick}
    className="flex items-center px-6 py-4 text-white text-lg hover:bg-white/10 rounded-lg mx-4"
  >
    {children}
  </Link>
))

const MobileDropdownMenu = memo(
  ({ title, items, onLinkClick, isSignedIn }: { title: string; items: any[]; onLinkClick?: () => void; isSignedIn: boolean }) => {
    const [open, setOpen] = useState(false)
    const isLocked = title.toLowerCase() === "partnerships" && !isSignedIn
    const router = useRouter()

    return (
      <div>
        <button
          onClick={() => !isLocked && setOpen(!open)}
          className="w-full flex items-center justify-between px-6 py-4 text-white text-lg hover:bg-white/10 rounded-lg mx-4"
        >
          <span className="flex items-center gap-2">
            {title}
            {isLocked && <FiLock size={16} />}
          </span>
          <ChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {open && !isLocked && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <div className="py-2 bg-white/5 rounded-lg mx-6">
                {items.map((item, i) =>
                  item.subItems ? (
                    <MobileSubMenu key={i} item={item} onLinkClick={onLinkClick} />
                  ) : (
                    <MobileMenuItem key={i} href={item.href} onClick={onLinkClick}>
                      <ChevronRight className="w-4 h-4 mr-3" />
                      {item.label}
                    </MobileMenuItem>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isLocked && open && (
          <div className="mx-6 mt-2 p-4 bg-white/10 rounded-lg text-center text-sm">
            <p>Please register to access</p>
            <button onClick={() => router.push("/login")} className="underline text-[var(--secondary-color)] mt-1">
              Login here
            </button>
          </div>
        )}
      </div>
    )
  }
)

const MobileSubMenu = memo(({ item, onLinkClick }: { item: any; onLinkClick?: () => void }) => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-8 py-3 text-white/90 hover:bg-white/10 rounded-lg"
      >
        {item.label}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
            {item.subItems.map((sub: any, i: number) => (
              <MobileMenuItem key={i} href={sub.href} onClick={onLinkClick}>
                <ChevronRight className="w-3 h-3 mr-3" />
                {sub.label}
              </MobileMenuItem>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userName, setUserName] = useState("John Doe")
  const [userRole, setUserRole] = useState<string | undefined>(undefined)

  const { handleLogout } = useAuthentication()
  const router = useRouter()

  const level = Cookies.get("registration_step")
  const isRegistered = Cookies.get("is_registered") === "APPROVED"

  // Fetch user once
  useEffect(() => {
    const initUser = async () => {
      const token = Cookies.get("access_token")
      const role = Cookies.get("user_role")
      setUserRole(role)

      if (token) {
        try {
          const profile = await getUserProfile()
          setUserName(profile?.data?.username || "User")
          setIsSignedIn(true)
        } catch (err) {
          setIsSignedIn(false)
        }
      } else {
        setIsSignedIn(false)
      }
    }
    initUser()
  }, [])

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const aboutItems = useMemo(
    () => [
      {
        label: "Our Brand",
        href: "#",
        subItems: [
          { label: "Story", href: "/our-brand/brand-story" },
          { label: "Credentials", href: "/our-brand/brand-credentials" },
        ],
      },
      {
        label: "Our Niche",
        href: "#",
        subItems: [
          { label: "Location", href: "/our-niche/location" },
          { label: "Business", href: "/our-niche/business" },
          { label: "Network", href: "/our-niche/network" },
          { label: "Product", href: "/our-niche/product" },
        ],
      },
      { label: "Our Mission", href: "/our-mission" },
      { label: "Our Values", href: "/our-values" },
      { label: "Our Team", href: "/our-team" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
    []
  )

  const partnershipItems = useMemo(() => {
    const isBuyer = userRole === "buyer"
    const coreTradeLabel = isBuyer ? "Export" : "Import"
    const institutionalLastLabel = isBuyer ? "NGO Supplier" : "NGO Buyer"

    return [
      {
        label: "Core Trade",
        href: "/core-trade",
        subItems: [
          { label: isBuyer ? "Drop Shipping" : "E-Commerce", href: "/core-trade/dropshipping-ecommerce" },
          { label: "Consignment", href: "/core-trade/consignment" },
          { label: "Wholesale", href: "/core-trade/wholesale&distribution" },
          { label: coreTradeLabel, href: "/core-trade/import-export" },
        ],
      },
      {
        label: "Brand Expansion",
        href: "/brand-growth",
        subItems: [
          { label: "Exhibition", href: "/brand-growth/exhibition" },
          { label: isBuyer ? "Auction" : "Bidding", href: "/brand-growth/auction&bidding" },
          { label: "White-Label", href: "/brand-growth/white-label" },
          { label: "Brick & Mortar", href: "/brand-growth/brick&mortar" },
        ],
      },
      {
        label: "Collaborative",
        href: "/collaborative",
        subItems: [
          { label: "Packaging", href: "/collaborative/packaging" },
          { label: "Design Collaboration", href: "/collaborative/design-collaboration" },
          { label: "Storytelling & Media", href: "/collaborative/storytelling&media" },
          { label: "Warehouse", href: "/collaborative/warehouse" },
        ],
      },
      {
        label: "Institutional",
        href: "/institutional",
        subItems: [
          { label: "Logistics", href: "/institutional/logistics" },
          { label: "Museum", href: "/institutional/museum-institutional" },
          { label: institutionalLastLabel, href: "/institutional/ngo&government" },
          { label: "Technology Partnership", href: "/institutional/technology-partnership" },
        ],
      },
    ]
  }, [userRole])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 bg-[var(--primary-color)] ${
          isScrolled ? "py-2 shadow-lg border-b-2 border-[var(--secondary-color)]" : "py-4"
        }`}
      >
        <div className="container mx-auto max-w-[1520px] px-4 flex items-center justify-between">
          <Link href="/" className="z-50">
            <Image
              src="/images/logo3.png"
              alt="Dekoshur Crafts"
              width={isScrolled ? 80 : 160}
              height={isScrolled ? 70 : 100}
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-white text-md font-medium relative group py-2">
              Home
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[var(--secondary-hover-color)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>

            <DesktopDropdown title="About Us" items={aboutItems} isSignedIn={true} />
            <DesktopDropdown title="Partnerships" items={partnershipItems} isSignedIn={true} />

            <LockedLink href="/process" isSignedIn={isSignedIn} className="text-white text-md font-medium relative group py-2">
              Process
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[var(--secondary-hover-color)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </LockedLink>

            <LockedLink
              href="/registration"
              isSignedIn={isSignedIn}
              className="text-white text-md font-medium relative group py-2"
            >
              {level === "6" && !isRegistered ? "Status" : "Registration"}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[var(--secondary-hover-color)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </LockedLink>

            <Link href="/appointment" className="text-white text-md font-medium relative group py-2">
              Book Appointment
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[var(--secondary-hover-color)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center space-x-6">
            {isSignedIn ? (
              <UserProfileDisplay role={userRole ?? ""} userName={userName}/>
            ) : (
              <>
                <button onClick={() => router.push("/login")} className="text-white text-lg font-medium hover:text-[var(--secondary-hover-color)] transition">
                  Log In
                </button>
                <button
                  onClick={() => router.push("/signup")}
                  className="bg-[var(--secondary-color)] text-gray-200 px-6 py-2 rounded-full font-bold text-lg hover:bg-[var(--secondary-hover-color)] transition"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-white z-50">
            <div className="w-6 h-6 relative">
              <motion.span
                className="absolute top-1 left-0 w-full h-0.5 bg-white"
                animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              />
              <motion.span className="absolute top-3 left-0 w-full h-0.5 bg-white" animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} />
              <motion.span
                className="absolute top-5 left-0 w-full h-0.5 bg-white"
                animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={closeMobileMenu}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed top-0 right-0 w-full h-full bg-[var(--primary-color)] z-50 overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-6 border-b border-white/10">
                  <span className="text-white font-bold text-xl">Dekoshur Crafts</span>
                  <button onClick={closeMobileMenu} className="p-2 hover:bg-white/10 rounded-lg">
                    <X size={24} className="text-white" />
                  </button>
                </div>

                <div className="flex-1 py-6 space-y-1">
                  <MobileMenuItem href="/" onClick={closeMobileMenu}>
                    Home
                  </MobileMenuItem>

                  <MobileDropdownMenu title="About Us" items={aboutItems} onLinkClick={closeMobileMenu} isSignedIn={true} />
                  <MobileDropdownMenu title="Partnerships" items={partnershipItems} onLinkClick={closeMobileMenu} isSignedIn={true} />

                  <LockedLink href="/process" isSignedIn={isSignedIn} onClick={closeMobileMenu} className="block px-6 py-4 text-white text-lg">
                    Process
                  </LockedLink>

                  <LockedLink href="/registration" isSignedIn={isSignedIn} onClick={closeMobileMenu} className="block px-6 py-4 text-white text-lg">
                    {level === "6" ? "Status" : "Registration"}
                  </LockedLink>

                  <MobileMenuItem href="/appointment" onClick={closeMobileMenu}>
                    Book Appointment
                  </MobileMenuItem>
                </div>

                <div className="p-6 border-t border-white/10 space-y-4">
                  {isSignedIn ? (
                    <>
                      <button
                        onClick={() => {
                          closeMobileMenu()
                          router.push("/profile")
                        }}
                        disabled={!isRegistered}
                        className="w-full py-4 text-white text-lg hover:bg-white/10 rounded-lg flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        {isRegistered === false && <Lock size={18} />}
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          closeMobileMenu()
                          handleLogout()
                        }}
                        className="w-full py-4 text-white text-lg hover:bg-white/10 rounded-lg"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          closeMobileMenu()
                          router.push("/login")
                        }}
                        className="w-full py-4 text-white text-lg hover:bg-white/10 rounded-lg"
                      >
                        Log In
                      </button>
                      <button
                        onClick={() => {
                          closeMobileMenu()
                          router.push("/signup")
                        }}
                        className="w-full py-4 bg-[var(--secondary-color)] text-gray-200 rounded-lg font-bold text-lg hover:bg-[var(--secondary-hover-color)]"
                      >
                        Register
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}