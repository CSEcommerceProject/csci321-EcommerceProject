"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/userContext";
import Link from "next/link";

export default function AdminDashboard() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    if (user.role !== "admin") router.push("/"); // redirect non-admins
  }, [user, router]);

  if (!user || user.role !== "admin") return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Link href="/admin/products" className="p-4 bg-blue-600 text-white rounded text-center hover:bg-blue-700">
          Manage Products
        </Link>
        <Link href="/admin/orders" className="p-4 bg-green-600 text-white rounded text-center hover:bg-green-700">
          Manage Orders
        </Link>
      </div>
    </div>
  );
}
