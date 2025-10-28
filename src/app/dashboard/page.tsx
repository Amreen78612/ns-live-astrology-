import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // 🚫 If user not logged in, send to /login
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to Your Dashboard 🎉
        </h1>
        <p className="text-gray-600 mb-2">
          Logged in as: <strong>{session.user?.email}</strong>
        </p>
        <p className="text-gray-600 mb-4">
          Role: <strong>{(session.user as any)?.role}</strong>
        </p>
        <LogoutButton />
      </div>
    </div>
  );
}
