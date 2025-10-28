import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Image as ImageIcon, Video, Users, Flame } from "lucide-react";

const galleryCategories = [
  {
    title: "Pooja Ceremonies",
    icon: Flame,
    images: 24,
    color: "from-[#FF6B35] to-[#FF8C42]",
  },
  {
    title: "Astrology Consultations",
    icon: Users,
    images: 18,
    color: "from-[#0066FF] to-[#0052CC]",
  },
  {
    title: "Course Sessions",
    icon: ImageIcon,
    images: 32,
    color: "from-[#10B981] to-[#059669]",
  },
  {
    title: "Events & Workshops",
    icon: Video,
    images: 15,
    color: "from-[#1E3A8A] to-[#0F1F4A]",
  },
];

const recentPhotos = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  category: ["Pooja", "Consultation", "Course", "Event"][i % 4],
  title: `${["Ganesh Pooja", "Birth Chart Reading", "KP Astrology Class", "Astrology Seminar"][i % 4]} ${Math.floor(i / 4) + 1}`,
}));

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-16 px-4 md:px-8 bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <ImageIcon className="text-[#FF6B35]" size={32} />
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A]">
                Gallery
              </h1>
            </div>
            <p className="text-xl text-[#666] max-w-3xl mx-auto">
              Explore our collection of photos and videos from poojas,
              consultations, courses, and events
            </p>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {galleryCategories.map((category, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${category.color} rounded-xl p-8 text-white cursor-pointer hover:shadow-2xl transition-all hover:-translate-y-2`}
              >
                <category.icon className="mb-4" size={48} />
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-white/90">{category.images} photos</p>
              </div>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#1E3A8A] mb-6">
              Recent Photos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {recentPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative aspect-square bg-gradient-to-br from-[#6B7280] to-[#4B5563] rounded-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all hover:scale-105 group"
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <ImageIcon className="mx-auto mb-2" size={32} />
                      <p className="font-semibold">{photo.title}</p>
                      <span className="text-xs opacity-75">
                        {photo.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#1E3A8A] mb-6">
              Video Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="relative aspect-video bg-gradient-to-br from-[#1E3A8A] to-[#0F1F4A] rounded-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all hover:scale-105 group"
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 rounded-full bg-[#FF6B35] flex items-center justify-center mx-auto mb-3">
                        <Video className="text-white" size={32} />
                      </div>
                      <p className="font-semibold">
                        {
                          [
                            "Pooja Ceremony",
                            "Consultation Session",
                            "Course Lecture",
                            "Workshop Highlights",
                          ][i % 4]
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
            <ImageIcon className="mx-auto mb-4" size={64} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to Share Your Experience?
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
              If you've attended our poojas, consultations, or courses, we'd
              love to feature your photos in our gallery!
            </p>
            <button className="bg-white text-[#FF6B35] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#F8F9FA] transition-colors">
              Submit Your Photos
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
