"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Order = {
  id: number;
  customer: string;
  products: string[];
  status: "pending" | "shipped" | "delivered";
};

type OrderContextType = {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrder: (order: Order) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, customer: "Alice", products: ["Sample Product 1"], status: "pending" },
    { id: 2, customer: "Bob", products: ["Sample Product 2"], status: "shipped" },
  ]);

  const addOrder = (order: Order) => setOrders(prev => [...prev, order]);

  const updateOrder = (updated: Order) =>
    setOrders(prev => prev.map(o => (o.id === updated.id ? updated : o)));

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within OrderProvider");
  return context;
};
