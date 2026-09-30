import { person } from "@/resources";
import { origin } from "@/utils/seo";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";

const BG = "#08090a";
const ACCENT = "#00e5ff";

async function loadGoogleFont(font: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status === 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "Full Stack Developer";
  const subtitle = url.searchParams.get("subtitle") || `${person.role} · ${person.locationLabel}`;

  let avatarData: ArrayBuffer | null = null;
  try {
    const response = await fetch(`${origin}${person.avatar}`);
    if (response.ok) avatarData = await response.arrayBuffer();
  } catch {
    avatarData = null;
  }

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: "5rem",
        background: BG,
        flexDirection: "column",
        justifyContent: "space-between",
        fontStyle: "normal",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          fontStyle: "normal",
        }}
      >
        <span
          style={{
            fontSize: "4.5rem",
            letterSpacing: "-0.05em",
            color: ACCENT,
          }}
        >
          {person.name}
        </span>
        <span
          style={{
            fontSize: "5rem",
            lineHeight: "6.5rem",
            letterSpacing: "-0.04em",
            whiteSpace: "pre-wrap",
            overflow: "hidden",
          }}
        >
          {title}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2.5rem",
        }}
      >
        {avatarData ? (
          <img
            alt={`${person.name} portrait`}
            src={`data:image/jpeg;base64,${Buffer.from(avatarData).toString("base64")}`}
            width="96"
            height="96"
            style={{
              width: "96px",
              height: "96px",
              objectFit: "cover",
              borderRadius: "100%",
            }}
          />
        ) : null}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontSize: "2.25rem",
              lineHeight: "2.75rem",
              whiteSpace: "pre-wrap",
            }}
          >
            {subtitle}
          </span>
          <span
            style={{
              fontSize: "1.75rem",
              lineHeight: "2.25rem",
              whiteSpace: "pre-wrap",
              opacity: 0.5,
            }}
          >
            {origin.replace(/^https?:\/\//, "")}
          </span>
        </div>
      </div>
    </div>,
    {
      width: 1280,
      height: 720,
      fonts: [
        {
          name: "Geist",
          data: await loadGoogleFont("Geist:wght@400"),
          style: "normal",
        },
      ],
    },
  );
}
