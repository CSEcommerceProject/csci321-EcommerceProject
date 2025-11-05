// src/app/api/discount/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

function isStetsonEmail(email: string) {
  return email.toLowerCase().endsWith("@stetson.edu");
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const body = await req.json().catch(() => ({}));
  const email = session?.user?.email ?? body.email;

  if (!email) {
    return NextResponse.json(
      { eligible: false, reason: "No email found. Sign in or provide an email." },
      { status: 200 }
    );
  }

  const eligible = isStetsonEmail(email);
  const DISCOUNT_PERCENT = 10;

  return NextResponse.json({
    eligible,
    discountPercent: eligible ? DISCOUNT_PERCENT : 0,
    email,
  });
}
