"use client";

import { useState } from "react";
import { useProducts } from "@/lib/productContext";

export default function ManageProducts() {
  const { products, addProduct, removeProduct, updateProduct } = useProducts();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);

  const handleAdd = () => {
    if (!title || price <= 0) return;
    addProduct({ id: Date.now(), title, price });
    setTitle("");
    setPrice(0);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      <div className="mb-6">
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 mr-2" />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(Number(e.target.value))} className="border p-2 mr-2" />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">Add Product</button>
      </div>

      <ul>
        {products.map(product => (
          <li key={product.id} className="flex justify-between py-2 border-b">
            {product.title} - ${product.price}
            <button onClick={() => removeProduct(product.id)} className="bg-red-600 text-white px-2 rounded">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
