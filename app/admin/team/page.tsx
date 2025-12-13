"use client"

import type React from "react"

import { useState, useEffect } from "react"

import { leadership, divisions, type TeamMember, type Division } from "@/lib/team-data"
import {
  Search,
  Mail,
  Users,
  Building2,
  Trash2,
  UserPlus,
  Facebook,
  Twitter,
  Linkedin,
  Video,
  Edit3,
  Save,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

export default function TeamPage() {
  const [allMembers, setAllMembers] = useState<TeamMember[]>([])
  const [allDivisions, setAllDivisions] = useState<Division[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDivision, setSelectedDivision] = useState("all")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingMember, setEditingMember] = useState<string | null>(null)
  const [editingDivision, setEditingDivision] = useState<string | null>(null)
  const [expandedDivisions, setExpandedDivisions] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    division: "",
  })
  const [editFormData, setEditFormData] = useState({
    name: "",
    title: "",
    email: "",
  })
  const [editDivisionName, setEditDivisionName] = useState("")

  useEffect(() => {
    const allDivisionMembers = divisions.flatMap((division) => division.members)
    setAllMembers([...leadership, ...allDivisionMembers])
    setAllDivisions([...divisions])
    // Expand all divisions by default
    setExpandedDivisions(new Set(divisions.map((d) => d.name)))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newMember: TeamMember = {
      name: formData.name,
      title: formData.title,
      email: formData.email,
     
    }
    setAllMembers([...allMembers, newMember])
    setFormData({ name: "", title: "", email: "", division: "" })
    setShowAddForm(false)
  }

  const handleRemove = (email: string) => {
    setAllMembers(allMembers.filter((member) => member.email !== email))
    // Also remove from divisions
    setAllDivisions(
      allDivisions.map((division) => ({
        ...division,
        members: division.members.filter((member) => member.email !== email),
      })),
    )
  }

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member.email)
    setEditFormData({
      name: member.name,
      title: member.title,
      email: member.email,
    })
  }

  const handleSaveMember = () => {
    setAllMembers(
      allMembers.map((member) =>
        member.email === editingMember
          ? { ...member, name: editFormData.name, title: editFormData.title, email: editFormData.email }
          : member,
      ),
    )
    setAllDivisions(
      allDivisions.map((division) => ({
        ...division,
        members: division.members.map((member) =>
          member.email === editingMember
            ? { ...member, name: editFormData.name, title: editFormData.title, email: editFormData.email }
            : member,
        ),
      })),
    )
    setEditingMember(null)
  }

  const handleEditDivision = (divisionName: string) => {
    setEditingDivision(divisionName)
    setEditDivisionName(divisionName)
  }

  const handleSaveDivision = () => {
    setAllDivisions(
      allDivisions.map((division) =>
        division.name === editingDivision ? { ...division, name: editDivisionName } : division,
      ),
    )
    setEditingDivision(null)
  }

  const toggleDivision = (divisionName: string) => {
    const newExpanded = new Set(expandedDivisions)
    if (newExpanded.has(divisionName)) {
      newExpanded.delete(divisionName)
    } else {
      newExpanded.add(divisionName)
    }
    setExpandedDivisions(newExpanded)
  }

  const filteredMembers = allMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())

    if (selectedDivision === "all") return matchesSearch
    if (selectedDivision === "leadership") return matchesSearch && member.isImportant

    const division = allDivisions.find((d) => d.name === selectedDivision)
    if (division) {
      return matchesSearch && division.members.some((m) => m.email === member.email)
    }

    return matchesSearch
  })

  const totalMembers = allMembers.length
  const leadershipCount = leadership.length
  const divisionsCount = allDivisions.length

  return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Team Management</h1>
            <p className="text-slate-600 mt-2 text-lg">Manage team members across all divisions and departments</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            {showAddForm ? "Cancel" : "Add Team Member"}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Members</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{totalMembers}</p>
              </div>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Leadership Team</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{leadershipCount}</p>
              </div>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Divisions</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{divisionsCount}</p>
              </div>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Add Member Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Add New Team Member</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Job Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter job title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Division</label>
                <select
                  value={formData.division}
                  onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Division</option>
                  {allDivisions.map((division) => (
                    <option key={division.name} value={division.name}>
                      {division.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Team Member
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-48"
          >
            <option value="all">All Divisions</option>
            <option value="leadership">Leadership Team</option>
            {allDivisions.map((division) => (
              <option key={division.name} value={division.name}>
                {division.name}
              </option>
            ))}
          </select>
        </div>

        {/* Leadership Section */}
        {(selectedDivision === "all" || selectedDivision === "leadership") && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Leadership Team</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {
                    leadership.filter(
                      (member) =>
                        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        member.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        member.email.toLowerCase().includes(searchTerm.toLowerCase()),
                    ).length
                  }{" "}
                  members
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Social
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {leadership
                    .filter(
                      (member) =>
                        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        member.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        member.email.toLowerCase().includes(searchTerm.toLowerCase()),
                    )
                    .map((member) => (
                      <tr key={member.email} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              {editingMember === member.email ? (
                                <input
                                  type="text"
                                  value={editFormData.name}
                                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                  className="text-sm font-medium text-slate-900 border border-slate-300 rounded px-2 py-1"
                                />
                              ) : (
                                <div className="text-sm font-medium text-slate-900">{member.name}</div>
                              )}
                              {member.isCeo && (
                                <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                  CEO
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {editingMember === member.email ? (
                            <input
                              type="text"
                              value={editFormData.title}
                              onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                              className="text-sm text-blue-600 font-medium border border-slate-300 rounded px-2 py-1"
                            />
                          ) : (
                            <div className="text-sm text-blue-600 font-medium">{member.title}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-slate-600">
                            <Mail className="w-4 h-4 mr-2" />
                            {editingMember === member.email ? (
                              <input
                                type="email"
                                value={editFormData.email}
                                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                                className="border border-slate-300 rounded px-2 py-1"
                              />
                            ) : (
                              member.email
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {member.social && (
                            <div className="flex items-center space-x-2">
                              {member.social.facebook && (
                                <a href={member.social.facebook} className="text-slate-400 hover:text-blue-600">
                                  <Facebook className="w-4 h-4" />
                                </a>
                              )}
                              {member.social.twitter && (
                                <a href={member.social.twitter} className="text-slate-400 hover:text-blue-600">
                                  <Twitter className="w-4 h-4" />
                                </a>
                              )}
                              {member.social.linkedin && (
                                <a href={member.social.linkedin} className="text-slate-400 hover:text-blue-600">
                                  <Linkedin className="w-4 h-4" />
                                </a>
                              )}
                              {member.social.vimeo && (
                                <a href={member.social.vimeo} className="text-slate-400 hover:text-blue-600">
                                  <Video className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {editingMember === member.email ? (
                              <>
                                <button
                                  onClick={handleSaveMember}
                                  className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                                >
                                  <Save className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setEditingMember(null)}
                                  className="p-1 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEditMember(member)}
                                  className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleRemove(member.email)}
                                  className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Divisions */}
        {allDivisions
          .filter((division) => selectedDivision === "all" || selectedDivision === division.name)
          .map((division) => {
            const filteredDivisionMembers = division.members.filter(
              (member) =>
                member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.email.toLowerCase().includes(searchTerm.toLowerCase()),
            )

            if (filteredDivisionMembers.length === 0 && searchTerm) return null

            const isExpanded = expandedDivisions.has(division.name)

            return (
              <div key={division.name} className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button onClick={() => toggleDivision(division.name)} className="p-1 hover:bg-slate-200 rounded">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-slate-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-600" />
                        )}
                      </button>
                      {editingDivision === division.name ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={editDivisionName}
                            onChange={(e) => setEditDivisionName(e.target.value)}
                            className="text-xl font-bold text-slate-900 border border-slate-300 rounded px-2 py-1"
                          />
                          <button
                            onClick={handleSaveDivision}
                            className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingDivision(null)}
                            className="p-1 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <h2 className="text-xl font-bold text-slate-900">{division.name}</h2>
                          <button
                            onClick={() => handleEditDivision(division.name)}
                            className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full">
                      {filteredDivisionMembers.length} members
                    </span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Member
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {filteredDivisionMembers.map((member) => (
                          <tr key={member.email} className="hover:bg-slate-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                  <span className="text-white font-semibold text-xs">
                                    {member.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </span>
                                </div>
                                {editingMember === member.email ? (
                                  <input
                                    type="text"
                                    value={editFormData.name}
                                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                    className="text-sm font-medium text-slate-900 border border-slate-300 rounded px-2 py-1"
                                  />
                                ) : (
                                  <div className="text-sm font-medium text-slate-900">{member.name}</div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {editingMember === member.email ? (
                                <input
                                  type="text"
                                  value={editFormData.title}
                                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                                  className="text-sm text-blue-600 font-medium border border-slate-300 rounded px-2 py-1"
                                />
                              ) : (
                                <div className="text-sm text-blue-600 font-medium">{member.title}</div>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center text-sm text-slate-600">
                                <Mail className="w-4 h-4 mr-2" />
                                {editingMember === member.email ? (
                                  <input
                                    type="email"
                                    value={editFormData.email}
                                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                                    className="border border-slate-300 rounded px-2 py-1"
                                  />
                                ) : (
                                  <span className="truncate">{member.email}</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                {editingMember === member.email ? (
                                  <>
                                    <button
                                      onClick={handleSaveMember}
                                      className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                                    >
                                      <Save className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => setEditingMember(null)}
                                      className="p-1 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => handleEditMember(member)}
                                      className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                                    >
                                      <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleRemove(member.email)}
                                      className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )
          })}

        {/* No Results */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No team members found</h3>
            <p className="text-slate-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
  )
}
