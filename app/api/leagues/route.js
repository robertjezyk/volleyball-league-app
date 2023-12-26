import { NextResponse } from "next/server";
import db from "@/utils/db";

export const GET = async (request) => {
  const leagues = await db.league.findMany();
  return NextResponse.json({ data: leagues });
};
