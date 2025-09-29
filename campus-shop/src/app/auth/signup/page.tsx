"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); const [msg, setMsg] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setMsg(null); setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    setLoading(false);
    if (res.ok) { setMsg("Account created. Redirecting…"); setTimeout(()=>router.push("/auth/signin"), 700); }
    else { const data = await res.json().catch(()=>({})); setMsg(data.error ?? "Sign up failed"); }
  };

  return (
    <section className="max-w-sm space-y-4">
      <h1 className="text-2xl font-bold">Create account</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full rounded border p-2" placeholder="Name (optional)" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full rounded border p-2" placeholder="Email" type="email" required value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full rounded border p-2" placeholder="Password" type="password" required value={password} onChange={e=>setPassword(e.target.value)} />
        <button disabled={loading} className="w-full rounded bg-black p-2 text-white disabled:opacity-60">{loading ? "Creating…" : "Sign up"}</button>
      </form>
      {msg && <p className="text-sm">{msg}</p>}
    </section>
  );
}

