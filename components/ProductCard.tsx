"use client";

import React from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

type Props = {
  product: Product;
  onDelete: (id: number) => void;
  onEdit: (product: Product) => void;
};

export default function ProductCard({ product, onDelete, onEdit }: Props) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <button onClick={() => onEdit(product)}>Edit</button>
      <button onClick={() => onDelete(product.id)}>Delete</button>
    </div>
  );
}