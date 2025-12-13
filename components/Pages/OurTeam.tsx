'use client'
import TeamCard from "@/components/Cards/TeamCard";
import VerticalHeroSlider from "@/components/Essentials/VerticalBanner";
import RectangleSection from "@/components/Section/RectangleSection";
import TeamGrid from "@/components/Material/TeamGrid";
import React from "react";
import TeamPage from "@/components/Essentials/TeamPage";
import SectionTitle from "@/components/Section/SectionTitle";
import { useGlobalContext } from "@/context/ScreenProvider";

export default function OurTeam() {
  const { is4K } = useGlobalContext();

  // ================= DATA ==================
  const teamMembers = [
    {
      isImportant: true,
      name: "Susan McDonald",
      title: "Chief Operating Officer (USA)",
      email: "susan.scheff@example.com",
      imageUrl: "/images/team-susan.jpg",
      description:
        "Susan oversees De Koshur Crafts’ U.S. operations, partnerships, and retail growth strategy. With years of experience in cross-cultural leadership and global commerce, she ensures the seamless alignment of American markets with Kashmiri craftsmanship.",
      quote:
        "Every sale must tell a story—of heritage, fairness, and shared humanity.",
    },
    {
      name: "Fayaz Ahmad Khan",
      isImportant: true,
      isCeo: true,
      title: "Founder & CEO",
      email: "fayaz.ahmad@example.com",
      imageUrl: "/images/team-fayaz.jpg",
      description:
        "As the visionary behind De Koshur Crafts, Fayaz combines his background in environmental science and international trade to empower artisans and revolutionize Kashmir’s craft industry. He leads innovation, sustainability, and policy advocacy across borders.",
      quote:
        "Our mission is to make Kashmiri crafts a global movement of ethics, culture, and resilience.",
      social: {
        facebook: "#",
        vimeo: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      isImportant: true,
      name: "Jasif Ahmed Khan",
      title: "Director – India & South Asia",
      email: "jasif.khan@example.com",
      imageUrl: "/images/team-jasif.jpg",
      description:
        "Based in Kashmir, Jasif leads artisan coordination, vendor development, and regional compliance. His deep connection to Kashmir’s craft economy bridges local artisans with global supply chains while preserving authenticity and ethical production.",
      quote:
        "Our artisans carry centuries of wisdom; my role is to protect their voice in modern trade.",
    },
  ];

  const divisions = [
    {
      name: "Engineering & DevOps",
      members: [
        { name: "Michael Torres", title: "Lead Software Engineer" },
        { name: "Ava Robinson", title: "Frontend Developer" },
        { name: "Liam Patel", title: "Backend Developer" },
        { name: "Noah Williams", title: "QA Engineer" },
      ],
    },
    {
      name: "Blockchain & AI Systems",
      members: [
        { name: "Sophia Martinez", title: "Blockchain Traceability Engineer" },
        { name: "Ethan Johnson", title: "AI Personalization Developer" },
        { name: "Olivia Reed", title: "Data Systems Analyst" },
        { name: "Jacob Brown", title: "Security & Authentication Lead" },
      ],
    },
    {
      name: "Integration & CMS",
      members: [
        { name: "Emily Carter", title: "API Integration Manager" },
        { name: "Ryan Anderson", title: "CMS Architect" },
        { name: "Chloe Bennett", title: "DevOps Manager" },
        { name: "Grace Miller", title: "Platform Support Engineer" },
      ],
    },
    {
      name: "Vendor Onboarding & Artisan Support Division",
      description: "Our dedicated team ensures seamless vendor onboarding, digital literacy, and continuous welfare support for artisans worldwide.",
      subSections: [
        {
          subName: "Onboarding & Training",
          members: [
            { name: "Jessica Nguyen", title: "Vendor Onboarding Manager" },
            { name: "Lauren Mitchell", title: "Digital Literacy Trainer" },
            { name: "Carlos Rivera", title: "GI Documentation Specialist" },
            { name: "Alyssa Chen", title: "Vendor Dashboard Support Officer" },
          ],
        },
        {
          subName: "Support & Welfare",
          members: [
            { name: "Marcus Green", title: "Vendor Helpdesk Lead" },
            { name: "Natalie Brooks", title: "Grievance & Retention Manager" },
            { name: "Hannah Cooper", title: "Women’s Collective Coordinator" },
            { name: "David Ross", title: "Tool & Tech Support Officer" },
          ],
        },
      ],
    },
    {
      name: "Logistics & Packaging Division",
      description: "Ensuring every Kashmiri craft reaches the world safely, beautifully, and sustainably.",
      subSections: [
        {
          subName: "Logistics Operations",
          members: [
            { name: "Daniel Foster", title: "Logistics Manager" },
            { name: "Rachel Adams", title: "Fulfillment Coordinator" },
            { name: "Anthony Cooper", title: "Customs Compliance Officer" },
            { name: "Megan Blake", title: "Order Tracking Specialist" },
          ],
        },
        {
          subName: "Packaging & Handling",
          members: [
            { name: "Brandon Scott", title: "Eco-Packaging Designer" },
            { name: "Sophie Turner", title: "Unboxing Experience Lead" },
            { name: "Christopher Hall", title: "Fragile Goods Safety Engineer" },
            { name: "Lauren Hayes", title: "Branding & Label Compliance Officer" },
          ],
        },
      ],
    },
    {
      name: "Sustainability & ESG Division",
      description: "Building a conscious trade model that aligns craftsmanship with global sustainability goals and ethical governance.",
      members: [
        { name: "Evelyn Carter", title: "Head of Sustainability" },
        { name: "Marcus Bennett", title: "Carbon Tagging Analyst" },
        { name: "Sophia Ramirez", title: "Craft Waste Circularity Officer" },
        { name: "Jonathan Reed", title: "ESG Policy Integration Manager" },
      ],
    },
    {
      name: "Compliance & Legal Division",
      description: "Upholding transparency, ethical sourcing, and full regulatory compliance across every aspect of the global craft trade network.",
      members: [
        { name: "Michael Grant", title: "Chief Compliance Officer" },
        { name: "Olivia Hayes", title: "GI/IP Legal Advisor" },
        { name: "William Brooks", title: "Vendor Contract Officer" },
        { name: "Sophia Klein", title: "Labor Ethics Auditor" },
      ],
    },
    {
      name: "Quality Assurance & Traceability Division",
      description: "Ensuring every Kashmiri craft meets the highest global benchmarks for authenticity, traceability, and artisan excellence.",
      members: [
        { name: "Robert Ellis", title: "Master Craft Appraiser" },
        { name: "Emily Carter", title: "GI Verification Officer" },
        { name: "James Walker", title: "Product Grading Specialist" },
        { name: "Natalie Brooks", title: "Quality Dispute Resolution Lead" },
      ],
    },
    {
      name: "Global Partnerships & Expansion Division",
      description: "Driving international collaborations, global franchises, and cross-border trade programs that expand Kashmir’s artisan economy with integrity and innovation.",
      subSections: [
        {
          subName: "Global Strategy & Franchise",
          members: [
            { name: "Daniel Reed", title: "Global Partnership Director" },
            { name: "Jessica Miller", title: "U.S. Franchise Manager" },
            { name: "Amira Lopez", title: "MENA Trade Liaison" },
            { name: "Christopher Hayes", title: "Licensing Legal Officer" },
          ],
        },
        {
          subName: "Program Operations",
          members: [
            { name: "Benjamin Cooper", title: "Consignment Program Manager" },
            { name: "Samantha Wright", title: "Exhibition & Event Coordinator" },
            { name: "Logan Price", title: "Dropshipping Relations Lead" },
            { name: "Natalie Grant", title: "Partner Onboarding Specialist" },
          ],
        },
      ],
    },
    {
      name: "Marketing & Buyer Engagement Division",
      description: "Connecting hearts and heritage through data-driven storytelling, impactful campaigns, and global buyer engagement strategies that elevate Kashmiri craftsmanship.",
      members: [
        { name: "Madison Cole", title: "Chief Marketing Officer" },
        { name: "Ethan Ross", title: "Campaign Manager" },
        { name: "Isabella Turner", title: "CRM & Buyer Loyalty Officer" },
        { name: "Noah Carter", title: "Communications & PR Specialist" },
      ],
    },
    {
      name: "Media & Visual Content Division",
      description: "Capturing the soul of craftsmanship through storytelling, photography, and film — blending creativity with precision to bring Kashmiri heritage to global screens.",
      members: [
        { name: "Evelyn Brooks", title: "Visual Content Director" },
        { name: "Jason Rivera", title: "Craft Videographer" },
        { name: "Lauren Mitchell", title: "Product Photographer" },
        { name: "Sophia Bennett", title: "Post-Production Editor" },
      ],
    },
    {
      name: "Craft Research & Documentation Division",
      description: "Preserving authenticity through rigorous research, data-driven analysis, and cultural storytelling — documenting the legacy of Kashmiri artisans for global archives and future generations.",
      members: [
        { name: "Dr. Olivia Carter", title: "Head of Craft Research" },
        { name: "Liam Bennett", title: "GI Region Data Analyst" },
        { name: "Emily Foster", title: "Artisan Biographer" },
        { name: "Grace Morgan", title: "Cultural Translator" },
      ],
    },
    {
      name: "Finance, Grants & Investment Division",
      description: "Driving transparency, fiscal growth, and impact funding — this division manages capital flow, grant allocation, and investor engagement to ensure sustainable development and global expansion of Kashmiri craft industries.",
      members: [
        { name: "Michael Grant", title: "Chief Financial Officer" },
        { name: "David Collins", title: "Financial Controller" },
        { name: "Sophia Lewis", title: "Grants Program Manager" },
        { name: "Benjamin Harris", title: "Investor Relations Officer" },
      ],
    },
    {
      name: "Customer & Vendor Support Division",
      description: "At the heart of our service ecosystem, this division ensures seamless communication, quick resolution, and proactive support for both artisans and global buyers — bridging cultural distances through care, precision, and transparency.",
      members: [
        { name: "Emma Reed", title: "Global Support Manager" },
        { name: "Daniel Brooks", title: "Buyer Support Agent" },
        { name: "Olivia James", title: "Vendor Helpdesk Officer" },
        { name: "Rachel Miller", title: "Knowledgebase & FAQ Editor" },
      ],
    },
    {
      name: "Trade Intelligence & Risk Division",
      description: "Analyzing market shifts, forecasting trends, and mitigating business risks — this division strengthens global trade strategy through data-driven insights, policy readiness, and cross-border resilience planning.",
      members: [
        { name: "Ethan Walker", title: "Trade Intelligence Lead" },
        { name: "Ava Thompson", title: "Global Trends Analyst" },
        { name: "Noah Carter", title: "Conflict Risk Planner" },
        { name: "Lily Adams", title: "Policy Response Coordinator" },
      ],
    },
    {
      name: "Monitoring & Impact Division",
      description: "This division measures real-world change — evaluating environmental, social, and governance performance while ensuring that every initiative delivers measurable value, accountability, and transparent impact across the global craft ecosystem.",
      members: [
        { name: "Jacob Reed", title: "Monitoring & Evaluation Officer" },
        { name: "Alyssa Torres", title: "ESG Impact Analyst" },
        { name: "Logan Patel", title: "Social ROI Evaluator" },
        { name: "Grace Mitchell", title: "Transparency Report Lead" },
      ],
    },
    {
      name: "Localization & Regional Trade Division",
      description: "Bridging global markets through cultural precision and regional expertise, this division ensures that our trade, communication, and branding strategies resonate authentically across continents—strengthening connections between artisans, buyers, and cultures worldwide.",
      members: [
        { name: "Nathan Cole", title: "Localization Manager" },
        { name: "Emily Parker", title: "Regional Trade Lead – North America" },
        { name: "Omar Rahman", title: "Regional Trade Lead – MENA" },
        { name: "Sofia Laurent", title: "Regional Trade Lead – Europe" },
      ],
    },
    {
      name: "Ethics, Inclusion & Transparency Division",
      description: "This division safeguards fairness, diversity, and accountability within every layer of our trade ecosystem. It ensures ethical governance, equal opportunity, and transparent reporting — building trust across vendors, buyers, and communities worldwide.",
      members: [
        { name: "Sophia Reed", title: "Head of Inclusion" },
        { name: "David Torres", title: "Accessibility & Equity Officer" },
        { name: "Isabella Grant", title: "Ethics Audit Coordinator" },
        { name: "Michael Carter", title: "Transparency Reporting Manager" },
      ],
    },
    {
      name: "Innovation & Craft-Tech Lab",
      description: "Where creativity meets technology. This division pioneers advanced solutions for traditional craftsmanship — from augmented reality experiences and blockchain authentication to sustainable materials research — ensuring that heritage and innovation evolve together for a smarter, greener future.",
      members: [
        { name: "Ethan Clarke", title: "Innovation Lab Director" },
        { name: "Ava Martinez", title: "AR/VR Craft Experience Developer" },
        { name: "Noah Rivera", title: "Blockchain/NFT Tag Lead" },
        { name: "Lila Thompson", title: "Sustainable Dye Researcher" },
      ],
    },
    {
      name: "Admin & CMS Control Division",
      description: "The operational backbone of digital governance. This division manages content workflows, access hierarchies, and moderation integrity across all platforms — ensuring seamless collaboration, secure data handling, and system reliability for every user tier.",
      members: [
        { name: "Alex Morgan", title: "Super Admin" },
        { name: "Emma Liu", title: "CMS Workflow Manager" },
        { name: "Ryan Scott", title: "Role Permissions Coordinator" },
        { name: "Sophia Bennett", title: "Internal Testing & Moderation Lead" },
      ],
    },
  ];

  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative">
        <VerticalHeroSlider />
      </section>

      {/* Rectangle Highlight Section */}
      <div className="py-6"><RectangleSection /></div>


      {/* Team Members Section */}
      <section className="py-20 bg-[var(--primary-color)] text-center">
        <SectionTitle SubTitle='Our Team' Title='Our Leadership Team' />
        <p className="text-gray-300 mb-12 mt-6 max-w-3xl mx-auto px-2">
          Our core team members bring vision, innovation, and commitment to the heart of De Koshur Crafts.
        </p>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 justify-items-center max-w-6xl mx-auto ">
          {teamMembers.map((member, idx) => (
            <TeamCard key={idx} {...member} />
          ))}
        </div>
      </section>

      {/* Divisions Section */}
      <section className="py-20 bg-gray-100 text-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle SubTitle="Our Divisions" Title="Meet Our Specialized Teams" />
          <p className="text-gray-600 mb-12 mt-6 max-w-3xl mx-auto text-center">
            Our diverse divisions work together to ensure every aspect of De Koshur Crafts operates with precision, creativity, and a commitment to global impact.
          </p>
          <div className="space-y-16">
            {divisions.map((division, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white rounded-lg shadow-lg p-8 transform hover:scale-[1.02] transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-[var(--primary-color)] mb-4">{division.name}</h3>
                  {division.description && (
                    <p className="text-gray-600 mb-6">{division.description}</p>
                  )}
                  {division.subSections ? (
                    <div className="space-y-8">
                      {division.subSections.map((subSection, subIdx) => (
                        <div key={subIdx}>
                          <h4 className="text-xl font-semibold text-[var(--secondary-color)] mb-4">{subSection.subName}</h4>
                          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {subSection.members.map((member, memberIdx) => (
                              <div
                                key={memberIdx}
                                className="bg-[var(--secondary-color)] p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
                              >
                                <p className="text-lg font-medium text-white">{member.name}</p>
                                <p className="text-sm text-white">{member.title}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {division.members.map((member, memberIdx) => (
                        <div
                          key={memberIdx}
                          className="bg-[var(--secondary-color)] p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                          <p className="text-lg font-medium text-white">{member.name}</p>
                          <p className="text-sm text-white">{member.title}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TeamPage />
    </div>
  );
}