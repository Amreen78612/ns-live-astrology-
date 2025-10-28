import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { FileText, Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

const articles = [
  {
    id: 1,
    title: "Understanding the Impact of Planetary Transits on Your Life",
    excerpt:
      "Discover how planetary movements affect your daily life and learn to harness their energy for positive outcomes.",
    author: "Dr. Rajesh Kumar",
    date: "March 15, 2024",
    category: "Vedic Astrology",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "KP Astrology: A Modern Approach to Ancient Wisdom",
    excerpt:
      "Learn about Krishnamurti Paddhati and its revolutionary approach to astrological predictions.",
    author: "Acharya Sharma",
    date: "March 12, 2024",
    category: "KP Astrology",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Remedies for Mangal Dosha in Marriage",
    excerpt:
      "Effective Vedic remedies to nullify the effects of Mangal Dosha for a happy married life.",
    author: "Pt. Sanjay Mishra",
    date: "March 10, 2024",
    category: "Remedies",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "The Power of Gemstones in Astrological Healing",
    excerpt:
      "How wearing the right gemstone can transform your life and bring prosperity.",
    author: "Dr. Anita Rao",
    date: "March 8, 2024",
    category: "Gemstones",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "Vastu Tips for Positive Energy in Your Home",
    excerpt:
      "Simple Vastu changes that can attract wealth, health, and happiness to your living space.",
    author: "Astro Vikram Singh",
    date: "March 5, 2024",
    category: "Vastu",
    readTime: "4 min read",
  },
  {
    id: 6,
    title: "Career Astrology: Finding Your True Calling",
    excerpt:
      "Use astrological insights to discover the career path that aligns with your destiny.",
    author: "Jyotish Acharya",
    date: "March 3, 2024",
    category: "Career",
    readTime: "6 min read",
  },
];

const categories = [
  "All",
  "Vedic Astrology",
  "KP Astrology",
  "Remedies",
  "Gemstones",
  "Vastu",
  "Career",
];

export default function ArticlesPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-16 px-4 md:px-8 bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FileText className="text-[#FF6B35]" size={32} />
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A]">
                Astrology Articles
              </h1>
            </div>
            <p className="text-base text-[#888] max-w-2xl mx-auto">
              Read insightful articles on astrology, remedies, and spiritual
              guidance from our expert astrologers
            </p>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  index === 0
                    ? "bg-[#FF6B35] text-white"
                    : "bg-white text-[#1E3A8A] hover:bg-[#FF6B35] hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow group"
              >
                {/* Article Header */}
                <div className="bg-gradient-to-r from-[#1E3A8A] to-[#0F1F4A] p-6 text-white">
                  <span className="inline-block bg-[#FF6B35] text-white text-xs px-3 py-1 rounded-full mb-3">
                    {article.category}
                  </span>
                  <h2 className="text-xl font-bold leading-tight min-h-[70px] group-hover:text-[#FFD700] transition-colors">
                    {article.title}
                  </h2>
                </div>

                {/* Article Body */}
                <div className="p-6">
                  <p className="text-[#666] text-sm mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-2 mb-6 text-xs text-[#888]">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-[#FF6B35]" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-[#FF6B35]" />
                        <span>{article.date}</span>
                      </div>
                      <span className="font-semibold text-[#1E3A8A]">
                        {article.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Read More Link */}
                  <Link
                    href={`/articles/${article.id}`}
                    className="flex items-center gap-2 text-[#FF6B35] font-semibold hover:gap-4 transition-all group"
                  >
                    Read Full Article
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Subscription */}
          <div className="mt-16 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Get weekly astrology insights, predictions, and remedies delivered
              straight to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg text-[#1E3A8A] focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-[#1E3A8A] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0F1F4A] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
