"use client";
import { useState } from "react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Sign up with ${email}`);
    // TODO: call /api/auth/signup
  };

  return (
    <section className="max-w-sm space-y-4">
      <h1 className="text-2xl font-bold">Create account</h1>
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
        <button className="w-full rounded bg-black p-2 text-white">Sign up</button>
      </form>
      <p className="text-sm">
        Already have an account?{" "}
        <a className="underline" href="/auth/signin">Sign in</a>
      </p>
    </section>
  );
}
