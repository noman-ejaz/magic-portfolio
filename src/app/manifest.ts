import { person } from "@/resources";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${person.name} — Full Stack Developer`,
    short_name: person.name,
    description: `${person.role} specialising in Python, Django, FastAPI, React, Next.js, AWS and Docker.`,
    start_url: "/",
    display: "standalone",
    background_color: "#08090a",
    theme_color: "#08090a",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
