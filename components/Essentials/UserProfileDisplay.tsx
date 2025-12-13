import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuthentication } from "@/context/AuthenticationWrapper"
import Cookies from "js-cookie"
import { Lock } from "lucide-react"
import { User2 } from "lucide-react"
export function UserProfileDisplay({ userName,role }: {
  userName: string,
role: string
}) {
  const [open, setOpen] = useState(false)
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null)
  const dropdownRef = useRef(null)
  const router = useRouter()
  const { handleLogout } = useAuthentication()

  useEffect(() => {
    const registeredStatus = Cookies.get("is_registered")
    setIsRegistered(registeredStatus === "APPROVED")
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <motion.button
        className="flex items-center space-x-2 cursor-pointer group"
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.95 }}
        aria-label={`View profile for ${userName}`}
      >
        <div className="h-8 w-8 rounded-full bg-[var(--secondary-color)] flex items-center justify-center shadow-sm">
          <User2 className="text-white text-sm"></User2>
        </div>
        <div className="flex flex-col items-start">
        <span className="text-white text-md font-medium group-hover:text-[var(--secondary-hover-color)] transition-colors duration-300 hidden md:inline">
          {userName}
        </span>
        <span className="text-white text-xs font-medium group-hover:text-[var(--secondary-hover-color)] transition-colors duration-300 hidden md:inline">
          {role}
        </span>
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-50 overflow-hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <button
              disabled={isRegistered === false}
              onClick={() => {
                if (isRegistered) {
                  router.push("/user/dashboard")
                }
                setOpen(false)
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              Dashboard
              {isRegistered === false && <Lock size={16} />}
            </button>
            <button
              onClick={() => {
                setOpen(false)
                handleLogout()
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
