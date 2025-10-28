import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcrypt";

async function seed() {
  const hashedAdminPass = await bcrypt.hash("admin123", 10);
  const hashedUserPass = await bcrypt.hash("user123", 10);

  await db.insert(users).values([
    {
      email: "admin@nsliveastro.com",
      password: hashedAdminPass,
      name: "Admin User",
      role: "admin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      email: "user@nsliveastro.com",
      password: hashedUserPass,
      name: "Regular User",
      role: "user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  console.log("✅ Users seeded successfully!");
}

seed().catch((err) => console.error(err));
