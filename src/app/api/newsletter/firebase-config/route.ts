import { NextResponse } from "next/server";
import { getEncuestaFirebaseOptions } from "@/lib/firebase/encuestaFirebaseOptions";
import { NEWSLETTER } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Expone la config web de Firebase en runtime (Vercel) para el cliente. */
export async function GET() {
  if (NEWSLETTER.formActionUrl) {
    return NextResponse.json({ configured: false });
  }

  const opts = getEncuestaFirebaseOptions();
  if (!opts) {
    return NextResponse.json({ configured: false });
  }

  return NextResponse.json({
    configured: true,
    firebase: {
      apiKey: opts.apiKey,
      authDomain: opts.authDomain,
      projectId: opts.projectId,
      storageBucket: opts.storageBucket,
      messagingSenderId: opts.messagingSenderId,
      appId: opts.appId,
    },
  });
}
