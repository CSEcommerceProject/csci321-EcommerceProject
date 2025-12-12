"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  description?: string;
  imageUrl?: string;
};

type ProductContextType = {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  updateProduct: (product: Product) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, title: "Sample Product 1", price: 10 },
    { id: 2, title: "Sample Product 2", price: 20 },
  ]);

  const addProduct = (product: Product) => setProducts(prev => [...prev, product]);

  const removeProduct = (id: number) => setProducts(prev => prev.filter(p => p.id !== id));

  const updateProduct = (updated: Product) =>
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));

  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within ProductProvider");
  return context;
};
