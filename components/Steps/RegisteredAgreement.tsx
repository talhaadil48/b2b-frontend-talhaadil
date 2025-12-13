"use client"
import { useState, useEffect } from "react"
import { CheckCircle, Building, User, CreditCard, FileCheck } from "lucide-react"
import { useGlobalContext } from "@/context/ScreenProvider"
import jsPDF from "jspdf"
import { sendAgreement, getUserInfo } from "@/services/regitsration"
import { partnershipAgreements } from "@/lib/partnership-agreement"
import Cookies from "js-cookie"
import { getUserRegistrationSelected, updatePartnership, updateRegistrationAgreementUrl } from "@/services/user"

export interface FormData {
    businessName: string
    businessType: string
    einNumber: string
    tinNumber: string
    contactPerson: string
    email: string
    phoneNumber: string
    bankName: string
    accountNumber: string
    routingNumber: string
    bankAddress: string
    signatoryName: string
    signatureDate: string
    accepted: boolean
}

interface BuyerAgreementProps {
    partnershipId: string
}

const partnershipTypeMapping: { [key: string]: string } = {
    drop_shipping: "Drop Shipping Buyer Partnership",
    consignment: "Consignment Buyer Partnership",
    import_export: "Import Export Buyer Partnership",
    wholesale: "Wholesale Partnership",
    exhibition: "Exhibition Buyer Partnership",
    auction: "Auction Partnership",
    white_label: "White Label Partnership",
    brick_mortar: "Brick & Mortar Buyer Partnership",
    design_collaboration: "Design Collaboration Partnership",
    storytelling: "Storytelling Partnership",
    warehouse: "Warehouse Partnership",
    packaging: "Packaging Partnership",
    logistics: "Logistics Partnership",
    museum_institutional: "Museum Institutional Partnership",
    ngo_government: "NGO Government Partnership",
    technology_partnership: "Technology Partnership",
}

