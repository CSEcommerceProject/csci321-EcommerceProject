import "./globals.css";
import type { Metadata } from "next";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Campus Shop",
  description: "College e-commerce MVP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
