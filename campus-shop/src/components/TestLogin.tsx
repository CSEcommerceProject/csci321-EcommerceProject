"use client";

import { useUser } from "@/lib/userContext";

export default function TestLogin() {
  const { user, loginAsAdmin, loginAsUser } = useUser();

  return (
    <div className="p-2 border mb-4">
      <p>
        Logged in as:{" "}
        {user ? `${user.email} (${user.role})` : "Guest"}
      </p>
      <button
        onClick={loginAsAdmin}
        className="bg-green-600 text-white px-2 py-1 rounded mr-2"
      >
        Login as Admin
      </button>
      <button
        onClick={loginAsUser}
        className="bg-blue-600 text-white px-2 py-1 rounded"
      >
        Login as User
      </button>
    </div>
  );
}
