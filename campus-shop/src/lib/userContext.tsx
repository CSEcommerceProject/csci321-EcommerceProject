"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  id: string;
  email: string;
  role: "admin" | "user";
};

type UserContextType = {
  user: User | null;
  loginAsAdmin: () => void;
  loginAsUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const loginAsAdmin = () =>
    setUser({ id: "1", email: "admin@example.com", role: "admin" });

  const loginAsUser = () =>
    setUser({ id: "2", email: "user@example.com", role: "user" });

  return (
    <UserContext.Provider value={{ user, loginAsAdmin, loginAsUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUser must be used within UserProvider");
  return context;
};