export default function RegisterAgreement({ partnershipId }: BuyerAgreementProps) {
    const { is4K } = useGlobalContext()
    const [currentStep, setCurrentStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [partnershipData, setPartnershipData] = useState<any>(null)
    const [partnershipTitle, setPartnershipTitle] = useState<string>(partnershipTypeMapping[partnershipId] || "Drop Shipping Buyer Partnership Agreement")
    const [formData, setFormData] = useState<FormData>({
        businessName: "",
        businessType: "",
        einNumber: "",
        tinNumber: "",
        contactPerson: "",
        email: "",
        phoneNumber: "",
        bankName: "",
        accountNumber: "",
        routingNumber: "",
        bankAddress: "",
        signatoryName: "",
        signatureDate: "",
        accepted: false,
    })

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    useEffect(() => {
        const loadPartnershipData = async () => {
            try {
                let selectedPartnership = partnershipAgreements.find((agreement) => {
                    const mappedName = partnershipTypeMapping[partnershipId]
                    return agreement.name === mappedName || agreement.agreement === mappedName
                })

                if (!selectedPartnership) {
                    selectedPartnership = partnershipAgreements.find(
                        (agreement) => agreement.name === "Drop Shipping Buyer Partnership",
                    )
                }

                if (selectedPartnership) {
                    setPartnershipData(selectedPartnership)
                    setPartnershipTitle(selectedPartnership.agreement)
                }
            } catch (error) {
                console.error("Error loading partnership data:", error)
                const defaultPartnership = partnershipAgreements.find(
                    (agreement) => agreement.name === "Drop Shipping Buyer Partnership",
                )
                if (defaultPartnership) {
                    setPartnershipData(defaultPartnership)
                    setPartnershipTitle(defaultPartnership.agreement)
                }
            }
        }

        loadPartnershipData()
    }, [partnershipId])

    useEffect(() => {
        const fetchUserData = async () => {
            const userdata = await getUserInfo()
            const businessData = userdata?.data
            if (businessData) {
                try {
                    const preFilledData: FormData = {
                        businessName: businessData.business_name || "",
                        businessType: businessData.business_type || "",
                        einNumber: businessData.gst_number || "",
                        tinNumber: businessData.tax_identification_number || "",
                        contactPerson: businessData.contact_person_name || "",
                        email: businessData.contact_email || "",
                        phoneNumber: businessData.contact_phone || "",
                        bankName: businessData.bank_name || "",
                        accountNumber: businessData.account_number || "",
                        routingNumber: businessData.ifsc_code || "",
                        bankAddress: `${businessData.street_address_1 || ""} ${businessData.city || ""} ${businessData.state_region || ""}`.trim(),
                        signatoryName: formData.signatoryName,
                        signatureDate: formData.signatureDate,
                        accepted: formData.accepted,
                    }
                    setFormData(preFilledData)
                } catch (error) {
                    console.error("Error parsing saved business data:", error)
                }
            }
        }
        fetchUserData()
    }, [])

    const steps = [
        { number: 1, title: "Business Information", icon: Building },
        { number: 2, title: "Contact Details", icon: User },
        { number: 3, title: "Banking Information", icon: CreditCard },
        { number: 4, title: "Legal Terms", icon: FileCheck },
    ]

    const updateFormData = (field: keyof FormData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const canProceedToNext = () => {
        switch (currentStep) {
            case 1:
                return formData.businessName && formData.businessType && formData.einNumber && formData.tinNumber
            case 2:
                return formData.contactPerson && formData.email && formData.phoneNumber
            case 3:
                return formData.bankName && formData.accountNumber && formData.routingNumber && formData.bankAddress
            case 4:
                return formData.signatoryName && formData.signatureDate && formData.accepted
            default:
                return false
        }
    }

    const getTermsContent = () => {
        if (!partnershipData || !partnershipData.legalTerms) {
            return `1. Definitions and Scope
"Buyer" refers to the party purchasing products through DKC's drop shipping partnership.
"Platform" refers to DKC's e-commerce website and related drop shipping services.
"Products" refers to items sourced from DKC's vendors for resale by the Buyer.
"Agreement" refers to this entire drop shipping partnership arrangement.

2. Service Level Agreements
- Order processing within 24 hours (once payment is confirmed).
- Customer query response time: 4 hours maximum.
- Minimum 95% fulfillment rate required.
- Maximum cancellation rate: 5%.
- Platform uptime guarantee: 99.9%.

This agreement is governed under U.S. law and is legally binding under federal and applicable state laws.`
        }

        let content = ""
        partnershipData.legalTerms.forEach((section: any, index: number) => {
            content += `${index + 1}. ${section.title}\n`
            section.terms.forEach((term: string) => {
                content += `${term}\n`
            })
            content += "\n"
        })

        return content.trim()
    }

    const generatePDF = () => {
        const doc = new jsPDF()
        const pageWidth = doc.internal.pageSize.width
        const pageHeight = doc.internal.pageSize.height
        const margin = 25
        let yPosition = margin

        const primaryColor = [20, 53, 80]
        const secondaryColor = [183, 28, 28]
        const accentColor = [55, 65, 81]
        const lightGray = [107, 114, 128]
        const backgroundGray = [249, 250, 251]

        // HEADER
        doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
        doc.rect(0, 0, pageWidth, 50, "F")

        doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
        doc.setLineWidth(2)
        doc.line(0, 50, pageWidth, 50)

        doc.setTextColor(255, 255, 255)
        doc.setFontSize(20)
        doc.setFont("helvetica", "bold")
        doc.text("De Koshur Crafts Bazaar LLC", pageWidth / 2, 18, { align: "center" })
        doc.setFontSize(11)
        doc.setFont("helvetica", "normal")
        doc.text("United States of America", pageWidth / 2, 28, { align: "center" })
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text(partnershipTitle, pageWidth / 2, 40, { align: "center" })

        yPosition = 70

        // BUSINESS INFO HEADER
        doc.setFillColor(backgroundGray[0], backgroundGray[1], backgroundGray[2])
        doc.rect(margin - 5, yPosition - 5, pageWidth - 2 * margin + 10, 20, "F")

        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("BUSINESS INFORMATION", margin, yPosition + 7)

        yPosition += 25

        // BUSINESS INFO
        doc.setTextColor(accentColor[0], accentColor[1], accentColor[2])
        doc.setFontSize(10)

        const businessInfo = [
            `Business Name: ${formData.businessName}`,
            `Business Type: ${formData.businessType}`,
            `EIN Number: ${formData.einNumber}`,
            `TIN Number: ${formData.tinNumber}`,
            `Contact Person: ${formData.contactPerson}`,
            `Email: ${formData.email}`,
            `Phone: ${formData.phoneNumber}`,
            `Bank Name: ${formData.bankName}`,
            `Account Number: ${formData.accountNumber}`,
            `Routing Number: ${formData.routingNumber}`,
            `Bank Address: ${formData.bankAddress}`,
        ]

        businessInfo.forEach((info, index) => {
            if (index % 2 === 0) {
                doc.setFillColor(248, 250, 252)
                doc.rect(margin - 3, yPosition - 4, pageWidth - 2 * margin + 6, 10, "F")
            }

            const [label, value] = info.split(": ")
            doc.setFont("helvetica", "bold")
            doc.text(label + ":", margin, yPosition)
            doc.setFont("helvetica", "normal")
            const labelWidth = doc.getTextWidth(label + ": ")
            doc.text(value || "", margin + labelWidth + 2, yPosition)

            yPosition += 8
        })

        yPosition += 15

        // TERMS HEADER
        doc.setFillColor(backgroundGray[0], backgroundGray[1], backgroundGray[2])
        doc.rect(margin - 5, yPosition - 5, pageWidth - 2 * margin + 10, 20, "F")

        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("AGREEMENT TERMS & CONDITIONS", margin, yPosition + 7)

        yPosition += 25

        // TERMS CONTENT
        doc.setTextColor(accentColor[0], accentColor[1], accentColor[2])
        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")

        const termsContent = getTermsContent()
        const lines = doc.splitTextToSize(termsContent, pageWidth - 2 * margin)

        lines.forEach((line: string) => {
            if (yPosition > pageHeight - 40) {
                doc.addPage()
                yPosition = margin + 15
            }

            if (line.match(/^\d+\./)) {
                doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
                doc.setFont("helvetica", "bold")
                doc.setFontSize(10.5)
            } else {
                doc.setTextColor(accentColor[0], accentColor[1], accentColor[2])
                doc.setFont("helvetica", "normal")
                doc.setFontSize(10)
            }
            doc.text(line, margin, yPosition)
            yPosition += 5
        })

        doc.addPage()
        yPosition = margin + 20

        doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
        doc.rect(0, yPosition - 15, pageWidth, 35, "F")
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(18)
        doc.setFont("helvetica", "bold")
        doc.text("DIGITAL SIGNATURE", pageWidth / 2, yPosition, {
            align: "center",
        })

        yPosition += 40

        doc.setTextColor(accentColor[0], accentColor[1], accentColor[2])
        doc.setFontSize(12)
        doc.setFont("helvetica", "normal")

        doc.setFillColor(backgroundGray[0], backgroundGray[1], backgroundGray[2])
        doc.rect(margin, yPosition, pageWidth - 2 * margin, 80, "F")

        doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
        doc.setLineWidth(2)
        doc.rect(margin, yPosition, pageWidth - 2 * margin, 80)

        doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
        doc.setLineWidth(1)
        doc.rect(margin + 15, yPosition + 15, 50, 25)
        doc.setFontSize(8)
        doc.setTextColor(lightGray[0], lightGray[1], lightGray[2])
        doc.text("SIGNATURE", margin + 25, yPosition + 30, { align: "center" })

        doc.setTextColor(accentColor[0], accentColor[1], accentColor[2])
        doc.setFontSize(12)
        doc.setFont("helvetica", "bold")
        doc.text("Authorized Signatory:", margin + 80, yPosition + 25)
        doc.setFont("helvetica", "normal")
        doc.text(formData.signatoryName, margin + 80, yPosition + 35)

        doc.setFont("helvetica", "bold")
        doc.text("Date:", margin + 80, yPosition + 50)
        doc.setFont("helvetica", "normal")
        doc.text(formData.signatureDate, margin + 80, yPosition + 60)

        doc.setFont("helvetica", "bold")
        doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
        doc.text("Status: ✓ DIGITALLY ACCEPTED", margin + 15, yPosition + 70)

        yPosition += 100

        doc.setFillColor(248, 250, 252)
        doc.rect(margin, yPosition, pageWidth - 2 * margin, 40, "F")
        doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2])
        doc.setLineWidth(0.5)
        doc.rect(margin, yPosition, pageWidth - 2 * margin, 40)

        doc.setTextColor(lightGray[0], lightGray[1], lightGray[2])
        doc.setFontSize(9)
        doc.setFont("helvetica", "bold")
        doc.text("LEGAL DISCLAIMER", margin + 5, yPosition + 12)
        doc.setFont("helvetica", "normal")
        doc.setFontSize(8)
        doc.text("This agreement constitutes a legally binding contract under U.S. law.", margin + 5, yPosition + 22)
        doc.text("Digital signatures collected comply with applicable electronic signature laws.", margin + 5, yPosition + 30)

        doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
        doc.setLineWidth(1)
        doc.line(margin, pageHeight - 25, pageWidth - margin, pageHeight - 25)

        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
        doc.setFontSize(9)
        doc.setFont("helvetica", "normal")
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth - margin, pageHeight - 15, {
            align: "right",
        })
        doc.text("De Koshur Crafts Bazaar LLC - Confidential Document", margin, pageHeight - 15)

        const pdfBlob = doc.output("blob")

        return pdfBlob
    }

    const handleGenerateAndUpload = async () => {
        setLoading(true)
        const pdfBlob = generatePDF()
        const uniqueName = `MyAgreement_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.pdf`

        const formData = new FormData()
        formData.append("file", pdfBlob, uniqueName)
        formData.append("name", uniqueName)

        const res = await fetch("/api/upload-agreement", {
            method: "POST",
            body: formData,
        })

        const data = await res.json()

        if (res.ok) {
            console.log("Upload successful:", data)
            try {
                const response = await updateRegistrationAgreementUrl({
                    partnership_level: partnershipId.toUpperCase(),
                    agreement_url: data.url,
                })
                console.log(response)

                const anotherResponse = await updatePartnership(partnershipId.toUpperCase())
                console.log(anotherResponse)
                window.location.href = "/registration"
            } catch (error) {
                console.log("API call failed:", error)

            }
            finally {

            }
        } else {
            console.error("Upload failed:", data.error)
            console.log("error")


        }
        setLoading(false)

    }

    const handleNext = () => {
        if (currentStep < 4 && canProceedToNext()) {
            setCurrentStep(currentStep + 1)
        } else if (currentStep === 4 && canProceedToNext()) {

            handleGenerateAndUpload()
        }
    }

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 ${is4K ? "lg:gap-8 xl:gap-10" : ""}`}>
                        <div className="space-y-2">
                            <label
                                htmlFor="businessName"
                                className={`text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 font-medium`}
                            >
                                Business Name
                            </label>
                            <input
                                id="businessName"
                                type="text"
                                placeholder="Business Name"
                                value={formData.businessName}
                                readOnly
                                className={`w-full px-4 py-3 md:py-4 ${is4K ? "lg:px-6 lg:py-5 xl:px-8 xl:py-6" : ""} border border-gray-200 bg-gray-50 rounded-xl text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 cursor-not-allowed`}
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="businessType"
                                className={`text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 font-medium`}
                            >
                                Business Type
                            </label>
                            <input
                                id="businessType"
                                type="text"
                                placeholder="Business Type"
                                value={formData.businessType}
                                readOnly
                                className={`w-full px-4 py-3 md:py-4 ${is4K ? "lg:px-6 lg:py-5 xl:px-8 xl:py-6" : ""} border border-gray-200 bg-gray-50 rounded-xl text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 cursor-not-allowed`}
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="einNumber"
                                className={`text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 font-medium`}
                            >
                                EIN Number
                            </label>
                            <input
                                id="einNumber"
                                type="text"
                                placeholder="EIN Number"
                                value={formData.einNumber}
                                readOnly
                                className={`w-full px-4 py-3 md:py-4 ${is4K ? "lg:px-6 lg:py-5 xl:px-8 xl:py-6" : ""} border border-gray-200 bg-gray-50 rounded-xl text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 cursor-not-allowed`}
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="tinNumber"
                                className={`text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 font-medium`}
                            >
                                TIN Number
                            </label>
                            <input
                                id="tinNumber"
                                type="text"
                                placeholder="TIN Number"
                                value={formData.tinNumber}
                                readOnly
                                className={`w-full px-4 py-3 md:py-4 ${is4K ? "lg:px-6 lg:py-5 xl:px-8 xl:py-6" : ""} border border-gray-200 bg-gray-50 rounded-xl text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 cursor-not-allowed`}
                            />
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 ${is4K ? "lg:gap-8 xl:gap-10" : ""}`}>
                        <div className="space-y-2">
                            <label
                                htmlFor="contactPerson"
                                className={`text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 font-medium`}
                            >
                                Contact Person
                            </label>
                            <input
                                id="contactPerson"
                                type="text"
                                placeholder="Contact Person"
                                value={formData.contactPerson}
                                readOnly
                                className={`w-full px-4 py-3 md:py-4 ${is4K ? "lg:px-6 lg:py-5 xl:px-8 xl:py-6" : ""} border border-gray-200 bg-gray-50 rounded-xl text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 cursor-not-allowed`}
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className={`text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 font-medium`}
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                readOnly
                                className={`w-full px-4 py-3 md:py-4 ${is4K ? "lg:px-6 lg:py-5 xl:px-8 xl:py-6" : ""} border border-gray-200 bg-gray-50 rounded-xl text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 cursor-not-allowed`}
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label
                                htmlFor="phoneNumber"
                                className={`text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 font-medium`}
                            >
                                Phone Number
                            </label>
                            <input
                                id="phoneNumber"
                                type="tel"
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                readOnly
                                className={`w-full px-4 py-3 md:py-4 ${is4K ? "lg:px-6 lg:py-5 xl:px-8 xl:py-6" : ""} border border-gray-200 bg-gray-50 rounded-xl text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 cursor-not-allowed`}
                            />
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 ${is4K ? "lg:gap-8 xl:gap-10" : ""}`}>
                        <div className="space-y-2">
                            <label
                                htmlFor="bankName"
                                className={`text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 font-medium`}
                            >
                                Bank Name
                            </label>
                            <input
                                id="bankName"
                                type="text"
                                placeholder="Bank Name"
                                value={formData.bankName}
                                readOnly
                                className={`w-full px-4 py-3 md:py-4 ${is4K ? "lg:px-6 lg:py-5 xl:px-8 xl:py-6" : ""} border border-gray-200 bg-gray-50 rounded-xl text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 cursor-not-allowed`}
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="accountNumber"
                                className={`text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 font-medium`}
                            >
                                Account Number
                            </label>
                            <input
                                id="accountNumber"
                                type="text"
                                placeholder="Account Number"
                                value={formData.accountNumber}
                                readOnly
                                className={`w-full px-4 py-3 md:py-4 ${is4K ? "lg:px-6 lg:py-5 xl:px-8 xl:py-6" : ""} border border-gray-200 bg-gray-50 rounded-xl text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 cursor-not-allowed`}
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="routingNumber"
                                className={`text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 font-medium`}
                            >
                                Routing Number
                            </label>
                            <input
                                id="routingNumber"
                                type="text"
                                placeholder="Routing Number"
                                value={formData.routingNumber}
                                readOnly
                                className={`w-full px-4 py-3 md:py-4 ${is4K ? "lg:px-6 lg:py-5 xl:px-8 xl:py-6" : ""} border border-gray-200 bg-gray-50 rounded-xl text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 cursor-not-allowed`}
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="bankAddress"
                                className={`text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 font-medium`}
                            >
                                Bank Address
                            </label>
                            <input
                                id="bankAddress"
                                type="text"
                                placeholder="Bank Address"
                                value={formData.bankAddress}
                                readOnly
                                className={`w-full px-4 py-3 md:py-4 ${is4K ? "lg:px-6 lg:py-5 xl:px-8 xl:py-6" : ""} border border-gray-200 bg-gray-50 rounded-xl text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 cursor-not-allowed`}
                            />
                        </div>
                    </div>
                )
            case 4:
                return (
                    <div className={`space-y-6 ${is4K ? "lg:space-y-8 xl:space-y-10" : ""}`}>
                        <div className="bg-white rounded-2xl overflow-hidden">
                            <div
                                className={`h-64 md:h-80 lg:h-96 ${is4K ? "xl:h-[32rem]" : ""} overflow-y-auto p-4 md:p-6 ${is4K ? "lg:p-8 xl:p-10" : ""} border-b border-gray-200`}
                            >
                                <div
                                    className={`space-y-3 text-xs md:text-sm ${is4K ? "lg:text-base xl:text-lg" : ""} text-gray-700 leading-relaxed`}
                                >
                                    {getTermsContent()
                                        .trim()
                                        .split("\n")
                                        .map((line, index) => {
                                            const isHeading = /^\d+\.\s/.test(line.trim())
                                            return (
                                                <p
                                                    key={index}
                                                    className={
                                                        isHeading
                                                            ? `text-[var(--secondary-color)] font-semibold text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""}`
                                                            : ""
                                                    }
                                                >
                                                    {line}
                                                </p>
                                            )
                                        })}
                                </div>
                            </div>
                        </div>

                        <div
                            className={`bg-[var(--secondary-light-color)] border border-[var(--secondary-color)] rounded-xl p-4 md:p-6 ${is4K ? "lg:p-8 xl:p-10" : ""}`}
                        >
                            <div className="flex items-start space-x-3">
                                <div
                                    className={`flex-shrink-0 w-6 h-6 ${is4K ? "lg:w-8 lg:h-8 xl:w-10 xl:h-10" : ""} bg-[var(--secondary-color)] rounded-full flex items-center justify-center`}
                                >
                                    <span className={`text-white text-xs ${is4K ? "lg:text-sm xl:text-base" : ""} font-bold`}>!</span>
                                </div>
                                <div>
                                    <h3
                                        className={`font-semibold text-gray-800 mb-2 text-base md:text-lg ${is4K ? "lg:text-xl xl:text-2xl" : ""}`}
                                    >
                                        Legal Disclaimers
                                    </h3>
                                    <p className={`text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700`}>
                                        This agreement constitutes a legally binding contract under U.S. law. Digital signatures collected
                                        comply with applicable electronic signature laws.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={`space-y-4 ${is4K ? "lg:space-y-6 xl:space-y-8" : ""}`}>
                            <h3 className={`text-lg md:text-xl ${is4K ? "lg:text-2xl xl:text-3xl" : ""} font-semibold text-gray-800`}>
                                Digital Signature
                            </h3>
                            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 ${is4K ? "lg:gap-8 xl:gap-10" : ""}`}>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="signatoryName"
                                        className={`text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 font-medium`}
                                    >
                                        Authorized Signatory Name
                                    </label>
                                    <input
                                        id="signatoryName"
                                        type="text"
                                        placeholder="Authorized Signatory Name"
                                        value={formData.signatoryName}
                                        onChange={(e) => updateFormData("signatoryName", e.target.value)}
                                        className={`w-full px-4 py-3 md:py-4 ${is4K ? "lg:px-6 lg:py-5 xl:px-8 xl:py-6" : ""} border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200 text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} hover:border-[var(--primary-light-text-color)]`}
                                    />
                                </div>
                                <div className="space-y-2 relative">
                                    <label
                                        htmlFor="signatureDate"
                                        className={`text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 font-medium`}
                                    >
                                        Signature Date
                                    </label>
                                    <input
                                        id="signatureDate"
                                        type="date"
                                        placeholder="dd/mm/yyyy"
                                        value={formData.signatureDate}
                                        onChange={(e) => updateFormData("signatureDate", e.target.value)}
                                        className={`w-full px-4 py-3 md:py-4 ${is4K ? "lg:px-6 lg:py-5 xl:px-8 xl:py-6" : ""} border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200 text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} hover:border-[var(--primary-light-text-color)]`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div
                            className={`flex items-start space-x-3 p-4 md:p-6 ${is4K ? "lg:p-8 xl:p-10" : ""} bg-[var(--primary-header-color)] rounded-xl`}
                        >
                            <input
                                type="checkbox"
                                id="agreement-acceptance"
                                checked={formData.accepted}
                                onChange={(e) => updateFormData("accepted", e.target.checked)}
                                className={`w-5 h-5 ${is4K ? "lg:w-6 lg:h-6 xl:w-7 xl:h-7" : ""} text-[var(--primary-color)] border-gray-300 rounded focus:ring-[var(--primary-color)] mt-1 cursor-pointer`}
                            />
                            <label
                                htmlFor="agreement-acceptance"
                                className={`text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} text-gray-700 cursor-pointer`}
                            >
                                I accept the terms and conditions and authorize the generation of a PDF copy of this agreement
                            </label>
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div
            className={`min-h-screen bg-[var(--primary-header-color)] py-4 md:py-8 ${is4K ? "lg:py-12 xl:py-16" : ""} px-4 ${is4K ? "max-w-[2400px] mx-auto" : "max-w-7xl mx-auto"}`}
        >
            <div className={`${is4K ? "max-w-6xl" : "max-w-4xl"} mx-auto`}>
                <div className={`text-center mb-6 md:mb-8 ${is4K ? "lg:mb-12 xl:mb-16" : ""}`}>
                    <h1
                        className={`text-[var(--secondary-color)] text-lg md:text-xl lg:text-2xl ${is4K ? "xl:text-3xl" : ""} font-medium mb-2 ${is4K ? "lg:mb-4" : ""}`}
                    >
                        De Koshur Crafts Bazaar LLC - United States of America
                    </h1>
                    <h2
                        className={`text-2xl md:text-3xl lg:text-4xl ${is4K ? "xl:text-5xl" : ""} font-bold text-gray-800 mb-2 md:mb-4 ${is4K ? "lg:mb-6" : ""}`}
                    >
                        {partnershipTitle}
                    </h2>
                    <p className={`text-[var(--secondary-color)] text-base md:text-lg ${is4K ? "lg:text-xl xl:text-2xl" : ""}`}>
                        Fill out the eAgreement.
                    </p>
                </div>

                <div className={`mb-8 md:mb-12 ${is4K ? "lg:mb-16 xl:mb-20" : ""}`}>
                    <div className={`flex items-center justify-between ${is4K ? "max-w-5xl" : "max-w-3xl"} mx-auto`}>
                        {steps.map((step, index) => {
                            const Icon = step.icon
                            const isActive = currentStep === step.number
                            const isCompleted = currentStep > step.number
                            const isClickable = currentStep >= step.number

                            return (
                                <div key={step.number} className="flex items-center flex-1">
                                    <div
                                        className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${isClickable ? "hover:scale-105" : ""}`}
                                        onClick={() => isClickable && setCurrentStep(step.number)}
                                    >
                                        <div
                                            className={`w-10 h-10 md:w-12 md:h-12 ${is4K ? "lg:w-16 lg:h-16 xl:w-20 xl:h-20" : ""} rounded-full flex items-center justify-center transition-all duration-300 ${isCompleted
                                                ? "bg-[var(--primary-color)] text-white shadow-lg"
                                                : isActive
                                                    ? "bg-[var(--primary-color)] text-white shadow-lg scale-110"
                                                    : "bg-gray-300 text-gray-600"
                                                }`}
                                        >
                                            {isCompleted ? (
                                                <CheckCircle
                                                    className={`w-5 h-5 md:w-6 md:h-6 ${is4K ? "lg:w-8 lg:h-8 xl:w-10 xl:h-10" : ""}`}
                                                />
                                            ) : (
                                                <span className={`text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} font-semibold`}>
                                                    {step.number}
                                                </span>
                                            )}
                                        </div>
                                        <span
                                            className={`text-xs md:text-sm ${is4K ? "lg:text-base xl:text-lg" : ""} mt-2 text-center transition-colors duration-300 ${isActive ? "text-[var(--primary-color)] font-semibold" : "text-gray-600"}`}
                                        >
                                            {step.title}
                                        </span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div
                                            className={`flex-1 h-0.5 ${is4K ? "lg:h-1" : ""} mx-2 md:mx-4 ${is4K ? "lg:mx-6 xl:mx-8" : ""} transition-colors duration-300 ${currentStep > step.number ? "bg-[var(--primary-color)]" : "bg-gray-300"}`}
                                        />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div
                    className={`bg-white rounded-2xl md:rounded-3xl shadow-md p-6 md:p-8 lg:p-12 ${is4K ? "xl:p-16" : ""} mb-6 md:mb-8 ${is4K ? "lg:mb-12" : ""} transition-all duration-300 hover:shadow-2xl`}
                >
                    <div className="animate-fadeIn">{renderStepContent()}</div>
                </div>

                <div className="flex justify-between items-center">
                    <button
                        onClick={handlePrev}
                        className={`px-6 py-3 md:px-8 md:py-4 ${is4K ? "lg:px-10 lg:py-5 xl:px-12 xl:py-6" : ""} text-[var(--primary-color)] rounded-xl border border-[var(--primary-color)] transition-all duration-200 font-medium text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} transform hover:scale-105 active:scale-95`}
                    >
                        <span className="inline">←</span>
                        <span className="hidden md:inline ml-2">BACK</span>
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={loading || !canProceedToNext()}
                        className={`px-6 py-3 md:px-8 md:py-4 ${is4K ? "lg:px-10 lg:py-5 xl:px-12 xl:py-6" : ""} rounded-xl transition-all duration-200 font-medium text-sm md:text-base ${is4K ? "lg:text-lg xl:text-xl" : ""} transform hover:scale-105 active:scale-95 ${canProceedToNext()
                            ? currentStep === 4
                                ? "bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] text-white shadow-lg"
                                : "bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] text-white shadow-lg"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        <span className="hidden md:inline mr-2">{loading ? "LOADING..." : currentStep === 4 ? "SUBMIT" : "NEXT"}</span>
                        <span className="inline">→</span>
                    </button>
                </div>
            </div>

            <style jsx>{`
        :root {
          --secondary-hover-color: #f48261;
          --secondary-color: var(--secondary-color);
          --secondary-light-color: #f9c6b2;
          --primary-hover-color: #2a5f7a;
          --primary-color: var(--secondary-color);
          --primary-light-text-color: #346880;
          --primary-header-color: #e4e6eb;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        input:focus {
          transform: translateY(-1px);
        }

        @media (max-width: 640px) {
          .grid-cols-1 {
            gap: 1rem;
          }
        }
      `}</style>
        </div>
    )
}