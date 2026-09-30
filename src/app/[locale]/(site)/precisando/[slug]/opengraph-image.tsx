import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { articleBySlug } from "@/data/articles";

export const alt = "Precisar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function PrecisandoOpengraphImage({ params }: Props) {
  const { slug: raw } = await params;
  const slug = decodeURIComponent(raw);
  const post = articleBySlug(slug);

  if (post?.socialImage) {
    const file = path.join(process.cwd(), "public", post.socialImage.replace(/^\//, "").split("?")[0]!);
    const buf = await readFile(file);
    const type = file.endsWith(".png") ? "image/png" : "image/jpeg";
    return new Response(buf, {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  }

  const title = post?.title ?? "Precisando";
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0c12",
          padding: 72,
        }}
      >
        <span style={{ fontSize: 28, fontWeight: 700, color: "#FF4B0B" }}>PRECISAR</span>
        <span style={{ fontSize: 48, fontWeight: 800, color: "#f4f6f8", lineHeight: 1.15, maxWidth: 960 }}>
          {title}
        </span>
        <span style={{ fontSize: 22, color: "#76828e" }}>Menos ruido. Más criterio.</span>
      </div>
    ),
    { ...size },
  );
}
