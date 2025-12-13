"use client"
import { useState, useEffect } from "react"
import {
  getPartnershipLevels,
  updatePartnershipLevel,
  getAllPartnershipFees,
  updatePartnershipFee
} from "@/services/admin"

interface Partnership {
  id: number
  partnership_name: string
  prices: {
    "1st": string
    "2nd": string
    "3rd": string
  }
}

interface PartnershipFee {
  id: number
  level_group: string // e.g., "LEVEL_1"
  registration_fee: number
  lateral_fees: {
    "1st": number
    "2nd": number
    "3rd": number
  }
}

export default function PartnershipsPage() {
  // Old partnership levels state
  const [partnerships, setPartnerships] = useState<Partnership[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({
    partnership_name: "",
    prices: { "1st": "", "2nd": "", "3rd": "" },
  })

  // New partnership fees state
  const [partnershipFees, setPartnershipFees] = useState<PartnershipFee[]>([])
  const [editingFeeId, setEditingFeeId] = useState<number | null>(null)
  const [editFeeForm, setEditFeeForm] = useState({
    registration_fee: 0,
    lateral_fees: { "1st": 0, "2nd": 0, "3rd": 0 },
  })

  // Loading states
  const [loading, setLoading] = useState(true)
  const [savingLevel, setSavingLevel] = useState(false)
  const [savingFee, setSavingFee] = useState(false)

  useEffect(() => {
    loadAllData()
  }, [])

  const loadAllData = async () => {
    try {
      const [levelsResponse, feesResponse] = await Promise.all([
        getPartnershipLevels(),
        getAllPartnershipFees()
      ])
      setPartnerships(levelsResponse.data)
      setPartnershipFees(feesResponse.data)
    } catch (error) {
      console.error("Failed to load data:", error)
    } finally {
      setLoading(false)
    }
  }

  // === OLD PARTNERSHIP LEVELS LOGIC ===
  const startEdit = (partnership: Partnership) => {
    setEditingId(partnership.id)
    setEditForm({
      partnership_name: partnership.partnership_name,
      prices: { ...partnership.prices },
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({
      partnership_name: "",
      prices: { "1st": "", "2nd": "", "3rd": "" },
    })
  }

  const saveEdit = async () => {
    if (!editingId || savingLevel) return

    setSavingLevel(true)
    try {
      // Only send updated prices to the backend
      await updatePartnershipLevel(editingId, { prices: editForm.prices })

      setPartnerships((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...p, prices: editForm.prices }
            : p
        )
      )

      setEditingId(null)
      setEditForm({
        partnership_name: "",
        prices: { "1st": "", "2nd": "", "3rd": "" },
      })
    } catch (error) {
      console.error("Failed to update partnership prices:", error)
      alert("Failed to save changes. Please try again.")
    } finally {
      setSavingLevel(false)
    }
  }

  const formatPartnershipName = (name: string) => {
    return name
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase())
  }

  // === NEW PARTNERSHIP FEES LOGIC ===
  const startEditFee = (fee: PartnershipFee) => {
    setEditingFeeId(fee.id)
    setEditFeeForm({
      registration_fee: fee.registration_fee,
      lateral_fees: { ...fee.lateral_fees },
    })
  }

  const cancelEditFee = () => {
    setEditingFeeId(null)
    setEditFeeForm({
      registration_fee: 0,
      lateral_fees: { "1st": 0, "2nd": 0, "3rd": 0 },
    })
  }

  const saveEditFee = async () => {
    if (!editingFeeId || partnershipFees.length === 0 || savingFee) return

    const fee = partnershipFees.find(f => f.id === editingFeeId)
    if (!fee) return

    setSavingFee(true)
    try {
      const updateData: {
        registration_fee?: number
        lateral_fees?: Partial<{ "1st": number; "2nd": number; "3rd": number }>
      } = {}

      if (editFeeForm.registration_fee !== fee.registration_fee) {
        updateData.registration_fee = editFeeForm.registration_fee
      }
      if (
        editFeeForm.lateral_fees["1st"] !== fee.lateral_fees["1st"] ||
        editFeeForm.lateral_fees["2nd"] !== fee.lateral_fees["2nd"] ||
        editFeeForm.lateral_fees["3rd"] !== fee.lateral_fees["3rd"]
      ) {
        updateData.lateral_fees = editFeeForm.lateral_fees
      }

      if (Object.keys(updateData).length > 0) {
        await updatePartnershipFee(fee.level_group, updateData)
      }

      setPartnershipFees((prev) =>
        prev.map((f) =>
          f.id === editingFeeId
            ? {
                ...f,
                registration_fee: editFeeForm.registration_fee,
                lateral_fees: { ...editFeeForm.lateral_fees },
              }
            : f
        )
      )

      setEditingFeeId(null)
      setEditFeeForm({
        registration_fee: 0,
        lateral_fees: { "1st": 0, "2nd": 0, "3rd": 0 },
      })
    } catch (error) {
      console.error("Failed to update partnership fee:", error)
      alert("Failed to save changes. Please try again.")
    } finally {
      setSavingFee(false)
    }
  }

  const formatLevelName = (level: string) => {
    return level.replace("LEVEL_", "Level ").replace("_", " ")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Old Section - Partnership Levels */}
        <div className="mb-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">Partnership Levels Management</h1>
            <p className="text-gray-600">Manage pricing tiers for each partnership level</p>
          </div>

          <div className="grid gap-6">
            {partnerships.map((partnership) => (
              <div key={partnership.id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
                {editingId === partnership.id ? (
                  <div className="space-y-6">
                    {/* Partnership Name - Read Only */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Partnership Name</label>
                      <input
                        type="text"
                        value={editForm.partnership_name}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500 mt-1">Partnership names cannot be changed</p>
                    </div>

                    {/* Prices - Editable */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">Pricing Tiers</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {(["1st", "2nd", "3rd"] as const).map((tier) => (
                          <div key={tier}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{tier} Tier Price</label>
                            <input
                              type="number"
                              value={editForm.prices[tier]}
                              onChange={(e) =>
                                setEditForm((prev) => ({
                                  ...prev,
                                  prices: { ...prev.prices, [tier]: e.target.value },
                                }))
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                              disabled={savingLevel}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={saveEdit}
                        disabled={savingLevel}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {savingLevel && (
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                        )}
                        {savingLevel ? "Saving..." : "Save Prices"}
                      </button>
                      <button
                        onClick={cancelEdit}
                        disabled={savingLevel}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {formatPartnershipName(partnership.partnership_name)}
                        </h3>
                        <p className="text-sm text-gray-500">ID: {partnership.id}</p>
                      </div>
                      <button
                        onClick={() => startEdit(partnership)}
                        className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                      >
                        Edit Prices
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {(["1st", "2nd", "3rd"] as const).map((tier) => (
                        <div key={tier} className="bg-gray-50 p-4 rounded-md">
                          <div className="text-sm font-medium text-gray-700 mb-1">{tier} Tier</div>
                          <div className="text-2xl font-bold text-blue-600">${partnership.prices[tier]}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-16 border-t-2 border-gray-300"></div>

        {/* New Section - Partnership Fees */}
        <div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">Partnership Fees Management (Admin)</h1>
            <p className="text-gray-600">Manage registration and lateral fees for each level group</p>
          </div>

          <div className="grid gap-6">
            {partnershipFees.map((fee) => (
              <div key={fee.id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
                {editingFeeId === fee.id ? (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Editing {formatLevelName(fee.level_group)}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Registration Fee</label>
                        <input
                          type="number"
                          value={editFeeForm.registration_fee}
                          onChange={(e) =>
                            setEditFeeForm((prev) => ({
                              ...prev,
                              registration_fee: Number(e.target.value) || 0,
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                          disabled={savingFee}
                        />
                      </div>
                      {(["1st", "2nd", "3rd"] as const).map((tier) => (
                        <div key={tier}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">{tier} Lateral Fee</label>
                          <input
                            type="number"
                            value={editFeeForm.lateral_fees[tier]}
                            onChange={(e) =>
                              setEditFeeForm((prev) => ({
                                ...prev,
                                lateral_fees: { ...prev.lateral_fees, [tier]: Number(e.target.value) || 0 },
                              }))
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            disabled={savingFee}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={saveEditFee}
                        disabled={savingFee}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {savingFee && (
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                        )}
                        {savingFee ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        onClick={cancelEditFee}
                        disabled={savingFee}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {formatLevelName(fee.level_group)}
                        </h3>
                        <p className="text-sm text-gray-500">ID: {fee.id}</p>
                      </div>
                      <button
                        onClick={() => startEditFee(fee)}
                        className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                      >
                        Edit
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="text-sm font-medium text-gray-700 mb-1">Registration Fee</div>
                        <div className="text-2xl font-bold text-blue-600">${fee.registration_fee}</div>
                      </div>
                      {(["1st", "2nd", "3rd"] as const).map((tier) => (
                        <div key={tier} className="bg-gray-50 p-4 rounded-md">
                          <div className="text-sm font-medium text-gray-700 mb-1">{tier} Lateral</div>
                          <div className="text-2xl font-bold text-blue-600">${fee.lateral_fees[tier]}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}