import { db } from "@/db";
import { astrologers } from "@/db/schema";

async function main() {
  const currentDate = new Date().toISOString();

  const sampleAstrologers = [
    {
      name: "Dr. Rajesh Kumar Sharma",
      specialization: "Vedic Astrology, Gemology",
      experience: 28,
      rating: 4.9,
      bio: "Dr. Rajesh Kumar Sharma is a renowned Vedic astrologer with 28 years of experience. Specializing in Vedic Astrology and Gemology, he has guided thousands of clients through life challenges using ancient wisdom and gemstone therapy. His accurate predictions and practical remedies have earned him recognition across India.",
      fees: 2500,
      language: "Hindi, English, Sanskrit",
      availability: "Available",
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Priya Lakshmi Iyer",
      specialization: "KP Astrology, Numerology",
      experience: 15,
      rating: 4.7,
      bio: "Priya Lakshmi Iyer brings 15 years of expertise in KP Astrology and Numerology. Known for her precise timing predictions using Krishnamurti Paddhati system, she specializes in career guidance, marriage compatibility, and name corrections through numerology. Her compassionate approach helps clients find clarity in complex situations.",
      fees: 1800,
      language: "Tamil, English, Hindi, Telugu",
      availability: "Available",
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Swami Anand Bharti",
      specialization: "Nadi Astrology, Palmistry",
      experience: 22,
      rating: 4.8,
      bio: "Swami Anand Bharti is a master of ancient Nadi Astrology with 22 years of practice. Combining Nadi readings with Palmistry, he provides deep insights into past karma and future possibilities. His spiritual guidance and detailed palm readings have helped countless seekers find their life purpose and overcome obstacles.",
      fees: 2200,
      language: "Hindi, English, Bengali, Marathi",
      availability: "Available",
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Meera Devi Patel",
      specialization: "Tarot Reading, Vastu Shastra",
      experience: 12,
      rating: 4.6,
      bio: "Meera Devi Patel is an intuitive Tarot reader and Vastu consultant with 12 years of experience. Her unique combination of Tarot guidance and Vastu corrections helps clients harmonize their energy and living spaces. She specializes in relationship counseling, business decisions, and home energy balancing.",
      fees: 1500,
      language: "Gujarati, Hindi, English",
      availability: "Available",
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Pandit Vishwanath Rao",
      specialization: "Vedic Astrology, Vastu Shastra",
      experience: 30,
      rating: 5.0,
      bio: "Pandit Vishwanath Rao is a highly revered Vedic astrologer with three decades of experience. A master of Vedic Astrology and Vastu Shastra, he has served prominent families and business houses. His expertise in muhurta selection, horoscope matching, and Vastu corrections has brought prosperity to thousands of clients.",
      fees: 3000,
      language: "Kannada, Telugu, Hindi, English",
      availability: "Available",
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Shalini Mukherjee",
      specialization: "Numerology, Tarot Reading",
      experience: 9,
      rating: 4.5,
      bio: "Shalini Mukherjee is a gifted Numerologist and Tarot reader with 9 years of practice. Her modern approach to ancient sciences makes her popular among young professionals seeking guidance. She specializes in name corrections, lucky number analysis, and Tarot-based career and relationship counseling.",
      fees: 1200,
      language: "Bengali, Hindi, English",
      availability: "Available",
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Acharya Ramesh Joshi",
      specialization: "KP Astrology, Palmistry",
      experience: 18,
      rating: 4.7,
      bio: "Acharya Ramesh Joshi combines 18 years of KP Astrology expertise with traditional Palmistry. His scientific approach to astrology and detailed palm analysis provides accurate predictions for career, health, and relationships. Known for his straightforward guidance and effective remedies.",
      fees: 1900,
      language: "Marathi, Hindi, English",
      availability: "Available",
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Dr. Kavita Reddy",
      specialization: "Gemology, Numerology",
      experience: 7,
      rating: 4.4,
      bio: "Dr. Kavita Reddy is a certified Gemologist and Numerologist with 7 years of experience. Her scientific background combined with astrological knowledge helps clients choose the right gemstones and numbers for prosperity. She specializes in gemstone therapy, business name analysis, and birth chart corrections.",
      fees: 1000,
      language: "Telugu, Tamil, English, Hindi",
      availability: "Available",
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Guruji Harish Chandra",
      specialization: "Nadi Astrology, Vedic Astrology",
      experience: 25,
      rating: 4.9,
      bio: "Guruji Harish Chandra is a distinguished Nadi and Vedic astrologer with 25 years of spiritual practice. His profound knowledge of ancient palm leaf manuscripts and Vedic principles provides deep karmic insights. He specializes in spiritual counseling, past life readings, and remedial measures for life challenges.",
      fees: 2800,
      language: "Hindi, English, Punjabi",
      availability: "Available",
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Anjali Deshmukh",
      specialization: "Vastu Shastra, Palmistry",
      experience: 11,
      rating: 4.6,
      bio: "Anjali Deshmukh is an accomplished Vastu consultant and Palmist with 11 years of expertise. Her holistic approach integrates space harmony with hand analysis to provide comprehensive life guidance. She helps families and businesses create positive environments while offering insights through palmistry for personal growth.",
      fees: 1600,
      language: "Marathi, Hindi, English",
      availability: "Available",
      createdAt: currentDate,
      updatedAt: currentDate,
    },
  ];

  await db.insert(astrologers).values(sampleAstrologers);

  console.log("✅ Astrologers seeder completed successfully");
}

main().catch((error) => {
  console.error("❌ Seeder failed:", error);
});
