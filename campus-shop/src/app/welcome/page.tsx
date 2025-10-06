export default function WelcomePage() {
  return (
    <section className="max-w-md space-y-4">
      <h1 className="text-2xl font-bold">Welcome to Campus Shop</h1>
      <p>Please sign in to continue.</p>
      <div className="flex gap-3">
        <a href="/auth/signin" className="rounded bg-black px-4 py-2 text-white">Sign in</a>
        <a href="/auth/signup" className="rounded border px-4 py-2">Sign up</a>
      </div>
    </section>
  );
}
