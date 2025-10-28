import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Award, Trophy, Medal } from "lucide-react";

const awards = [
  {
    year: "2024",
    title: "Best Astrology Service Provider",
    organization: "Indian Astrology Awards",
  },
  {
    year: "2023",
    title: "Excellence in Vedic Consultation",
    organization: "National Astrology Council",
  },
  {
    year: "2023",
    title: "Top Rated Astrology Platform",
    organization: "Digital Excellence Awards",
  },
  {
    year: "2022",
    title: "Most Trusted Astrology Service",
    organization: "Customer Choice Awards",
  },
  {
    year: "2022",
    title: "Innovation in KP Astrology",
    organization: "Astro Tech Summit",
  },
  {
    year: "2021",
    title: "Best Customer Service",
    organization: "Service Excellence Awards",
  },
];

const certifications = [
  {
    name: "ISO 9001:2015 Certified",
    issuer: "International Organization for Standardization",
    date: "2023",
  },
  {
    name: "Vedic Astrology Council Member",
    issuer: "All India Astrology Federation",
    date: "2020",
  },
  {
    name: "KP Astrology Research Institute",
    issuer: "KP Stellar Astrological Research Institute",
    date: "2019",
  },
  {
    name: "Digital Security Certified",
    issuer: "Cyber Security Council",
    date: "2024",
  },
];

const achievements = [
  { number: "473+", label: "Expert Astrologers" },
  { number: "54+", label: "Vedic Pandits" },
  { number: "3,860+", label: "Happy Customers" },
  { number: "50+", label: "Awards & Recognitions" },
  { number: "25+", label: "Years Combined Experience" },
  { number: "15,000+", label: "Consultations Completed" },
];

export default function CertificatesPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-16 px-4 md:px-8 bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="text-[#FFD700]" size={32} />
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A]">
                Certificates & Awards
              </h1>
            </div>
            <p className="text-xl text-[#666] max-w-3xl mx-auto">
              Recognized for excellence in Vedic astrology services and customer
              satisfaction
            </p>
          </div>

          {/* Awards Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#1E3A8A] mb-8 text-center">
              Our Awards & Recognitions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all hover:-translate-y-2"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center flex-shrink-0">
                      <Trophy className="text-white" size={32} />
                    </div>
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-[#FF6B35] text-white text-xs font-bold rounded-full mb-2">
                        {award.year}
                      </span>
                      <h3 className="text-lg font-bold text-[#1E3A8A] mb-2">
                        {award.title}
                      </h3>
                      <p className="text-sm text-[#666]">
                        {award.organization}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#1E3A8A] mb-8 text-center">
              Professional Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all border-l-4 border-[#10B981]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0">
                      <Medal className="text-white" size={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-[#666] mb-1">
                        Issued by: {cert.issuer}
                      </p>
                      <p className="text-xs text-[#888]">Date: {cert.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Stats */}
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] rounded-2xl shadow-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Our Achievements
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-sm md:text-base text-white/90 font-medium">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Section */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <Award className="text-[#FF6B35] mx-auto mb-6" size={64} />
              <h2 className="text-3xl font-bold text-[#1E3A8A] mb-4">
                Trusted by Thousands
              </h2>
              <p className="text-lg text-[#666] leading-relaxed">
                NS Live Astro is recognized as one of India's leading astrology
                service providers. Our commitment to authenticity, accuracy, and
                customer satisfaction has earned us numerous awards and the
                trust of thousands of satisfied clients across the country.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
