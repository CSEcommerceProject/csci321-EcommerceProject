"use client";

import { useOrders } from "@/lib/orderContext";

export default function ManageOrders() {
  const { orders, updateOrder } = useOrders();

  const handleChangeStatus = (id: number, status: "pending" | "shipped" | "delivered") => {
    updateOrder({ ...orders.find(o => o.id === id)!, status });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id} className="flex justify-between py-2 border-b items-center">
            <span>{order.customer} - {order.products.join(", ")} - {order.status}</span>
            <select value={order.status} onChange={e => handleChangeStatus(order.id, e.target.value as any)} className="border p-1 rounded">
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}
