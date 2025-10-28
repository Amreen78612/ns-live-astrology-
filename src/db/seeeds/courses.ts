import { db } from "@/db";
import { courses } from "@/db/schema";

async function main() {
  const currentDate = new Date().toISOString();

  const sampleCourses = [
    {
      title: "Foundation in Vedic Astrology",
      description:
        "A comprehensive introduction to the ancient science of Vedic Astrology, covering fundamental concepts, planetary movements, and basic chart interpretation techniques for beginners.",
      durationMonths: 4,
      level: "Beginner",
      price: 7500,
      instructorName: "Acharya Rajesh Sharma",
      totalStudents: 145,
      syllabus:
        "Introduction to Jyotish Shastra and its philosophical foundations. Understanding the zodiac signs, houses, and their significance. Planetary characteristics and their natural karakatvas. Basic chart construction and lagna determination. Introduction to planetary aspects and conjunctions. Understanding yogas and their basic interpretations. Dasha systems overview with focus on Vimshottari Dasha. Practical chart reading sessions with real-life examples.",
      isActive: true,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      title: "KP Astrology Mastery",
      description:
        "Master the Krishnamurti Paddhati system of astrology with in-depth study of sub-lords, cuspal interlinks, and precise timing techniques for accurate predictions.",
      durationMonths: 5,
      level: "Beginner",
      price: 9500,
      instructorName: "Dr. Meenakshi Iyer",
      totalStudents: 128,
      syllabus:
        "Fundamentals of KP system and its unique approach to astrology. Understanding planetary positions in KP ayanamsa. Star lord, sub lord, and sub-sub lord concepts in depth. Cuspal interlinks and their role in predictions. Ruling planets concept and its application in timing events. Significators and their determination for various life events. 249 techniques for precise event prediction. Horary astrology using KP principles. Practical case studies and chart analysis sessions.",
      isActive: true,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      title: "Predictive Techniques in Jyotish",
      description:
        "Learn advanced predictive methods in Vedic Astrology including transit analysis, divisional charts, and various dasha systems for accurate life event predictions.",
      durationMonths: 8,
      level: "Intermediate",
      price: 18000,
      instructorName: "Acharya Vikram Joshi",
      totalStudents: 87,
      syllabus:
        "Deep dive into Vimshottari Dasha and its sub-periods. Understanding and applying Yogini, Chara, and other dasha systems. Transit analysis and its correlation with dasha periods. Ashtakavarga basics and transit predictions. Divisional chart analysis - Navamsa, Dashamsa, Saptamsa etc. Timing of marriage, career, and major life events. Yogas for wealth, education, and spiritual growth. Afflictions, remedies, and their proper application. Integration of multiple predictive techniques for comprehensive analysis. Live prediction sessions with feedback.",
      isActive: true,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      title: "Planetary Transits and Dashas",
      description:
        "Comprehensive study of planetary transits, their effects on natal charts, and mastery of multiple dasha systems for timing predictions with precision.",
      durationMonths: 10,
      level: "Intermediate",
      price: 22000,
      instructorName: "Dr. Sunita Reddy",
      totalStudents: 64,
      syllabus:
        "Advanced transit principles and Gochar effects on natal planets. Saturn, Jupiter, and Rahu-Ketu transit cycles and their significance. Sade Sati analysis and its various phases. Ashtama Shani and Kandaka Shani effects. Vimshottari Dasha mastery with sub-period analysis. Yogini Dasha for female natives and its applications. Chara Dasha from Jaimini system principles. Conditional dashas and their application scenarios. Dasha-transit correlation for event timing. Practical workshops on real-time predictions.",
      isActive: true,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      title: "Medical Astrology",
      description:
        "Specialized course in medical astrology covering disease prediction, health analysis through planetary positions, and understanding constitutional vulnerabilities in birth charts.",
      durationMonths: 9,
      level: "Intermediate",
      price: 20000,
      instructorName: "Acharya Dr. Ramesh Kumar",
      totalStudents: 52,
      syllabus:
        "Ayurvedic principles and their astrological correlations. Planetary significations for body parts and organs. Disease prediction through 6th, 8th, and 12th house analysis. Analyzing ascendant for constitutional health patterns. Understanding marakas and their role in health matters. Chronic vs acute disease indicators in charts. Mental health and psychological disorder indicators. Timing of health issues through dasha and transit. Preventive measures and astrological remedies for health. Case studies of medical conditions through chart analysis.",
      isActive: true,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      title: "Nadi Astrology Advanced",
      description:
        "Advanced training in the ancient Nadi system of astrology, including thumb impression analysis, past life karma readings, and precise predictions using palm leaf manuscripts principles.",
      durationMonths: 14,
      level: "Advanced",
      price: 42000,
      instructorName: "Acharya Ganesh Bhat",
      totalStudents: 28,
      syllabus:
        "History and philosophy of Nadi Astrology system. Understanding the 150 Nadi principles and their applications. Thumb impression classification and its significance. Planetary combinations unique to Nadi system. Past life karma analysis through special yogas. Prediction of spouse details with remarkable accuracy. Children prediction and progeny-related matters. Career and financial fortune through Nadi rules. Remedial measures specific to Nadi astrology. Death timing indicators and longevity assessment. Integration with modern Vedic astrology techniques. Practical sessions with ancient manuscript interpretations.",
      isActive: true,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      title: "Gemology and Remedial Measures",
      description:
        "Complete guide to astrological gemstones, their properties, wearing procedures, and comprehensive remedial measures including mantras, yantras, and charitable acts for planetary afflictions.",
      durationMonths: 12,
      level: "Advanced",
      price: 35000,
      instructorName: "Dr. Priya Deshmukh",
      totalStudents: 41,
      syllabus:
        "Scientific basis of gemstone therapy in astrology. Identifying planetary afflictions requiring remedies. Gemstone selection based on birth chart analysis. Proper weight calculation and metal combinations. Auspicious timing for wearing gemstones. Mantra therapy for nine planets with pronunciation. Yantra construction and energization procedures. Charitable acts and dana for planetary appeasement. Rudraksha therapy and its astrological applications. Color therapy and directional remedies. Practical gemstone identification and quality assessment. Case studies of successful remedial implementations.",
      isActive: true,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    {
      title: "Ashtakavarga System Expert Course",
      description:
        "Master the sophisticated Ashtakavarga system for transit predictions, understanding benefic points, and applying this ancient technique for accurate timing and longevity analysis.",
      durationMonths: 16,
      level: "Expert",
      price: 68000,
      instructorName: "Acharya Dr. Subramaniam Iyer",
      totalStudents: 19,
      syllabus:
        "Complete Ashtakavarga theory and calculation methods. Bhinnashtakavarga for individual planetary analysis. Sarvashtakavarga and its role in overall life assessment. Kakshya lords and their significance in predictions. Trikona Shodhana and Ekadhipatya Shodhana procedures. Transit predictions using benefic point analysis. Longevity determination through Ashtakavarga principles. Marriage timing and compatibility through AV system. Career and financial predictions using planetary points. Pinpoint accuracy in event timing with AV transits. Advanced applications in medical and mundane astrology. Research papers review and dissertation guidance. Professional consultation practice development.",
      isActive: true,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
  ];

  await db.insert(courses).values(sampleCourses);

  console.log("✅ Courses seeder completed successfully");
}

main().catch((error) => {
  console.error("❌ Seeder failed:", error);
});
