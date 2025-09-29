"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/";
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string|null>(null); const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setMsg(null); setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false, callbackUrl });
    setLoading(false);
    if (res?.ok) router.push(callbackUrl); else setMsg("Invalid credentials");
  };

  return (
    <section className="max-w-sm space-y-4">
      <h1 className="text-2xl font-bold">Sign in</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full rounded border p-2" placeholder="Email" type="email" required value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full rounded border p-2" placeholder="Password" type="password" required value={password} onChange={e=>setPassword(e.target.value)} />
        <button disabled={loading} className="w-full rounded bg-black p-2 text-white disabled:opacity-60">{loading ? "Signing in…" : "Sign in"}</button>
      </form>
      {msg && <p className="text-sm">{msg}</p>}
    </section>
  );
}
