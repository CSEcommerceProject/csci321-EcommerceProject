import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ eligible: false, reason: "Not logged in" }, { status: 401 });
  }

  const email = session.user.email.toLowerCase();
  const isStetsonStudent = email.endsWith("@stetson.edu");

  if (isStetsonStudent) {
    const discountPercent = 10; // 🎓 10% discount for students
    return NextResponse.json({
      eligible: true,
      discountPercent,
      message: `Congrats! You qualify for a ${discountPercent}% student discount.`,
    });
  }

  return NextResponse.json({
    eligible: false,
    message: "No student discount for this account.",
  });
}
