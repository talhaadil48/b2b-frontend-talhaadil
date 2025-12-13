"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useGlobalContext } from "../../context/ScreenProvider"

export default function UserProfilePage() {
  const { is4K } = useGlobalContext()
 

  return (
    <main
      className={`min-h-screen bg-[var(--primary-background-color)] ${
        is4K ? "py-24 px-8 sm:px-12 lg:px-16" : "py-16 px-4 sm:px-6 lg:px-8"
      }`}
    >
      <motion.div
        className={`w-full ${is4K ? "max-w-[2000px]" : "max-w-6xl"} mx-auto bg-white rounded-xl shadow-lg overflow-hidden`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Top Section: Profile Picture, Name, Status */}
        <div
          className={`flex flex-col items-center justify-center px-4 py-8 sm:p-12 bg-[var(--primary-color)] text-white text-center ${is4K ? "py-12 sm:p-16" : ""}`}
        >
        
          <h2
            className={`text-2xl sm:text-4xl font-bold mt-4 sm:mt-6 break-words ${is4K ? "text-4xl sm:text-6xl" : ""}`}
          >
            John Doe
          </h2>
        </div>

        {/* Profile Details Section */}
        <section className={`p-6 sm:p-8 border-b border-[var(--primary-hover-color)] ${is4K ? "p-8 sm:p-10" : ""}`}>
          <h3 className={`text-2xl font-bold mb-6 text-gray-700 ${is4K ? "text-3xl" : ""}`}>Profile Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Form Details */}
            <div className={`bg-[var(--primary-background-color)] rounded-lg p-5 shadow-sm ${is4K ? "p-6" : ""}`}>
              <h4 className={`text-xl font-semibold mb-3 text-[var(--primary-color)] ${is4K ? "text-2xl" : ""}`}>
                Form Details
              </h4>
              <div className={`space-y-3 ${is4K ? "text-base" : "text-sm"}`}>
                <div
                  className={`flex flex-col sm:flex-row justify-between rounded-md transition-colors duration-200 ${is4K ? "py-3 px-4" : "py-2 px-3"}`}
                >
                  <span
                    className={`font-medium text-[var(--primary-light-text-color)] ${is4K ? "text-base" : "text-sm"}`}
                  >
                    Full Name:
                  </span>
                  <span className={`text-gray-700 ${is4K ? "text-base" : "text-sm"}`}>John Doe</span>
                </div>
                <div
                  className={`flex flex-col sm:flex-row justify-between rounded-md transition-colors duration-200 ${is4K ? "py-3 px-4" : "py-2 px-3"}`}
                >
                  <span
                    className={`font-medium text-[var(--primary-light-text-color)] ${is4K ? "text-base" : "text-sm"}`}
                  >
                    Email:
                  </span>
                  <span className={`text-gray-700 ${is4K ? "text-base" : "text-sm"}`}>john.doe@example.com</span>
                </div>
                <div
                  className={`flex flex-col sm:flex-row justify-between rounded-md transition-colors duration-200 ${is4K ? "py-3 px-4" : "py-2 px-3"}`}
                >
                  <span
                    className={`font-medium text-[var(--primary-light-text-color)] ${is4K ? "text-base" : "text-sm"}`}
                  >
                    Phone:
                  </span>
                  <span className={`text-gray-700 ${is4K ? "text-base" : "text-sm"}`}>+1 (555) 123-4567</span>
                </div>
                <div
                  className={`flex flex-col sm:flex-row justify-between rounded-md transition-colors duration-200 ${is4K ? "py-3 px-4" : "py-2 px-3"}`}
                >
                  <span
                    className={`font-medium text-[var(--primary-light-text-color)] ${is4K ? "text-base" : "text-sm"}`}
                  >
                    Address:
                  </span>
                  <span className={`text-gray-700 ${is4K ? "text-base" : "text-sm"}`}>123 Main St, Anytown</span>
                </div>
              </div>
            </div>
            {/* Partnership Information */}
            <div className={`bg-[var(--primary-background-color)] rounded-lg p-5 shadow-sm ${is4K ? "p-6" : ""}`}>
              <h4 className={`text-xl font-semibold mb-3 text-[var(--primary-color)] ${is4K ? "text-2xl" : ""}`}>
                Partnership Info
              </h4>
              <div className={`space-y-3 ${is4K ? "text-base" : "text-sm"}`}>
                <div
                  className={`flex flex-col sm:flex-row justify-between rounded-md transition-colors duration-200 ${is4K ? "py-3 px-4" : "py-2 px-3"}`}
                >
                  <span
                    className={`font-medium text-[var(--primary-light-text-color)] ${is4K ? "text-base" : "text-sm"}`}
                  >
                    Partner Type:
                  </span>
                  <span className={`text-gray-700 ${is4K ? "text-base" : "text-sm"}`}>Premium Member</span>
                </div>
                <div
                  className={`flex flex-col sm:flex-row justify-between rounded-md transition-colors duration-200 ${is4K ? "py-3 px-4" : "py-2 px-3"}`}
                >
                  <span
                    className={`font-medium text-[var(--primary-light-text-color)] ${is4K ? "text-base" : "text-sm"}`}
                  >
                    Joined Date:
                  </span>
                  <span className={`text-gray-700 ${is4K ? "text-base" : "text-sm"}`}>Jan 15, 2023</span>
                </div>
                <div
                  className={`flex flex-col sm:flex-row justify-between rounded-md transition-colors duration-200 ${is4K ? "py-3 px-4" : "py-2 px-3"}`}
                >
                  <span
                    className={`font-medium text-[var(--primary-light-text-color)] ${is4K ? "text-base" : "text-sm"}`}
                  >
                    Active Projects:
                  </span>
                  <span className={`text-gray-700 ${is4K ? "text-base" : "text-sm"}`}>3</span>
                </div>
                <div
                  className={`flex flex-col sm:flex-row justify-between rounded-md transition-colors duration-200 ${is4K ? "py-3 px-4" : "py-2 px-3"}`}
                >
                  <span
                    className={`font-medium text-[var(--primary-light-text-color)] ${is4K ? "text-base" : "text-sm"}`}
                  >
                    Referral Code:
                  </span>
                  <span className={`text-gray-700 ${is4K ? "text-base" : "text-sm"}`}>JD-7890</span>
                </div>
              </div>
            </div>
            {/* General User Info */}
            <div
              className={`lg:col-span-1 bg-[var(--primary-background-color)] rounded-lg p-5 shadow-sm ${is4K ? "p-6" : ""}`}
            >
              <h4 className={`text-xl font-semibold mb-3 text-[var(--primary-color)] ${is4K ? "text-2xl" : ""}`}>
                General Info
              </h4>
              <div className={`space-y-3 ${is4K ? "text-base" : "text-sm"}`}>
                <div
                  className={`flex flex-col sm:flex-row justify-between rounded-md transition-colors duration-200 ${is4K ? "py-3 px-4" : "py-2 px-3"}`}
                >
                  <span
                    className={`font-medium text-[var(--primary-light-text-color)] ${is4K ? "text-base" : "text-sm"}`}
                  >
                    Last Login:
                  </span>
                  <span className={`text-gray-700 ${is4K ? "text-base" : "text-sm"}`}>July 24, 2025, 4:34 PM</span>
                </div>
                <div
                  className={`flex flex-col sm:flex-row justify-between rounded-md transition-colors duration-200 ${is4K ? "py-3 px-4" : "py-2 px-3"}`}
                >
                  <span
                    className={`font-medium text-[var(--primary-light-text-color)] ${is4K ? "text-base" : "text-sm"}`}
                  >
                    Account Status:
                  </span>
                  <span className={`text-gray-700 ${is4K ? "text-base" : "text-sm"}`}>Active</span>
                </div>
                <div
                  className={`flex flex-col sm:flex-row justify-between rounded-md transition-colors duration-200 ${is4K ? "py-3 px-4" : "py-2 px-3"}`}
                >
                  <span
                    className={`font-medium text-[var(--primary-light-text-color)] ${is4K ? "text-base" : "text-sm"}`}
                  >
                    Preferred Language:
                  </span>
                  <span className={`text-gray-700 ${is4K ? "text-base" : "text-sm"}`}>English</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Agreements Section */}
        <section className={`p-6 sm:p-8 border-b border-[var(--primary-hover-color)] ${is4K ? "p-8 sm:p-10" : ""}`}>
          <h3 className={`text-2xl font-bold mb-6 text-gray-700 ${is4K ? "text-3xl" : ""}`}>Agreements</h3>
          <div className={`bg-[var(--primary-background-color)] rounded-lg p-5 shadow-sm ${is4K ? "p-6" : ""}`}>
            <div className="space-y-4">
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between rounded-md transition-colors duration-200 ${is4K ? "py-4 px-5" : "py-3 px-4"}`}
              >
                <div>
                  <p className={`font-medium text-[var(--primary-color)] ${is4K ? "text-lg" : ""}`}>Terms of Service</p>
                  <p className={`text-xs text-[var(--primary-light-text-color)] mt-1 ${is4K ? "text-sm" : ""}`}>
                    Accepted on: Jan 1, 2023
                  </p>
                </div>
                <a
                  href="#"
                  className={`text-[var(--secondary-color)] hover:text-[var(--secondary-light-color)] mt-2 sm:mt-0 transition-colors duration-200 underline ${is4K ? "text-base" : "text-sm"}`}
                >
                  View Document
                </a>
              </div>
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between rounded-md transition-colors duration-200 ${is4K ? "py-4 px-5" : "py-3 px-4"}`}
              >
                <div>
                  <p className={`font-medium text-[var(--primary-color)] ${is4K ? "text-lg" : ""}`}>Privacy Policy</p>
                  <p className={`text-xs text-[var(--primary-light-text-color)] mt-1 ${is4K ? "text-sm" : ""}`}>
                    Accepted on: Jan 1, 2023
                  </p>
                </div>
                <a
                  href="#"
                  className={`text-[var(--secondary-color)] hover:text-[var(--secondary-light-color)] mt-2 sm:mt-0 transition-colors duration-200 underline ${is4K ? "text-base" : "text-sm"}`}
                >
                  View Document
                </a>
              </div>
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between rounded-md transition-colors duration-200 ${is4K ? "py-4 px-5" : "py-3 px-4"}`}
              >
                <div>
                  <p className={`font-medium text-[var(--primary-color)] ${is4K ? "text-lg" : ""}`}>
                    Non-Disclosure Agreement (NDA)
                  </p>
                  <p className={`text-xs text-[var(--primary-light-text-color)] mt-1 ${is4K ? "text-sm" : ""}`}>
                    Status: Pending Acceptance
                  </p>
                </div>
                <a
                  href="#"
                  className={`text-[var(--secondary-color)] hover:text-[var(--secondary-light-color)] mt-2 sm:mt-0 transition-colors duration-200 underline ${is4K ? "text-base" : "text-sm"}`}
                >
                  View Document
                </a>
              </div>
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between rounded-md transition-colors duration-200 ${is4K ? "py-4 px-5" : "py-3 px-4"}`}
              >
                <div>
                  <p className={`font-medium text-[var(--primary-color)] ${is4K ? "text-lg" : ""}`}>
                    Service Level Agreement (SLA)
                  </p>
                  <p className={`text-xs text-[var(--primary-light-text-color)] mt-1 ${is4K ? "text-sm" : ""}`}>
                    Accepted on: Feb 10, 2023
                  </p>
                </div>
                <a
                  href="#"
                  className={`text-[var(--secondary-color)] hover:text-[var(--secondary-light-color)] mt-2 sm:mt-0 transition-colors duration-200 underline ${is4K ? "text-base" : "text-sm"}`}
                >
                  View Document
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Submitted Documents Section */}
        <section className={`p-6 sm:p-8 ${is4K ? "p-8 sm:p-10" : ""}`}>
          <h3 className={`text-2xl font-bold mb-6 text-gray-700 ${is4K ? "text-3xl" : ""}`}>Submitted Documents</h3>
          <div className={`bg-[var(--primary-background-color)] rounded-lg p-5 shadow-sm ${is4K ? "p-6" : ""}`}>
            <div className="space-y-4">
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between rounded-md transition-colors duration-200 ${is4K ? "py-4 px-5" : "py-3 px-4"}`}
              >
                <div>
                  <p className={`font-medium text-[var(--primary-color)] ${is4K ? "text-lg" : ""}`}>
                    Identity Proof (Passport)
                  </p>
                  <p className={`text-xs text-[var(--primary-light-text-color)] mt-1 ${is4K ? "text-sm" : ""}`}>
                    Submitted: Mar 5, 2023 | Status: Approved
                  </p>
                </div>
                <a
                  href="#"
                  className={`text-[var(--secondary-color)] hover:text-[var(--secondary-light-color)] mt-2 sm:mt-0 transition-colors duration-200 underline ${is4K ? "text-base" : "text-sm"}`}
                >
                  View Document
                </a>
              </div>
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between rounded-md transition-colors duration-200 ${is4K ? "py-4 px-5" : "py-3 px-4"}`}
              >
                <div>
                  <p className={`font-medium text-[var(--primary-color)] ${is4K ? "text-lg" : ""}`}>
                    Address Proof (Utility Bill)
                  </p>
                  <p className={`text-xs text-[var(--primary-light-text-color)] mt-1 ${is4K ? "text-sm" : ""}`}>
                    Submitted: Mar 5, 2023 | Status: Approved
                  </p>
                </div>
                <a
                  href="#"
                  className={`text-[var(--secondary-color)] hover:text-[var(--secondary-light-color)] mt-2 sm:mt-0 transition-colors duration-200 underline ${is4K ? "text-base" : "text-sm"}`}
                >
                  View Document
                </a>
              </div>
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between rounded-md transition-colors duration-200 ${is4K ? "py-4 px-5" : "py-3 px-4"}`}
              >
                <div>
                  <p className={`font-medium text-[var(--primary-color)] ${is4K ? "text-lg" : ""}`}>Business License</p>
                  <p className={`text-xs text-[var(--primary-light-text-color)] mt-1 ${is4K ? "text-sm" : ""}`}>
                    Submitted: Apr 1, 2023 | Status: Pending Review
                  </p>
                </div>
                <a
                  href="#"
                  className={`text-[var(--secondary-color)] hover:text-[var(--secondary-light-color)] mt-2 sm:mt-0 transition-colors duration-200 underline ${is4K ? "text-base" : "text-sm"}`}
                >
                  View Document
                </a>
              </div>
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between rounded-md transition-colors duration-200 ${is4K ? "py-4 px-5" : "py-3 px-4"}`}
              >
                <div>
                  <p className={`font-medium text-[var(--primary-color)] ${is4K ? "text-lg" : ""}`}>Bank Statement</p>
                  <p className={`text-xs text-[var(--primary-light-text-color)] mt-1 ${is4K ? "text-sm" : ""}`}>
                    Submitted: Apr 15, 2023 | Status: Rejected (Invalid Format)
                  </p>
                </div>
                <a
                  href="#"
                  className={`text-[var(--secondary-color)] hover:text-[var(--secondary-light-color)] mt-2 sm:mt-0 transition-colors duration-200 underline ${is4K ? "text-base" : "text-sm"}`}
                >
                  View Document
                </a>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </main>
  )
}
