import { NextResponse } from "next/server";
import db from "@/utils/db";

export const GET = async (request) => {
  const matches = await db.match.findMany();
  return NextResponse.json({ data: matches });
};

export const POST = async (request) => {
  const data = await request.json();
  const match = await db.match.create({
    data,
  });
  return NextResponse.json({ data: match });
};
