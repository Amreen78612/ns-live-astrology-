import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Planetary Transit & Dasha Analysis",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/images/ser1-6.png",
    borderColor: "#FFD700",
    link: "/planetary-transit",
  },
  {
    title: "Free Kundli",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/images/ser2-7.png",
    borderColor: "#000000",
    link: "/free-kundli",
  },
  {
    title: "Match Kundli",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/icons/icon-99-1.png",
    borderColor: "#FF6B35",
    link: "/match-kundli",
  },
  {
    title: "Speak With Astrologers",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/icons/icon-2-2.png",
    borderColor: "#10B981",
    link: "/astrologers",
  },
  {
    title: "Astrology Courses",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/icons/icon-4-3.png",
    borderColor: "#FF6B35",
    link: "/courses",
  },
  {
    title: "Astrology Books",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/icons/icon-4-3.png",
    borderColor: "#0066FF",
    link: "/books",
  },
  {
    title: "Yoga Classes",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/images/yoga-8.png",
    borderColor: "#10B981",
    link: "/yoga",
  },
  {
    title: "Vastu Consultation",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/images/vastu-9.png",
    borderColor: "#FFD700",
    link: "/vastu",
  },
  {
    title: "Buy Gemstones",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/images/gemstones-10.png",
    borderColor: "#FF6B35",
    link: "/gemstones",
  },
  {
    title: "Homas",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/images/homas-11.png",
    borderColor: "#FF0000",
    link: "/homas",
  },
  {
    title: "Our Pandits",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/images/pandit-12.png",
    borderColor: "#0066FF",
    link: "/pandits",
  },
  {
    title: "Book A Pooja",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/images/pandits-13.png",
    borderColor: "#10B981",
    link: "/book-pooja",
  },
  {
    title: "Articles",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/images/Article_File-14.webp",
    borderColor: "#FFD700",
    link: "/articles",
  },
  {
    title: "Astrology PDF",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/images/artcle-15.webp",
    borderColor: "#FF6B35",
    link: "/pdf",
  },
  {
    title: "Certificates & Awards",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/images/Certif-16.webp",
    borderColor: "#0066FF",
    link: "/certificates",
  },
  {
    title: "Gallery",
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1ab6a79-93d6-4c27-9ebd-a3cd5ad3d3bb-nsliveastro-com/assets/images/gallery-17.webp",
    borderColor: "#10B981",
    link: "/gallery",
  },
];

export const ServicesGrid = () => {
  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.link}
              className="bg-white rounded-xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-6 relative"
                style={{
                  border: `3px dashed ${service.borderColor}`,
                }}
              >
                <div className="relative w-16 h-16">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-3 group-hover:text-[#FF6B35] transition-colors">
                {service.title}
              </h3>
              <div className="w-16 h-1 bg-[#FF6B35] rounded-full"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
