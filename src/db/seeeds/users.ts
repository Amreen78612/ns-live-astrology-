import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcrypt";

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const sampleUsers = [
    {
      email: "admin@nsliveastro.com",
      password: hashedPassword,
      name: "Admin User",
      role: "admin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      email: "user@nsliveastro.com",
      password: await bcrypt.hash("user123", 10),
      name: "Regular User",
      role: "user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  try {
    await db.insert(users).values(sampleUsers);
    console.log("✅ Users seeded successfully");
    console.log("Admin credentials:");
    console.log("Email: admin@nsliveastro.com");
    console.log("Password: admin123");
    console.log("Regular user credentials:");
    console.log("Email: user@nsliveastro.com");
    console.log("Password: user123");
  } catch (error) {
    console.error("❌ Seeder failed:", error);
  }
}

main().catch((error) => {
  console.error("❌ Seeder failed:", error);
  process.exit(1);
});
