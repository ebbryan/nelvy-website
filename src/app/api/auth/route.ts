import clientPromise from "@/lib/mongoDBClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db("nelvydb");
  const users = db.collection("users");

  // Check if user exists
  const user = await users.findOne({ username });

  if (!user) {
    // Create new user
    await users.insertOne({ username, password });
    return NextResponse.json({ message: "User created", status: "created" });
  }

  // Check password (in production, use bcrypt hash comparison)
  if (user.password !== password) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  return NextResponse.json({ message: "Login successful", status: "ok" });
}
