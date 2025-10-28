import bcrypt from "bcrypt";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { users } from "./src/db/schema";
import { eq } from "drizzle-orm";
import * as fs from "fs";
import * as path from "path";

// Load .env file
const envPath = path.join(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const [key, ...values] = line.split("=");
    if (key && values.length > 0) {
      process.env[key.trim()] = values
        .join("=")
        .trim()
        .replace(/^["']|["']$/g, "");
    }
  });
}

// Create database connection
const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const db = drizzle(client, { schema: { users } });

(async () => {
  const hash = await bcrypt.hash("admin123", 10);
  await db
    .update(users)
    .set({ password: hash })
    .where(eq(users.email, "admin@nsliveastro.com"));
  console.log("✅ Admin password reset to admin123 successfully");
  process.exit(0);
})();
