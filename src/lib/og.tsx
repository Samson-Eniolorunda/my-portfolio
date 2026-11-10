import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Link-preview images (1200 × 630) in the site's paper-and-ink style.
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_TYPE = "image/png";

const PAPER = "#f3efe6";
const INK = "#1a1916";
const MUTED = "#5b574e";
const LINE = "#d6cfbf";
const ACCENT = "#c43d12";

const font = (file: string) => readFile(join(process.cwd(), "src/app/fonts", file));

export async function ogImage({ kicker, title, subtitle, image }: { kicker: string; title: string; subtitle?: string; image?: string }) {
  const serif = await font("InstrumentSerif-Regular.ttf");
  const shot = image ? `data:image/png;base64,${(await readFile(join(process.cwd(), "public", image))).toString("base64")}` : null;
  const titleSize = title.length > 46 ? 64 : title.length > 28 ? 78 : 96;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: PAPER, color: INK, padding: "56px 64px", fontFamily: "Serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 20, letterSpacing: 2, textTransform: "uppercase", color: MUTED }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 14, height: 14, background: ACCENT }} />
            {kicker}
          </div>
          <div style={{ display: "flex" }}>samsoneniolorunda.vercel.app</div>
        </div>
        <div style={{ display: "flex", height: 2, background: INK, marginTop: 22 }} />
        <div style={{ display: "flex", flex: 1, gap: 48, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ display: "flex", fontSize: titleSize, lineHeight: 1.02, letterSpacing: -1 }}>{title}</div>
            {subtitle && <div style={{ display: "flex", marginTop: 24, fontSize: 30, lineHeight: 1.3, color: MUTED }}>{subtitle}</div>}
          </div>
          {shot && (
            <div style={{ display: "flex", width: 470, padding: 8, background: "#e9e4d8", border: `2px solid ${LINE}` }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- rendered by ImageResponse, not the browser */}
              <img src={shot} width={454} height={284} style={{ objectFit: "cover", objectPosition: "top" }} alt="" />
            </div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: `1px solid ${LINE}`, paddingTop: 20 }}>
          <div style={{ display: "flex", fontSize: 40 }}>Samson Eniolorunda</div>
          <div style={{ display: "flex", fontSize: 18, color: MUTED, letterSpacing: 1 }}>FULL-STACK DEVELOPER · LAGOS</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Serif", data: serif, style: "normal", weight: 400 },
      ],
    },
  );
}
