"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useUser } from "@/lib/userContext"; // 🔥 import our context

export default function Navbar() {
  const { data: session, status } = useSession();
  const { user } = useUser(); // 🔥 get user role

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white shadow">
      <Link href="/" className="text-xl font-bold">
        Campus Shop
      </Link>

      <div className="flex gap-4 items-center">
        {status === "authenticated" && (
          <>
            <Link href="/products">Products</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/discount">Student Discount🎉</Link>
            <Link href="/about" className="hover:text-yellow-300 transition">
              About
            </Link>

            {/* 🔥 Admin link only for admins */}
            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="rounded bg-black px-3 py-1 text-white"
              >
                Admin Dashboard
              </Link>
            )}
          </>
        )}

        {status === "loading" && <span>Loading…</span>}

        {status === "authenticated" ? (
          <>
            <span className="text-sm">
              Hi, {session.user?.name ?? session.user?.email}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/welcome" })}
              className="rounded bg-black px-3 py-1 text-white"
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link
              href="/auth/signin"
              className="rounded bg-black px-3 py-1 text-white"
            >
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              className="rounded border px-3 py-1"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
