import clientPromise from "@/lib/mongoDBClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("nelvydb");
  const resume = await db.collection("resume").findOne({});
  return NextResponse.json(resume);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { _id, ...updateBody } = body;

  const client = await clientPromise;
  const db = client.db("nelvydb");

  await db
    .collection("resume")
    .updateOne({}, { $set: updateBody }, { upsert: true });

  return NextResponse.json({ message: "Resume updated" });
}
