import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();

    const {
      productId,
      productName,
      note,
      email,
      name,
    }: {
      productId?: number;
      productName?: string;
      note?: string;
      email?: string;
      name?: string;
    } = body || {};

    const requesterEmail =
      session?.user?.email ?? email;
    if (!requesterEmail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const request = await prisma.outOfStockRequest.create({
      data: {
        requesterEmail,
        requesterName: session?.user?.name ?? name ?? null,
        productId: productId ?? null,
        productName: productName ?? null,
        note: note ?? null,
      },
      select: {
        id: true,
        createdAt: true,
        status: true,
      },
    });

    return NextResponse.json({ request }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }
}
