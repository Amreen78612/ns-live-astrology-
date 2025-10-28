import { db } from "@/db";
import { poojas } from "@/db/schema";

async function main() {
  const currentDate = new Date().toISOString();

  const samplePoojas = [
    {
      name: "Satyanarayan Puja",
      description:
        "Satyanarayan Puja is performed to seek blessings of Lord Vishnu for prosperity, happiness, and fulfillment of wishes. This sacred ritual brings peace, removes obstacles, and ensures success in personal and professional life. Ideal for housewarming, business opening, or any auspicious occasion.",
      durationHours: "3-4 hours",
      requiredPandits: 1,
      price: 3500,
      includesMaterials: true,
      isActive: true,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Ganesh Puja",
      description:
        "Ganesh Puja is performed to invoke Lord Ganesha's blessings for removing obstacles and ensuring success in new ventures. This puja brings wisdom, prosperity, and good fortune. Perfect for starting new business, education, or any important endeavor in life.",
      durationHours: "2-3 hours",
      requiredPandits: 1,
      price: 2500,
      includesMaterials: true,
      isActive: true,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Navagraha Shanti",
      description:
        "Navagraha Shanti Puja is performed to pacify the nine planets and reduce malefic effects in one's horoscope. This powerful ritual helps overcome planetary doshas, brings harmony, improves health, wealth, and relationships. Recommended when facing persistent challenges or during unfavorable planetary transits.",
      durationHours: "4-5 hours",
      requiredPandits: 2,
      price: 8500,
      includesMaterials: true,
      isActive: true,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Rudrabhishek",
      description:
        "Rudrabhishek is a sacred ritual dedicated to Lord Shiva, performed with elaborate abhishekam using sacred materials. This powerful puja removes negative energies, grants spiritual growth, fulfills desires, and provides protection. Beneficial for health issues, mental peace, and overcoming difficult situations.",
      durationHours: "3-4 hours",
      requiredPandits: 2,
      price: 6500,
      includesMaterials: true,
      isActive: true,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Lakshmi Puja",
      description:
        "Lakshmi Puja is performed to invoke Goddess Lakshmi's blessings for wealth, prosperity, and abundance. This auspicious ritual brings financial stability, business growth, and material comforts. Especially beneficial on Fridays and during Diwali season for attracting positive energy and prosperity.",
      durationHours: "2-3 hours",
      requiredPandits: 1,
      price: 3000,
      includesMaterials: true,
      isActive: true,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Griha Pravesh",
      description:
        "Griha Pravesh is an essential ceremony performed before entering a new home. This comprehensive puja purifies the space, removes negative energies, and invokes divine blessings for peace, prosperity, and happiness. Includes Vastu Puja, Ganesh Puja, and havan for auspicious beginning in new residence.",
      durationHours: "4-5 hours",
      requiredPandits: 2,
      price: 7500,
      includesMaterials: true,
      isActive: true,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Vastu Shanti Puja",
      description:
        "Vastu Shanti Puja is performed to correct Vastu doshas and bring harmony to your living or working space. This ritual balances the five elements, removes negative vibrations, and creates positive energy flow. Recommended for homes or offices facing recurring problems, disputes, or lack of peace.",
      durationHours: "5-6 hours",
      requiredPandits: 3,
      price: 12000,
      includesMaterials: true,
      isActive: true,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Durga Puja",
      description:
        "Durga Puja is performed to seek blessings of Goddess Durga for strength, courage, and protection from evil forces. This powerful ritual removes obstacles, defeats enemies, and grants victory over challenges. Brings divine feminine energy, prosperity, and shields family from negative influences.",
      durationHours: "3-4 hours",
      requiredPandits: 2,
      price: 5500,
      includesMaterials: true,
      isActive: true,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Mahamrityunjaya Jaap",
      description:
        "Mahamrityunjaya Jaap is a powerful healing ritual involving chanting of the sacred Mahamrityunjaya mantra. This puja is performed for overcoming serious health issues, life-threatening situations, and prolonging life. Grants protection from untimely death, accidents, and brings overall well-being and longevity.",
      durationHours: "5-6 hours",
      requiredPandits: 3,
      price: 15000,
      includesMaterials: true,
      isActive: true,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      name: "Kaal Sarp Dosh Nivaran",
      description:
        "Kaal Sarp Dosh Nivaran Puja is performed to neutralize the malefic effects of Kaal Sarp Yoga in horoscope. This specialized ritual removes obstacles in career, marriage, health, and overall life progress. Brings relief from chronic problems, anxiety, and opens doors to success and prosperity.",
      durationHours: "4-5 hours",
      requiredPandits: 2,
      price: 10000,
      includesMaterials: true,
      isActive: true,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
  ];

  await db.insert(poojas).values(samplePoojas);

  console.log("✅ Poojas seeder completed successfully");
}

main().catch((error) => {
  console.error("❌ Seeder failed:", error);
});
