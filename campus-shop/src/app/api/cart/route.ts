// src/app/api/cart/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function getUserCart(session: any) {
  if (!session?.user?.email) throw new Error("Not authenticated");
  const email = session.user.email;

  let cart = await prisma.cart.findFirst({
    where: { user: { email } },
    include: { items: { include: { product: true } } },
  });

  if (!cart) {
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name: session.user.name ?? null,
        passwordHash: "temp",
        role: "STUDENT",
      },
    });
    cart = await prisma.cart.create({
      data: { userId: user.id },
      include: { items: { include: { product: true } } },
    });
  }

  return cart;
}

// ✅ GET → fetch current user’s cart
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const cart = await getUserCart(session);
    return NextResponse.json(cart);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ✅ POST → add item to cart
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { productId, quantity = 1 } = await req.json();
  const email = session.user.email;
  const cart = await getUserCart(session);

  const existing = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId },
  });

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity },
    });
  }

  const updated = await prisma.cart.findUnique({
    where: { id: cart.id },
    include: { items: { include: { product: true } } },
  });

  return NextResponse.json(updated);
}

// ✅ PATCH → update quantity
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { productId, quantity } = await req.json();
  const cart = await getUserCart(session);

  const existing = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId },
  });

  if (!existing) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: existing.id } });
  } else {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity },
    });
  }

  const updated = await prisma.cart.findUnique({
    where: { id: cart.id },
    include: { items: { include: { product: true } } },
  });

  return NextResponse.json(updated);
}

// ✅ DELETE → remove specific item or clear all
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { productId } = await req.json().catch(() => ({}));
  const cart = await getUserCart(session);

  if (productId) {
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productId },
    });
  } else {
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  }

  return NextResponse.json({ success: true });
}
