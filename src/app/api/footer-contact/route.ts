import { NextResponse } from "next/server";
import { fieldsFromFormData, sendFooterContactEmail } from "@/lib/footer-contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, reason: "network" }, { status: 400 });
  }

  const result = await sendFooterContactEmail(fieldsFromFormData(formData));
  if (result.ok) {
    return NextResponse.json(result);
  }
  const status = result.reason === "config" ? 503 : 502;
  return NextResponse.json(result, { status });
}
