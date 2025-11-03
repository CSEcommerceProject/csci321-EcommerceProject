import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

type OrderItemInput = { productId: number; quantity?: number };

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const items: OrderItemInput[] = body?.items ?? [];
    const email: string | undefined = body?.email;

    if (!items.length) {
      return NextResponse.json({ error: "No items to order" }, { status: 400 });
    }

    // Normalize items -> use qty (schema requires)
    const normalized = items
      .map(i => ({
        productId: Number(i.productId),
        qty: Math.max(1, Math.floor(i.quantity ?? 1)),
      }))
      .filter(i => !Number.isNaN(i.productId));

    if (!normalized.length) {
      return NextResponse.json({ error: "Invalid productId in items" }, { status: 400 });
    }

    // Load products
    const ids = [...new Set(normalized.map(i => i.productId))];
    const products = await prisma.product.findMany({
      where: { id: { in: ids }, isApproved: true },
      select: { id: true, priceCents: true },
    });
    if (products.length !== ids.length) {
      return NextResponse.json(
        { error: "One or more products are invalid or unavailable" },
        { status: 400 }
      );
    }

    // Map productId -> price
    const priceById = new Map(products.map(p => [p.id, p.priceCents]));
    const totalCents = normalized.reduce(
      (sum, li) => sum + (priceById.get(li.productId)! * li.qty),
      0
    );

    // Required buyer relation
    const buyerEmail = session?.user?.email ?? email;
    if (!buyerEmail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        totalCents,
        ...(session?.user?.id
          ? { buyer: { connect: { id: Number(session.user.id) } } }
          : {
              buyer: {
                connectOrCreate: {
                  where: { email: buyerEmail }, // User.email must be @unique
                  create: {
                    email: buyerEmail,
                    name: buyerEmail.split("@")[0],
                    passwordHash: bcrypt.hashSync(randomUUID(), 10),
                  },
                },
              },
            }),
        // Align to schema: OrderItem has { productId, qty }
        items: { create: normalized.map(li => ({ productId: li.productId, qty: li.qty })) },
      },
      select: { id: true, totalCents: true },
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ orders: [] });
    }

    const buyerId = Number(session.user.id); // schema uses buyerId
    const orders = await prisma.order.findMany({
      where: { buyerId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        totalCents: true,
        createdAt: true,
        items: { select: { productId: true, qty: true } },
      },
    });

    return NextResponse.json({ orders });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load orders" }, { status: 500 });
  }
}
