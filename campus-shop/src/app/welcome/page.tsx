"use client";

import Image from "next/image";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-400 via-green-200 to-green-50 px-6">
      
      {/* Hero Logo */}
      <div className="mb-12 relative w-36 h-36 sm:w-40 sm:h-40">
        <Image
          src="/products/loginlogo.jpg"
          alt="Campus Shop Logo"
          fill
          className="rounded-full shadow-2xl border-4 border-green-300 object-cover"
        />
      </div>

      {/* Welcome Card */}
      <div className="bg-white shadow-2xl rounded-3xl p-12 max-w-md w-full text-center border border-green-200">
        <h1 className="text-4xl font-extrabold text-green-800 mb-4">
          Welcome to Campus Shop
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Your one-stop online store for all campus essentials!  
          Sign in to start shopping, or create an account to join our community.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/auth/signin"
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="w-full sm:w-auto border-2 border-green-600 text-green-700 hover:bg-green-50 font-semibold py-3 px-8 rounded-xl transition"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Footer Note */}
      <p className="text-sm text-gray-600 mt-10 font-medium">
        Empowering students, one product at a time 🎓
      </p>
    </section>
  );
}
