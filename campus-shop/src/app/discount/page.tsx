"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import Link from "next/link";
import { Tag, CheckCircle } from "lucide-react"; // optional icons

const CATS: { label: string; slug: string }[] = [
    { label: "All", slug: "" },
    { label: "Laptops", slug: "laptops" },
    { label: "T-shirts", slug: "t-shirts" },
    { label: "Sweatshirts", slug: "sweatshirts" },
    { label: "Hats", slug: "hats" },
    { label: "Drinkware", slug: "drinkware" },
    { label: "Tailgate & Spirit", slug: "tailgate-spirit" },
  ];
  
export default function DiscountPage() {
  const { items, totalCents, setDiscount, discountPercent } = useCart();
  const [studentID, setStudentID] = useState("");
  const [isStudent, setIsStudent] = useState(false);

  function applyDiscount() {
    const valid = /^[0-9]{9}$/.test(studentID);
    if (!valid) {
      setIsStudent(false);
      setDiscount(0);
      alert("Invalid student ID!");
      return;
    }
    setDiscount(10);
    setIsStudent(true);
    alert("Yayyy🥳 10% discount applied!");
  }

  if (!items || items.length === 0)
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white p-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center space-y-4 max-w-sm w-full">
          <h1 className="text-2xl font-bold text-gray-800">Your cart is empty 😢</h1>
          <Link
            href="/products"
            className="text-blue-600 font-semibold underline hover:text-blue-800 transition"
          >
            Browse products
          </Link>
        </div>
      </section>
    );

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-6 border border-green-100">
        <h1 className="text-3xl font-extrabold text-center text-green-700 flex justify-center items-center gap-2">
          <Tag className="w-6 h-6 text-green-600" /> Student Discount🎉
        </h1>

        <ul className="space-y-3 border rounded-xl p-4 bg-gray-50 shadow-sm">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b last:border-0 pb-2 text-gray-800"
            >
              <span className="font-medium">{item.title} × {item.qty}</span>
              <span className="text-gray-700">${((item.priceCents * item.qty) / 100).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Enter your Stetson Student ID:
          </label>
          <input
            type="text"
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="9-digit ID"
          />
          <button
            onClick={applyDiscount}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all"
          >
            Apply Discount 
          </button>
        </div>

        <div className="text-lg font-semibold text-center">
          Total:{" "}
          <span className="text-green-700">
            ${(totalCents / 100).toFixed(2)}
          </span>
          {discountPercent > 0 && (
            <p className="text-sm text-green-600 mt-1 flex items-center justify-center gap-1 animate-pulse">
              <CheckCircle className="w-4 h-4" />
              ({discountPercent}% Student Discount Applied)
            </p>
          )}
        </div>

        <Link
          href="/checkout"
          className="block text-center mt-6 bg-black hover:bg-gray-800 text-white py-2 rounded-lg font-semibold transition-all"
        >
          Proceed to Checkout 💳
        </Link>
      </div>
    </section>
  );
}
