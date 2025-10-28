import { db } from "@/db";
import { pandits } from "@/db/schema";

async function main() {
  const currentDate = new Date().toISOString();

  const samplePandits = [
    {
      name: "Pandit Rajesh Kumar Shastri",
      email: "rajesh@panditservices.com",
      phone: "+91-9876543210",
      experienceYears: 18,
      specializations: "Graha Shanti, Vivah Sanskar, Navagraha Puja",
      languages: "Hindi, Sanskrit, English",
      isAvailable: true,
      bio: "Pandit Rajesh Kumar Shastri is a highly experienced Vedic scholar with 18 years of expertise in performing traditional Hindu ceremonies. Trained under renowned gurus in Varanasi, he specializes in Graha Shanti pujas, wedding ceremonies, and Navagraha rituals. His deep knowledge of Sanskrit mantras and Vedic traditions ensures authentic and spiritually enriching experiences for devotees.",
      imageUrl: null,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Pandit Venkatesh Iyer",
      email: "venkatesh@panditservices.com",
      phone: "+91-9845123456",
      experienceYears: 22,
      specializations: "Rudrabhishek, Satyanarayan Puja, Vastu Puja",
      languages: "Tamil, Telugu, Sanskrit, English",
      isAvailable: true,
      bio: "With 22 years of dedicated service, Pandit Venkatesh Iyer is renowned for his expertise in Rudrabhishek and Satyanarayan Puja ceremonies. Hailing from a traditional Brahmin family in Tamil Nadu, he has performed thousands of pujas across South India. His profound understanding of Vastu Shastra makes him the ideal choice for home blessing ceremonies.",
      imageUrl: null,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Pandit Aditya Sharma",
      email: "aditya@panditservices.com",
      phone: "+91-9123456789",
      experienceYears: 12,
      specializations: "Vivah Sanskar, Navagraha Puja, Lakshmi Puja",
      languages: "Hindi, English, Sanskrit",
      isAvailable: true,
      bio: "Pandit Aditya Sharma brings 12 years of experience in conducting traditional wedding ceremonies and auspicious pujas. Educated at the prestigious Sanskrit University in Haridwar, he is known for his melodious chanting and precise ritualistic knowledge. His specialty lies in Vivah Sanskar and Lakshmi Puja, ensuring prosperity and divine blessings for families.",
      imageUrl: null,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Pandit Suresh Chandra Mishra",
      email: "suresh@panditservices.com",
      phone: "+91-9567890123",
      experienceYears: 25,
      specializations: "Graha Shanti, Rudrabhishek, Satyanarayan Puja",
      languages: "Hindi, Bengali, Sanskrit",
      isAvailable: true,
      bio: "With an impressive 25 years of experience, Pandit Suresh Chandra Mishra is a revered scholar from Kolkata. His expertise in Graha Shanti and Rudrabhishek pujas has helped countless families overcome planetary doshas and achieve peace. Trained in traditional Vedic schools, his authentic approach and deep spiritual knowledge make every ceremony meaningful and transformative.",
      imageUrl: null,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Pandit Ramakrishna Bhatt",
      email: "ramakrishna@panditservices.com",
      phone: "+91-9234567890",
      experienceYears: 15,
      specializations: "Vastu Puja, Navagraha Puja, Lakshmi Puja",
      languages: "Hindi, Sanskrit, Telugu",
      isAvailable: true,
      bio: "Pandit Ramakrishna Bhatt is a dedicated Vedic priest with 15 years of experience in performing Vastu and prosperity-related pujas. Coming from a lineage of temple priests in Andhra Pradesh, he has deep knowledge of Vastu Shastra and planetary remedies. His Navagraha and Lakshmi Pujas are known for bringing harmony and abundance to homes and businesses.",
      imageUrl: null,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Pandit Ganesh Prasad Joshi",
      email: "ganesh@panditservices.com",
      phone: "+91-9876012345",
      experienceYears: 8,
      specializations: "Vivah Sanskar, Satyanarayan Puja, Graha Shanti",
      languages: "Hindi, English, Sanskrit",
      isAvailable: true,
      bio: "Pandit Ganesh Prasad Joshi is an enthusiastic young priest with 8 years of experience in traditional Hindu ceremonies. Trained in Rishikesh under senior pandits, he specializes in wedding rituals and Satyanarayan Puja. His friendly demeanor and clear explanation of rituals in both Hindi and English make him popular among modern families seeking authentic ceremonies.",
      imageUrl: null,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Pandit Krishnan Namboothiri",
      email: "krishnan@panditservices.com",
      phone: "+91-9345678901",
      experienceYears: 20,
      specializations: "Rudrabhishek, Lakshmi Puja, Vastu Puja",
      languages: "Tamil, Sanskrit, English",
      isAvailable: true,
      bio: "Pandit Krishnan Namboothiri hails from a traditional Kerala Brahmin family with 20 years of priestly experience. His expertise in Rudrabhishek and Lakshmi Puja rituals follows authentic South Indian traditions. Known for his meticulous attention to Vedic protocols and powerful mantras, he ensures divine blessings and positive energy in every ceremony he conducts.",
      imageUrl: null,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Pandit Mahesh Trivedi",
      email: "mahesh@panditservices.com",
      phone: "+91-9456789012",
      experienceYears: 3,
      specializations: "Navagraha Puja, Satyanarayan Puja, Vivah Sanskar",
      languages: "Hindi, English, Sanskrit",
      isAvailable: true,
      bio: "Pandit Mahesh Trivedi is a young and energetic priest with 3 years of dedicated service in Vedic rituals. Though early in his career, he has received rigorous training from senior pandits in Gujarat and demonstrates exceptional knowledge of Navagraha and Satyanarayan Puja ceremonies. His clear explanations and respectful approach make traditional rituals accessible to younger generations.",
      imageUrl: null,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
  ];

  await db.insert(pandits).values(samplePandits);

  console.log("✅ Pandits seeder completed successfully");
}

main().catch((error) => {
  console.error("❌ Seeder failed:", error);
});
