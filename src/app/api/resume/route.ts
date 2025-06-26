/* eslint-disable @typescript-eslint/no-unused-vars */
import clientPromise from "@/lib/mongoDBClient";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db("nelvydb");

  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  let resume;
  try {
    if (id) {
      resume = await db.collection("resume").findOne({ _id: new ObjectId(id) });
      if (!resume) {
        return NextResponse.json(
          { message: "Resume not found" },
          { status: 404 }
        );
      }
    } else {
      resume = await db.collection("resume").findOne({});
    }

    return NextResponse.json(resume);
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid ID format or query error" },
      { status: 400 }
    );
  }
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
