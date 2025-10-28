import { NextRequest, NextResponse } from "next/server";

// Types for horoscope data
interface HoroscopeData {
  sign: string;
  period: string;
  prediction: string;
  luckyNumber: number;
  luckyColor: string;
  mood: string;
  compatibility: string;
}

interface BirthChartRequest {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  place: string;
  latitude: number;
  longitude: number;
}

// Zodiac signs with dates
const ZODIAC_SIGNS = [
  { name: "Aries", dates: "Mar 21 - Apr 19" },
  { name: "Taurus", dates: "Apr 20 - May 20" },
  { name: "Gemini", dates: "May 21 - Jun 20" },
  { name: "Cancer", dates: "Jun 21 - Jul 22" },
  { name: "Leo", dates: "Jul 23 - Aug 22" },
  { name: "Virgo", dates: "Aug 23 - Sep 22" },
  { name: "Libra", dates: "Sep 23 - Oct 22" },
  { name: "Scorpio", dates: "Oct 23 - Nov 21" },
  { name: "Sagittarius", dates: "Nov 22 - Dec 21" },
  { name: "Capricorn", dates: "Dec 22 - Jan 19" },
  { name: "Aquarius", dates: "Jan 20 - Feb 18" },
  { name: "Pisces", dates: "Feb 19 - Mar 20" },
];

// South Indian and North Indian specific predictions
const REGIONAL_PREDICTIONS = {
  south: {
    emphasis: ["Career", "Family", "Education", "Marriage"],
    elements: ["Earth", "Water"],
    deities: ["Venkateswara", "Murugan", "Shiva", "Lakshmi"],
  },
  north: {
    emphasis: ["Finance", "Love", "Health", "Travel"],
    elements: ["Fire", "Air"],
    deities: ["Krishna", "Rama", "Durga", "Ganesha"],
  },
};

// Generate horoscope predictions
function generateHoroscope(
  sign: string,
  period: string,
  region: string = "north",
): HoroscopeData {
  const predictions = [
    "A favorable day for new beginnings and taking initiative.",
    "Focus on communication and relationships today.",
    "Financial matters may require your attention.",
    "Unexpected opportunities may come your way.",
    "Time to reflect on personal growth and spirituality.",
    "Social connections will bring joy and fulfillment.",
    "Your creative energy is high - use it wisely.",
    "Patience will be your greatest virtue today.",
    "Travel or learning opportunities are highlighted.",
    "Family matters may need your attention.",
  ];

  const moods = [
    "Happy",
    "Energetic",
    "Reflective",
    "Adventurous",
    "Peaceful",
    "Romantic",
  ];
  const colors = ["Red", "Blue", "Green", "Gold", "Silver", "Purple", "Orange"];
  const compatibleSigns = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];

  const regionalData =
    REGIONAL_PREDICTIONS[region as keyof typeof REGIONAL_PREDICTIONS] ||
    REGIONAL_PREDICTIONS.north;

  return {
    sign,
    period,
    prediction: `${predictions[Math.floor(Math.random() * predictions.length)]} ${regionalData.emphasis[Math.floor(Math.random() * regionalData.emphasis.length)]} matters are highlighted.`,
    luckyNumber: Math.floor(Math.random() * 100) + 1,
    luckyColor: colors[Math.floor(Math.random() * colors.length)],
    mood: moods[Math.floor(Math.random() * moods.length)],
    compatibility:
      compatibleSigns[Math.floor(Math.random() * compatibleSigns.length)],
  };
}

