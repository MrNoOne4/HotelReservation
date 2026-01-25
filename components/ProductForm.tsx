"use client";

import React, { useState, useEffect } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

type Props = {
  onSubmit: (product: Product) => void;
  productToEdit?: Product | null;
};

export default function ProductForm({ onSubmit, productToEdit }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    if (productToEdit) {
      setId(productToEdit.id);
      setName(productToEdit.name);
      setPrice(productToEdit.price);
    }
  }, [productToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: id || Date.now(), name, price });
    setName("");
    setPrice(0);
    setId(null);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        required
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <button type="submit">{id ? "Update" : "Add"} Product</button>
    </form>
  );
}
