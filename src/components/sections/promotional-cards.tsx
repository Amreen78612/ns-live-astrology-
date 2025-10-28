import Link from "next/link";
import { ArrowRight } from "lucide-react";

const promotions = [
  {
    label: "Live CHAT / CALL / VIDEO with",
    title: "OUR ASTROLOGERS",
    link: "/astrologers",
    linkText: "Read more",
    gradient: "from-[#1E3A8A]/80 to-transparent",
  },
  {
    label: "Interested to Learn Astrology with",
    title: "ASTROLOGY ONLINE COURSES",
    link: "/courses",
    linkText: "Know more",
    gradient: "from-[#FF6B35]/80 to-transparent",
  },
  {
    label: "Are You an Astrologer? we have",
    title: "FRANCHISE OFFER",
    link: "/franchise",
    linkText: "Know more",
    gradient: "from-[#10B981]/80 to-transparent",
  },
];

export const PromotionalCards = () => {
  return (
    <section className="py-16 px-8 bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promotions.map((promo, index) => (
            <Link
              key={index}
              href={promo.link}
              className="group relative h-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              {/* Background with gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A] to-[#0A1628]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532153955177-f59af40d6472?w=800')] bg-cover bg-center opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
              </div>

              {/* Content overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${promo.gradient} flex flex-col justify-end p-8`}
              >
                <p className="text-white text-sm mb-2 opacity-90">
                  {promo.label}
                </p>
                <h3 className="text-white text-3xl font-extrabold mb-4 leading-tight">
                  {promo.title.split(" ").map((word, i) => (
                    <span key={i}>
                      {i === promo.title.split(" ").length - 1 ? (
                        <span className="text-[#FF6B35]">{word}</span>
                      ) : (
                        word + " "
                      )}
                    </span>
                  ))}
                </h3>
                <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all">
                  <span className="underline">{promo.linkText}</span>
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
