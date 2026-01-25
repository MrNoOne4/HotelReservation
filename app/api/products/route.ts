import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Product = {
  id: number;
  name: string;
  price: number;
};

const filePath = path.join(process.cwd(), "public/data/products.json");

const readProducts = (): Product[] => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data) as Product[];
};

const writeProducts = (products: Product[]) => {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
};

export async function GET() {
  const products = readProducts();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const products = readProducts();
  const newProduct = (await req.json()) as Product;
  products.push(newProduct);
  writeProducts(products);
  return NextResponse.json(newProduct, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const products = readProducts();
  const updatedProduct = (await req.json()) as Product;
  const index = products.findIndex((p) => p.id === updatedProduct.id);

  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  products[index] = updatedProduct;
  writeProducts(products);
  return NextResponse.json(updatedProduct);
}

export async function DELETE(req: NextRequest) {
  const products = readProducts();
  const { id } = (await req.json()) as { id: number };
  const filtered = products.filter((p) => p.id !== id);
  writeProducts(filtered);
  return NextResponse.json({ message: "Deleted" });
}
