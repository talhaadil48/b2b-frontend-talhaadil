"use client"
import { useEffect, useState, useRef } from "react"
import { categories } from "@/lib/categories"
import { useGlobalContext } from "@/context/ScreenProvider"
import Cookies from "js-cookie"
import { submitProductsToAPI } from "@/services/regitsration"
import VerticalHeroSlider from "@/components/Essentials/VerticalBanner"
const getUserRoleFromCookies = (): "vendor" | "buyer" => {
  return (Cookies.get("user_role") as "vendor" | "buyer") || "vendor"
}

function replaceVendorWithBuyer(text: string, userRole: string | null): string {
  if (userRole === "buyer") {
    return text.replace(/vendor/gi, "Buyer")
  }
  return text
}

type DetailMap = Record<string, string[]>

interface SubCategory {
  id: string
  name: string
  details?: DetailMap
}

export interface Category {
  id: string
  name: string
  subcategories: SubCategory[]
}

interface ProductData {
  categories: string[]
  subCategories: string[]
  detailedSelections: Record<string, DetailMap>
}

interface ComprehensiveProductSelectionProps {
  data?: ProductData
  onUpdate: (data: ProductData) => void
  onNext: () => void
  onPrev: () => void
}

export default function ComprehensiveProductSelection({
  data,
  onUpdate,
  onNext,
  onPrev,
}: ComprehensiveProductSelectionProps) {
  const topRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const { is4K } = useGlobalContext()
  const [userRole, setUserRole] = useState<string | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(data?.categories ?? [])
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(data?.subCategories ?? [])
  const [detailedSelections, setDetailedSelections] = useState<Record<string, DetailMap>>(
    data?.detailedSelections ?? {},
  )
  const [expandedSubCategory, setExpandedSubCategory] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<"categories" | "subcategories" | "details">("categories")
  const [showAllProducts, setShowAllProducts] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const role = getUserRoleFromCookies()
    setUserRole(role)
  }, [])

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const updateData = (cats: string[], subCats: string[], details: Record<string, DetailMap>) => {
    onUpdate({
      categories: cats,
      subCategories: subCats,
      detailedSelections: details,
    })
  }

  // API submission function
  const submitProductData = async (productData: ProductData) => {
    try {
      setIsSubmitting(true)

      // Create linked/nested structure
      const linkedData = selectedCategories
        .map((categoryId) => {
          const category = categories.find((cat) => cat.id === categoryId)
          if (!category) return null

          // Get subcategories for this category
          const categorySubcategories = category.subcategories
            .filter((sub) => selectedSubCategories.includes(sub.id))
            .map((subcategory) => {
              const specifications: Record<string, string[]> = {}
              const subDetails = detailedSelections[subcategory.id] || {}

              Object.entries(subDetails).forEach(([specKey, specValues]) => {
                if (specValues && specValues.length > 0) {
                  specifications[specKey] = specValues // Keep as array, even if single value
                }
              })

              return {
                subcategoryId: subcategory.id,
                subcategoryName: subcategory.name,
                specifications: specifications,
              }
            })
            .filter((sub) => Object.keys(sub.specifications).length > 0)

          return {
            categoryId: category.id,
            categoryName: category.name,
            subcategories: categorySubcategories,
          }
        })
        .filter(Boolean) // Remove null entries

      // Format the final submission data
      const submissionData = {
        selectedData: linkedData,
      }
      console.log(submissionData)

      const response = await submitProductsToAPI(submissionData)
      console.log(response)
      let step = parseInt(Cookies.get("registration_step") || "0", 10);
      step += 1;
      Cookies.set("registration_step", step.toString());
      onNext()
    } catch (error: any) {
      console.error("Error submitting product data:", error)
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCategorySelect = (categoryId: string) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId]
    setSelectedCategories(updatedCategories)
    if (!updatedCategories.includes(categoryId)) {
      const category = categories.find((cat) => cat.id === categoryId)
      if (category) {
        const subIds = category.subcategories.map((s) => s.id)
        const updatedSubCats = selectedSubCategories.filter((id) => !subIds.includes(id))
        const updatedDetails: Record<string, DetailMap> = {
          ...detailedSelections,
        }
        subIds.forEach((id) => delete updatedDetails[id])
        setSelectedSubCategories(updatedSubCats)
        setDetailedSelections(updatedDetails)
        updateData(updatedCategories, updatedSubCats, updatedDetails)
      }
    } else {
      updateData(updatedCategories, selectedSubCategories, detailedSelections)
    }
  }

  const handleSubCategorySelect = (subId: string) => {
    const updated = selectedSubCategories.includes(subId)
      ? selectedSubCategories.filter((id) => id !== subId)
      : [...selectedSubCategories, subId]
    setSelectedSubCategories(updated)
    if (!updated.includes(subId)) {
      const updatedDetails: Record<string, DetailMap> = {
        ...detailedSelections,
      }
      delete updatedDetails[subId]
      setDetailedSelections(updatedDetails)
      updateData(selectedCategories, updated, updatedDetails)
    } else {
      updateData(selectedCategories, updated, detailedSelections)
    }
  }

  const handleDetailSelect = (subId: string, detailKey: string, value: string) => {
    const updatedDetails: Record<string, DetailMap> = { ...detailedSelections }
    if (!updatedDetails[subId]) updatedDetails[subId] = {}

    const current = updatedDetails[subId][detailKey] || []
    const allowMultiple = isMultipleSelectionAllowed(detailKey)

    if (allowMultiple) {
      // For multiple selection specifications
      if (current.includes(value)) {
        // Remove if already selected
        updatedDetails[subId][detailKey] = current.filter((v) => v !== value)
      } else {
        // Add to existing selections
        updatedDetails[subId][detailKey] = [...current, value]
      }
    } else {
      // For single selection specifications, still store as array
      if (current.includes(value)) {
        // If already selected, remove it (deselect)
        updatedDetails[subId][detailKey] = []
      } else {
        // Replace with this single selection (stored as array)
        updatedDetails[subId][detailKey] = [value]
      }
    }

    setDetailedSelections(updatedDetails)
    updateData(selectedCategories, selectedSubCategories, updatedDetails)
  }

  const getAvailableSubCategories = (): SubCategory[] => {
    return categories.filter((cat) => selectedCategories.includes(cat.id)).flatMap((cat) => cat.subcategories)
  }

  const getSubCategoryDetails = (subId: string): DetailMap | null => {
    for (const cat of categories) {
      const sub = cat.subcategories.find((s) => s.id === subId)
      if (sub && sub.details) {
        const filteredDetails: DetailMap = Object.fromEntries(
          Object.entries(sub.details).filter(([, value]) => Array.isArray(value) && value !== undefined) as [
            string,
            string[],
          ][],
        )
        return filteredDetails
      }
    }
    return null
  }

  const formatDetailKey = (key: string) => {
    const formatted = key
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")

    return replaceVendorWithBuyer(formatted, userRole)
  }

  const getTotalSelections = (): number => {
    let total = 0
    Object.values(detailedSelections).forEach((m) =>
      Object.values(m).forEach((arr) => {
        total += arr.length
      }),
    )
    return total
  }

  const areAllSpecificationsSelected = (): boolean => {
    for (const subCategoryId of selectedSubCategories) {
      const details = getSubCategoryDetails(subCategoryId)
      if (!details) continue
      for (const detailKey of Object.keys(details)) {
        const hasSelection = detailedSelections[subCategoryId]?.[detailKey]?.length > 0
        if (!hasSelection) {
          return false
        }
      }
    }
    return true
  }

  const validateSubcategorySelection = (): boolean => {
    for (const categoryId of selectedCategories) {
      const category = categories.find((cat) => cat.id === categoryId)
      if (!category) continue

      const categorySubcategoryIds = category.subcategories.map((sub) => sub.id)
      const hasSelectedSubcategory = categorySubcategoryIds.some((subId) => selectedSubCategories.includes(subId))

      if (!hasSelectedSubcategory) {
        return false
      }
    }
    return true
  }

  const isMultipleSelectionAllowed = (detailKey: string): boolean => {
   return true;
  }

  const handleNext = async () => {
    if (currentStep === "categories" && selectedCategories.length > 0) {
      setCurrentStep("subcategories")
      scrollToTop()
    } else if (currentStep === "subcategories" && selectedSubCategories.length > 0 && validateSubcategorySelection()) {
      setCurrentStep("details")
      scrollToTop()
    } else if (currentStep === "details" && areAllSpecificationsSelected()) {
      // Submit data to API before proceeding
      const currentData = {
        categories: selectedCategories,
        subCategories: selectedSubCategories,
        detailedSelections: detailedSelections,
      }
      await submitProductData(currentData)
    }
  }

  const handlePrev = () => {
    if (currentStep === "details") {
      setCurrentStep("subcategories")
      scrollToTop()
    } else if (currentStep === "subcategories") {
      setCurrentStep("categories")
      scrollToTop()
    } else {
      onPrev()
    }
  }

  const handleExpandSubCategory = (subCategoryId: string) => {
    setExpandedSubCategory(expandedSubCategory === subCategoryId ? null : subCategoryId)
    // Scroll to the expanded section after a brief delay to allow for expansion
    setTimeout(() => {
      const element = document.getElementById(`subcategory-${subCategoryId}`)
      if (element && expandedSubCategory !== subCategoryId) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100)
  }

  const toggleShowAllProducts = (categoryId: string) => {
    setShowAllProducts((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  const getDisplayedSubcategories = (category: Category) => {
    const shouldShowAll = showAllProducts[category.id]
    return shouldShowAll ? category.subcategories : category.subcategories.slice(0, 3)
  }

  return (
    <>
      <VerticalHeroSlider />
      <div className={`mx-auto px-4 py-8 ${is4K ? "max-w-[2000px]" : "max-w-7xl"}`}>
        <div ref={topRef} />
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep === "categories"
                ? "bg-[var(--secondary-color)] text-white"
                : selectedCategories.length > 0
                  ? "bg-[var(--primary-color)] text-white"
                  : "bg-gray-300 text-gray-600"
                }`}
            >
              1
            </div>
            <div
              className={`w-16 h-1 ${selectedCategories.length > 0 ? "bg-[var(--primary-color)]" : "bg-gray-300"}`}
            ></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep === "subcategories"
                ? "bg-[var(--secondary-color)] text-white"
                : selectedSubCategories.length > 0
                  ? "bg-[var(--primary-color)] text-white"
                  : "bg-gray-300 text-gray-600"
                }`}
            >
              2
            </div>
            <div
              className={`w-16 h-1 ${selectedSubCategories.length > 0 ? "bg-[var(--primary-color)]" : "bg-gray-300"}`}
            ></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep === "details"
                ? "bg-[var(--secondary-color)] text-white"
                : getTotalSelections() > 0
                  ? "bg-[var(--primary-color)] text-white"
                  : "bg-gray-300 text-gray-600"
                }`}
            >
              3
            </div>
          </div>
          <div className="flex justify-center space-x-8 text-sm">
            <span className={currentStep === "categories" ? "text-[var(--secondary-color)] font-bold" : "text-gray-600"}>
              Categories
            </span>
            <span
              className={currentStep === "subcategories" ? "text-[var(--secondary-color)] font-bold" : "text-gray-600"}
            >
              Products
            </span>
            <span className={currentStep === "details" ? "text-[var(--secondary-color)] font-bold" : "text-gray-600"}>
              Specifications
            </span>
          </div>
        </div>

        {/* Step 1: Categories */}
        {currentStep === "categories" && (
          <div>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[var(--primary-color)] mb-4">Explore the full spectrum of Products we trade</h1>
              <p className="text-center text-[color:var(--secondary-color)] mt-6 italic font-semibold">
                Click “Next” below to continue exploring.
              </p>



            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`bg-white rounded-3xl shadow-lg p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${selectedCategories.includes(category.id)
                    ? "ring-3 ring-green-50 bg-gradient-to-br from-[#b7ec86] to-white"
                    : "hover:shadow-2xl"
                    }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-[var(--primary-color)] leading-tight">{category.name}</h3>
                    {selectedCategories.includes(category.id) && (
                      <div className="w-8 h-8 bg-[var(--primary-color)] rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                        <span className="text-white text-lg font-bold">✓</span>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">{category.subcategories.length} products available</div>
                  <div className="flex flex-wrap gap-1">
                    {getDisplayedSubcategories(category).map((sub, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {sub.name}
                      </span>
                    ))}
                    {category.subcategories.length > 3 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleShowAllProducts(category.id)
                        }}
                        className="text-xs text-[var(--secondary-color)] font-medium px-2 py-1 hover:underline"
                      >
                        {showAllProducts[category.id] ? "Show less" : `+${category.subcategories.length - 3} more`}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Subcategories */}
        {currentStep === "subcategories" && selectedCategories.length > 0 && (
          <div>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[var(--primary-color)] mb-4">Explore the full spectrum of Products we trade</h1>
               <p className="text-center text-[color:var(--secondary-color)] mt-6 italic font-semibold">
                Click “Next” below to continue exploring.
              </p>
              {selectedSubCategories.length > 0 && !validateSubcategorySelection() && (
                <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg text-yellow-800 text-sm max-w-md mx-auto">
                  Please select at least one product from each category to continue
                </div>
              )}
            </div>
            <div className="bg-white rounded-3xl shadow-lg sm:px-0 py-6 lg:px-30 mb-12">
              {selectedCategories.map((categoryId) => {
                const category = categories.find((cat) => cat.id === categoryId)
                if (!category) return null

                return (
                  <div key={categoryId} className="mb-8 last:mb-0">
                    {/* Category heading */}
                    <h3 className="text-xl font-bold text-[var(--primary-color)] mb-4 px-4">{category.name}</h3>

                    {/* Subcategories grid for this category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 px-4">
                      {category.subcategories.map((subCategory) => (
                        <label
                          key={subCategory.id}
                          className={`flex items-center space-x-3 cursor-pointer p-4 rounded-2xl transition-all duration-200 ${selectedSubCategories.includes(subCategory.id)
                            ? "bg-[#b7ec86] border-2 border-[#b7ec86]"
                            : "hover:bg-gray-50 border-2 border-transparent"
                            }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedSubCategories.includes(subCategory.id)}
                            onChange={() => handleSubCategorySelect(subCategory.id)}
                            className="w-5 h-5 appearance-none border-2 border-gray-300 rounded checked:bg-[var(--primary-color)] checked:border-[var(--primary-hover-color)] focus:ring-2 focus:ring-[var(--secondary-color)] focus:ring-offset-2"
                            style={{
                              backgroundImage: selectedSubCategories.includes(subCategory.id)
                                ? `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e")`
                                : "none",
                            }}
                          />
                          <span className="text-sm font-medium text-gray-700 leading-tight">{subCategory.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 3: Detailed Specifications */}
        {currentStep === "details" && selectedSubCategories.length > 0 && (
          <div>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[var(--primary-color)] mb-4">Product Specifications</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select specifications for each product (some allow multiple selections)
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Progress:{" "}
                {Object.keys(detailedSelections).reduce(
                  (total, subId) =>
                    total +
                    Object.keys(detailedSelections[subId] || {}).filter(
                      (key) => detailedSelections[subId][key]?.length > 0,
                    ).length,
                  0,
                )}{" "}
                /{" "}
                {selectedSubCategories.reduce((total, subId) => {
                  const details = getSubCategoryDetails(subId)
                  return total + (details ? Object.keys(details).length : 0)
                }, 0)}{" "}
                specifications selected
              </div>
            </div>
            <div className="space-y-8">
              {selectedSubCategories.map((subCategoryId) => {
                const subCategory = getAvailableSubCategories().find((sub) => sub.id === subCategoryId)
                const details = getSubCategoryDetails(subCategoryId)
                if (!subCategory || !details) return null
                return (
                  <div
                    key={subCategoryId}
                    id={`subcategory-${subCategoryId}`}
                    className="bg-white rounded-3xl shadow-lg overflow-hidden"
                  >
                    <div
                      className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-hover-color)] text-white p-6 cursor-pointer"
                      onClick={() => handleExpandSubCategory(subCategoryId)}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold">{subCategory.name}</h3>
                        <div className="flex items-center space-x-4">
                          <span>Detailed Specifications</span>
                          <span
                            className={`transform transition-transform ${expandedSubCategory === subCategoryId ? "rotate-180" : ""
                              }`}
                          >
                            ▼
                          </span>
                        </div>
                      </div>
                    </div>
                    {expandedSubCategory === subCategoryId && (
                      <div className="py-6 px-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {Object.entries(details).map(([detailKey, values]) => {
                            if (!Array.isArray(values)) return null
                            const allowMultiple = isMultipleSelectionAllowed(detailKey)
                            return (
                              <div key={detailKey} className="bg-gray-50 rounded-2xl py-6 px-3">
                                <h4 className="text-lg font-semibold text-[var(--primary-color)] mb-4">
                                  {formatDetailKey(detailKey)} ({allowMultiple ? "Select multiple" : "Select one"})
                                </h4>
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                  {values.map((value, index) => {
                                    const isSelected =
                                      detailedSelections[subCategoryId]?.[detailKey]?.includes(value) || false
                                    const displayValue = replaceVendorWithBuyer(value, userRole)
                                    return (
                                      <label
                                        key={index}
                                        className={`flex items-start space-x-3 cursor-pointer py-3 rounded-xl transition-all duration-200 pl-4 ${isSelected
                                          ? "bg-[#b7ec86] border-2 border-[#b7ec86]"
                                          : "hover:bg-white border-2 border-transparent"
                                          }`}
                                      >
                                        <input
                                          type={allowMultiple ? "checkbox" : "radio"}
                                          name={allowMultiple ? undefined : `${subCategoryId}-${detailKey}`}
                                          checked={isSelected}
                                          onChange={() => handleDetailSelect(subCategoryId, detailKey, value)}
                                          className="w-4 h-4 mt-0.5 border-2 border-gray-300 focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 flex-shrink-0"
                                          style={{
                                            accentColor: "var(--primary-color)",
                                          }}
                                        />
                                        <span className="text-sm text-gray-700 leading-relaxed">{displayValue}</span>
                                      </label>
                                    )
                                  })}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}


        {/* Navigation */}
        <div
          className={`flex items-center  mt-10 ${currentStep === "categories" ? "justify-end" : "justify-between"
            }`}
        >
          {currentStep !== "categories" && (
            <button
              onClick={handlePrev}
              disabled={isSubmitting}
              className="px-4 py-2 sm:px-8 sm:py-4 sm:font-bold border-2 border-[var(--primary-color)] text-[var(--primary-color)] rounded-2xl hover:bg-[var(--primary-color)] hover:text-white transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="inline">←</span>
              <span className="hidden md:inline ml-2">Prev</span>
            </button>
          )}

          {/* Hide submit button if step 3 */}
          {currentStep !== "details" && (
            <button
              onClick={handleNext}
              disabled={
                isSubmitting ||
                (currentStep === "categories" && selectedCategories.length === 0) ||
                (currentStep === "subcategories" &&
                  (selectedSubCategories.length === 0 ||
                    !validateSubcategorySelection()))
              }
              className={`px-4 py-2 sm:px-8 sm:py-4 sm:font-bold rounded-2xl transition-all duration-300 font-semibold shadow-lg transform ${!isSubmitting &&
                ((currentStep === "categories" && selectedCategories.length > 0) ||
                  (currentStep === "subcategories" &&
                    selectedSubCategories.length > 0 &&
                    validateSubcategorySelection()))
                ? "bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] text-white hover:shadow-xl hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              {isSubmitting ? (
                <>
                  <span className="hidden md:inline mr-2">Submitting...</span>
                </>
              ) : (
                <>
                  <span className="hidden md:inline mr-2">Next</span>
                  <span className="inline">→</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </>
  )
}
