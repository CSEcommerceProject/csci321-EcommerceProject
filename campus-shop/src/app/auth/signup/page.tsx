"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/auth/signin");
      } else {
        setMsg(data.error || data.message || "Signup failed");//setMsg(data.error || data.message || "Signup failed");
      }
    } catch (err) {
      setMsg("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with blur */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md scale-105"
        style={{ backgroundImage: "url('/products/loginlogo.jpg')" }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Signup card */}
      <div className="relative bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Create Your Account ✨
        </h1>

        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Full Name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            disabled={loading}
            className="w-full rounded-lg bg-green-600 text-white p-3 font-semibold hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? "Creating Account…" : "Sign Up"}
          </button>
        </form>

        {msg && <p className="text-center text-sm text-red-500 mt-3">{msg}</p>}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/auth/signin"
            className="text-green-600 font-semibold hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </section>
  );
}
