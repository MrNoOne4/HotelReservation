import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import TodoList from "./TodoList";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("../../practiceno5/login")
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    redirect("../../practiceno5/login")
  }

  return <TodoList />;
}
