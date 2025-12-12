"use client";

import { ReactNode } from "react";
import { UserProvider } from "@/lib/userContext";
import { ProductProvider } from "@/lib/productContext";
import { OrderProvider } from "@/lib/orderContext";
import Providers from "@/app/providers";
import Navbar from "@/components/Navbar";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <ProductProvider>
        <OrderProvider>
          <Providers>
            <Navbar />
            <main className="p-4">{children}</main>
          </Providers>
        </OrderProvider>
      </ProductProvider>
    </UserProvider>
  );
}
