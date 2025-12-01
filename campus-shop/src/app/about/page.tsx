// src/app/about/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-orange-50 py-16 px-6">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Brand Story */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-green-800">Our Story</h1>
          <p className="text-gray-700 text-lg">
            We started <span className="font-semibold">Campus Shop</span> because we noticed students struggled 
            to find high-quality, affordable campus essentials. That’s why we set out on a journey to create 
            a one-stop online store that combines convenience, style, and affordability.
          </p>
          <p className="text-gray-700 text-lg">
            Along the way, we’ve celebrated milestones like launching our first website, hosting pop-up events, 
            and helping over 500 students get exactly what they need.
          </p>
          <p className="text-gray-700 text-lg">
            Our mission is to empower students with access to practical and stylish products that enhance campus life.
          </p>
        </div>

        {/* Who We Serve */}
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold text-green-700">Who We Serve</h2>
          <p className="text-gray-700 text-lg">
            Our products are designed for students, faculty, and anyone passionate about campus life. 
            We offer laptops, clothing, drinkware, and more—carefully curated to meet your everyday needs 
            while reflecting your personality and school pride.
          </p>
        </div>

        {/* How We Operate */}
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold text-green-700">How We Operate</h2>
          <p className="text-gray-700 text-lg">
            We carefully source our products and partner with trusted suppliers. Our team ensures that every item 
            meets our quality standards. From product selection to delivery, we prioritize your satisfaction and 
            convenience, combining technology and creativity in everything we do.
          </p>
        </div>

        {/* Meet the Team */}
<div className="space-y-8 text-center">
  <h2 className="text-3xl font-bold text-green-800">Meet the Team</h2>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center justify-items-center">
    
    {/* Mohammed */}
    <div className="space-y-2 text-center">
      <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-green-400 shadow-lg fade-in-up fade-in-up-delay-1">
        <Image
          src="/products/Mohammed.jpg"
          alt="Mohammed Shuraim"
          fill
          className="object-cover"
        />
      </div>
      <h3 className="font-semibold text-lg text-gray-800">Mohammed Shuraim</h3>
      <p className="text-green-700 font-medium">Full Stack Developer | API Integrations</p>
    </div>

    {/* Margret (you) */}
    <div className="space-y-2 text-center">
      <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-green-500 shadow-xl fade-in-up fade-in-up-delay-2">
        <Image
          src="/products/Marg.jpg"
          alt="Margret Asenso"
          fill
          className="object-cover"
        />
      </div>
      <h3 className="font-semibold text-lg text-gray-800">Margret Asenso</h3>
      <p className="text-green-700 font-medium">Frontend Developer | UI/UX Enthusiast</p>
    </div>

    {/* Eric */}
    <div className="space-y-2 text-center">
      <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-green-400 shadow-lg fade-in-up fade-in-up-delay-3">
        <Image
          src="/products/Eric.jpg"
          alt="Eric Ufomadu"
          fill
          className="object-cover"
        />
      </div>
      <h3 className="font-semibold text-lg text-gray-800">Eric Ufomadu</h3>
      <p className="text-green-700 font-medium">Backend Engineer | Database Specialist</p>
    </div>

  </div>
</div>


        {/* Contact & Call to Action */}
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold text-green-800">Contact Us</h2>
          <p className="text-gray-700 text-lg">
            Have questions or need support? Reach out to us anytime via email at 
            <span className="font-semibold text-green-700"> support@campusshop.com</span>.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition"
          >
            Contact Us
          </Link>
        </div>

      </div>
    </section>
  );
}
