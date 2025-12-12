# 🛍️ Campus Shop – Stetson Student Marketplace
Campus Shop is a full-stack e-commerce web application built with **Next.js**, **Prisma**, and **NextAuth**.  
It allows users to browse products, manage a **personal cart**, place orders, and apply **Stetson student discounts**.
Each authenticated user has their **own cart**, ensuring cart items are not shared across users.
---
## ✨ Features

- User authentication (Sign up & Sign in)
- Secure password hashing
- Product browsing by category
- User-specific shopping cart
- Persistent cart across sessions
- Student discount eligibility
- Checkout flow with order confirmation
- Prisma + SQLite database
- Responsive UI using Tailwind CSS
---
## 🧰 Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript
- **Backend:** Next.js API Routes
- **Database:** SQLite with Prisma ORM
- **Authentication:** NextAuth (Credentials Provider)
- **Styling:** Tailwind CSS
- **State Management:** React Context API

---

## 📁 Project Structure (Simplified)

## Getting Started
---
## 🚀 Installation & Setup
Follow these steps to run the project on **any machine**.
---
### 1️⃣ Clone the Repository

```bash
git clone [https://github.com/YOUR_USERNAME/campus-shop.git](https://github.com/CSEcommerceProject/csci321-EcommerceProject.git)
cd campus-shop

Install Dependencies 
npm install

Create Environment Variables : Create a .env file in the root directory and add
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="your-secret-key"; generate key with : openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

Set Up the Database
npx prisma migrate dev
npx prisma generate

View DATABASE
npx prisma studio

Start Development Server
npm run dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
