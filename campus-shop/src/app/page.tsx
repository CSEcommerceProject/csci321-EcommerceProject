import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import CategoryGrid from "@/components/CategoryGrid";


export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/welcome");

  return (
    <main className="min-h-screen px-6 text-white relative overflow-hidden
                     bg-gradient-to-br from-green-900 via-emerald-700 to-green-500">
      {/* hero */}
      <section className="relative z-10 mx-auto max-w-2xl text-center py-16">
        <div className="flex justify-center mb-6">
          <Image src="/products/hatterLogo.jpg" alt="Stetson Hatters Logo" width={140} height={140} priority />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold">
          Welcome to <span className="text-yellow-300">Campus Shop</span> 🛍️
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-white/90">
          Your trusted campus marketplace for quality, reliable items.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-yellow-400 px-6 py-3 text-gray-900 font-semibold
                     hover:bg-yellow-300 shadow-lg transition"
        >
          Start Shopping
        </Link>
      </section>
      {/* categories */}
      <CategoryGrid />
    </main>
  );
}
