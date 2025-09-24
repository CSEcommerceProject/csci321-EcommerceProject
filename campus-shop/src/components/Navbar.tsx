"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/auth/signin", label: "Sign in" },
  { href: "/auth/signup", label: "Sign up" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="bg-white border-b">
      <nav className="mx-auto max-w-6xl flex items-center justify-between p-4">
        <Link href="/" className="font-semibold">Campus Shop</Link>
        <ul className="flex gap-4">
          {links.map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`px-2 py-1 rounded ${pathname === l.href ? "bg-gray-100" : ""}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
