import { NextResponse } from "next/server";
import { isEncuestaFirebaseConfigured } from "@/lib/firebase/encuestaFirebaseOptions";
import { NEWSLETTER } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const ready = !NEWSLETTER.formActionUrl && isEncuestaFirebaseConfigured();
  return NextResponse.json({ ready });
}
