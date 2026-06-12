import { ImageResponse } from "next/og";

/* Image de partage (réseaux sociaux, messageries) — générée au build,
   aux couleurs de la charte. Remplace les PNG du template. */

export const alt =
  "HANA — Bougies artisanales rechargeables, fabriquées en France";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2E211C",
          backgroundImage:
            "radial-gradient(circle at 80% 50%, rgba(176,86,60,0.45) 0%, rgba(201,154,78,0.15) 40%, transparent 70%)",
        }}
      >
        <div
          style={{
            fontSize: 130,
            letterSpacing: "0.35em",
            color: "#F7F1E8",
            fontWeight: 600,
            display: "flex",
            // compense l'espacement après la dernière lettre
            paddingLeft: "0.35em",
          }}
        >
          HANA
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 34,
            color: "#C99A4E",
            fontStyle: "italic",
            display: "flex",
          }}
        >
          Certains moments méritent de ne jamais s&apos;éteindre.
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 24,
            color: "rgba(247,241,232,0.75)",
            display: "flex",
          }}
        >
          Bougies artisanales rechargeables · Fabriquées en France
        </div>
      </div>
    ),
    size,
  );
}