// Get zodiac sign from date
function getZodiacSign(day: number, month: number): string {
  const dates = [
    {
      sign: "Capricorn",
      start: { month: 0, day: 1 },
      end: { month: 0, day: 19 },
    },
    {
      sign: "Aquarius",
      start: { month: 0, day: 20 },
      end: { month: 1, day: 18 },
    },
    {
      sign: "Pisces",
      start: { month: 1, day: 19 },
      end: { month: 2, day: 20 },
    },
    { sign: "Aries", start: { month: 2, day: 21 }, end: { month: 3, day: 19 } },
    {
      sign: "Taurus",
      start: { month: 3, day: 20 },
      end: { month: 4, day: 20 },
    },
    {
      sign: "Gemini",
      start: { month: 4, day: 21 },
      end: { month: 5, day: 20 },
    },
    {
      sign: "Cancer",
      start: { month: 5, day: 21 },
      end: { month: 6, day: 22 },
    },
    { sign: "Leo", start: { month: 6, day: 23 }, end: { month: 7, day: 22 } },
    { sign: "Virgo", start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
    { sign: "Libra", start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
    {
      sign: "Scorpio",
      start: { month: 9, day: 23 },
      end: { month: 10, day: 21 },
    },
    {
      sign: "Sagittarius",
      start: { month: 10, day: 22 },
      end: { month: 11, day: 21 },
    },
    {
      sign: "Capricorn",
      start: { month: 11, day: 22 },
      end: { month: 11, day: 31 },
    },
  ];

  const date = new Date(2000, month - 1, day);

  for (const zodiac of dates) {
    const startDate = new Date(2000, zodiac.start.month, zodiac.start.day);
    const endDate = new Date(2000, zodiac.end.month, zodiac.end.day);

    if (date >= startDate && date <= endDate) {
      return zodiac.sign;
    }
  }

  return "Aries"; // default
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sign = searchParams.get("sign");
  const period = searchParams.get("period") || "daily";
  const region = searchParams.get("region") || "north";
  const day = searchParams.get("day");
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  try {
    let zodiacSign = sign;

    // If birth details are provided, calculate zodiac sign
    if (day && month && year && !sign) {
      zodiacSign = getZodiacSign(parseInt(day), parseInt(month));
    }

    if (!zodiacSign) {
      return NextResponse.json(
        { error: "Zodiac sign or birth details required" },
        { status: 400 },
      );
    }

    const horoscope = generateHoroscope(zodiacSign, period, region);

    return NextResponse.json({
      success: true,
      data: horoscope,
      zodiacSign: zodiacSign,
      region,
      period,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: BirthChartRequest = await request.json();

    const { day, month, year, hour, minute, place, latitude, longitude } = body;

    if (!day || !month || !year) {
      return NextResponse.json(
        { error: "Birth date is required" },
        { status: 400 },
      );
    }

    // Calculate zodiac sign
    const zodiacSign = getZodiacSign(day, month);

    // Generate detailed birth chart (simplified)
    const birthChart = {
      zodiacSign,
      sunSign: zodiacSign,
      moonSign:
        ZODIAC_SIGNS[Math.floor(Math.random() * ZODIAC_SIGNS.length)].name,
      risingSign:
        ZODIAC_SIGNS[Math.floor(Math.random() * ZODIAC_SIGNS.length)].name,
      planetaryPositions: {
        sun: "Strong",
        moon: "Balanced",
        mercury: "Favorable",
        venus: "Harmonious",
        mars: "Energetic",
      },
      lifePathNumber: (day + month + year) % 9 || 9,
      birthStone: getBirthStone(month),
      characteristics: getZodiacCharacteristics(zodiacSign),
    };

    return NextResponse.json({
      success: true,
      data: birthChart,
      message: "Birth chart generated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Helper functions
function getBirthStone(month: number): string {
  const stones = [
    "Garnet",
    "Amethyst",
    "Aquamarine",
    "Diamond",
    "Emerald",
    "Pearl",
    "Ruby",
    "Peridot",
    "Sapphire",
    "Opal",
    "Topaz",
    "Turquoise",
  ];
  return stones[month - 1] || "Diamond";
}

function getZodiacCharacteristics(sign: string): string[] {
  const characteristics: { [key: string]: string[] } = {
    Aries: [
      "Courageous",
      "Determined",
      "Confident",
      "Enthusiastic",
      "Optimistic",
    ],
    Taurus: ["Reliable", "Patient", "Practical", "Devoted", "Responsible"],
    Gemini: ["Gentle", "Affectionate", "Adaptable", "Curious", "Kind"],
    Cancer: [
      "Tenacious",
      "Highly imaginative",
      "Loyal",
      "Emotional",
      "Sympathetic",
    ],
    Leo: ["Creative", "Passionate", "Generous", "Warm-hearted", "Cheerful"],
    Virgo: ["Loyal", "Analytical", "Kind", "Hardworking", "Practical"],
    Libra: ["Cooperative", "Diplomatic", "Gracious", "Fair-minded", "Social"],
    Scorpio: [
      "Resourceful",
      "Brave",
      "Passionate",
      "Stubborn",
      "A true friend",
    ],
    Sagittarius: [
      "Generous",
      "Idealistic",
      "Great sense of humor",
      "Adventurous",
    ],
    Capricorn: ["Responsible", "Disciplined", "Self-control", "Good managers"],
    Aquarius: ["Progressive", "Original", "Independent", "Humanitarian"],
    Pisces: ["Compassionate", "Artistic", "Intuitive", "Gentle", "Wise"],
  };

  return characteristics[sign] || ["Creative", "Adaptable", "Friendly"];
}
