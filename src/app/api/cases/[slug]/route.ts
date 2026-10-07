import { NextResponse } from "next/server";
import { getCaseAssets } from "@/lib/case-assets";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return NextResponse.json(getCaseAssets(slug));
}
