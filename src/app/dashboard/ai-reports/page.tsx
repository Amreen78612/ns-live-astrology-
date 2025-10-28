"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminAIReports() {
  const { data, error } = useSWR("/api/admin/ai-reports", fetcher);

  if (error) return <p className="text-red-500">Failed to load reports</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">AI Reports Management</h1>
      <div className="overflow-x-auto bg-white shadow rounded-xl p-4">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-purple-100 text-purple-700">
            <tr>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Payment</th>
              <th className="p-2 border">Created</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r: any) => (
              <tr key={r.id} className="hover:bg-purple-50">
                <td className="p-2 border">{r.name}</td>
                <td className="p-2 border">{r.type}</td>
                <td className="p-2 border">{r.paymentStatus}</td>
                <td className="p-2 border">{r.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}