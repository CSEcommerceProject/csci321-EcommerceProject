"use client";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Sign in with ${email}`);
    // TODO: integrate NextAuth signIn("credentials", { email, password })
  };

  return (
    <section className="max-w-sm space-y-4">
      <h1 className="text-2xl font-bold">Sign in</h1>
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full rounded border p-2"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded border p-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="w-full rounded bg-black p-2 text-white">Sign in</button>
      </form>
      <p className="text-sm">
        No account?{" "}
        <a className="underline" href="/auth/signup">Sign up</a>
      </p>
    </section>
  );
}
