import { db } from "@/db";
import { bookings } from "@/db/schema";

async function main() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const sampleBookings = [
    // Astrologer bookings (4)
    {
      customerName: "Rajesh Kumar",
      customerEmail: "rajesh.kumar@email.com",
      customerPhone: "+91-9876543210",
      serviceType: "astrologer",
      serviceId: 3,
      bookingDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      bookingTime: "10:00 AM",
      status: "completed",
      paymentStatus: "paid",
      notes: "Looking for career guidance and financial advice",
      createdAt: new Date(
        now.getTime() - 7 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      customerName: "Priya Sharma",
      customerEmail: "priya.sharma@email.com",
      customerPhone: "+91-9123456789",
      serviceType: "astrologer",
      serviceId: 7,
      bookingDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      bookingTime: "2:00 PM",
      status: "confirmed",
      paymentStatus: "paid",
      notes: "Marriage matching consultation",
      createdAt: new Date(
        now.getTime() - 2 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      customerName: "Amit Patel",
      customerEmail: "amit.patel@email.com",
      customerPhone: "+91-9234567890",
      serviceType: "astrologer",
      serviceId: 5,
      bookingDate: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      bookingTime: "4:00 PM",
      status: "pending",
      paymentStatus: "pending",
      notes: null,
      createdAt: new Date(
        now.getTime() - 1 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      customerName: "Sneha Gupta",
      customerEmail: "sneha.gupta@email.com",
      customerPhone: "+91-9345678901",
      serviceType: "astrologer",
      serviceId: 2,
      bookingDate: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      bookingTime: "6:00 PM",
      status: "cancelled",
      paymentStatus: "refunded",
      notes: "Customer requested cancellation due to personal reasons",
      createdAt: new Date(
        now.getTime() - 20 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      updatedAt: now.toISOString(),
    },

    // Pandit bookings (4)
    {
      customerName: "Vikram Singh",
      customerEmail: "vikram.singh@email.com",
      customerPhone: "+91-9456789012",
      serviceType: "pandit",
      serviceId: 4,
      bookingDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      bookingTime: "10:00 AM",
      status: "confirmed",
      paymentStatus: "paid",
      notes: "Need pandit for housewarming ceremony",
      createdAt: new Date(
        now.getTime() - 3 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      customerName: "Meera Desai",
      customerEmail: "meera.desai@email.com",
      customerPhone: "+91-9567890123",
      serviceType: "pandit",
      serviceId: 6,
      bookingDate: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      bookingTime: "2:00 PM",
      status: "completed",
      paymentStatus: "paid",
      notes: null,
      createdAt: new Date(
        now.getTime() - 12 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      customerName: "Suresh Reddy",
      customerEmail: "suresh.reddy@email.com",
      customerPhone: "+91-9678901234",
      serviceType: "pandit",
      serviceId: 2,
      bookingDate: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      bookingTime: "4:00 PM",
      status: "confirmed",
      paymentStatus: "paid",
      notes: "Anniversary puja at home",
      createdAt: new Date(
        now.getTime() - 4 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      customerName: "Kavita Joshi",
      customerEmail: "kavita.joshi@email.com",
      customerPhone: "+91-9789012345",
      serviceType: "pandit",
      serviceId: 8,
      bookingDate: new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      bookingTime: "10:00 AM",
      status: "pending",
      paymentStatus: "pending",
      notes: "Baby naming ceremony",
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    },

    // Pooja bookings (4)
    {
      customerName: "Anil Mehta",
      customerEmail: "anil.mehta@email.com",
      customerPhone: "+91-9890123456",
      serviceType: "pooja",
      serviceId: 5,
      bookingDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      bookingTime: "6:00 PM",
      status: "completed",
      paymentStatus: "paid",
      notes: "Satyanarayan Puja for family",
      createdAt: new Date(
        now.getTime() - 18 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      customerName: "Deepika Rao",
      customerEmail: "deepika.rao@email.com",
      customerPhone: "+91-9901234567",
      serviceType: "pooja",
      serviceId: 9,
      bookingDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      bookingTime: "10:00 AM",
      status: "confirmed",
      paymentStatus: "paid",
      notes: null,
      createdAt: new Date(
        now.getTime() - 6 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      customerName: "Ramesh Iyer",
      customerEmail: "ramesh.iyer@email.com",
      customerPhone: "+91-9012345678",
      serviceType: "pooja",
      serviceId: 3,
      bookingDate: new Date(now.getTime() - 22 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      bookingTime: "2:00 PM",
      status: "cancelled",
      paymentStatus: "refunded",
      notes: "Date conflicted with another event",
      createdAt: new Date(
        now.getTime() - 25 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      customerName: "Pooja Nair",
      customerEmail: "pooja.nair@email.com",
      customerPhone: "+91-9123450987",
      serviceType: "pooja",
      serviceId: 7,
      bookingDate: new Date(now.getTime() + 12 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      bookingTime: "4:00 PM",
      status: "confirmed",
      paymentStatus: "paid",
      notes: "Lakshmi Puja for Diwali celebration",
      createdAt: new Date(
        now.getTime() - 8 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      updatedAt: now.toISOString(),
    },

    // Course bookings (3)
    {
      customerName: "Arjun Kapoor",
      customerEmail: "arjun.kapoor@email.com",
      customerPhone: "+91-9234509876",
      serviceType: "course",
      serviceId: 3,
      bookingDate: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      bookingTime: "6:00 PM",
      status: "completed",
      paymentStatus: "paid",
      notes: "Interested in advanced astrology course",
      createdAt: new Date(
        now.getTime() - 28 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      customerName: "Divya Krishnan",
      customerEmail: "divya.krishnan@email.com",
      customerPhone: "+91-9345098765",
      serviceType: "course",
      serviceId: 5,
      bookingDate: new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      bookingTime: "10:00 AM",
      status: "confirmed",
      paymentStatus: "paid",
      notes: "Beginner level Vedic studies",
      createdAt: new Date(
        now.getTime() - 10 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      customerName: "Sanjay Verma",
      customerEmail: "sanjay.verma@email.com",
      customerPhone: "+91-9456098754",
      serviceType: "course",
      serviceId: 7,
      bookingDate: new Date(now.getTime() + 25 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      bookingTime: "2:00 PM",
      status: "pending",
      paymentStatus: "pending",
      notes: null,
      createdAt: new Date(
        now.getTime() - 1 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      updatedAt: now.toISOString(),
    },
  ];

  await db.insert(bookings).values(sampleBookings);

  console.log("✅ Bookings seeder completed successfully");
}

main().catch((error) => {
  console.error("❌ Seeder failed:", error);
});
