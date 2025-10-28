import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { BookOpen, Star } from "lucide-react";

const books = [
  {
    title: "Advanced KP Astrology Techniques",
    author: "Dr. K.S. Krishnamurti",
    price: "₹499",
    rating: 4.8,
    description:
      "Comprehensive guide to Krishnamurti Paddhati astrology system",
  },
  {
    title: "Vedic Astrology for Beginners",
    author: "Pt. Sanjay Rath",
    price: "₹399",
    rating: 4.9,
    description: "Perfect introduction to Vedic astrology principles",
  },
  {
    title: "Nadi Astrology Revealed",
    author: "R. Santhanam",
    price: "₹599",
    rating: 4.7,
    description: "Ancient palm leaf astrology secrets decoded",
  },
  {
    title: "Predictive Astrology Techniques",
    author: "B.V. Raman",
    price: "₹449",
    rating: 4.9,
    description: "Master the art of accurate astrological predictions",
  },
  {
    title: "Remedial Measures in Astrology",
    author: "K.N. Rao",
    price: "₹549",
    rating: 4.6,
    description: "Effective remedies for planetary afflictions",
  },
  {
    title: "Astrology and Spirituality",
    author: "David Frawley",
    price: "₹699",
    rating: 4.8,
    description: "Connect astrology with spiritual practice",
  },
];

export default function BooksPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-16 px-4 md:px-8 bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="text-[#FF6B35]" size={32} />
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A]">
                Astrology Books
              </h1>
            </div>
            <p className="text-xl text-[#666] max-w-3xl mx-auto">
              Explore our collection of authentic astrology books by renowned
              authors
            </p>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className="w-full h-64 bg-gradient-to-br from-[#FF6B35] to-[#1E3A8A] rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="text-white" size={80} />
                </div>
                <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">
                  {book.title}
                </h3>
                <p className="text-sm text-[#FF6B35] font-semibold mb-2">
                  {book.author}
                </p>
                <p className="text-sm text-[#666] mb-4 line-clamp-2">
                  {book.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-[#1E3A8A]">
                    {book.price}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="text-[#FFD700] fill-[#FFD700]" size={16} />
                    <span className="text-sm font-semibold">{book.rating}</span>
                  </div>
                </div>
                <button className="w-full bg-[#FF6B35] text-white py-3 rounded-lg font-semibold hover:bg-[#FF5722] transition-colors">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
