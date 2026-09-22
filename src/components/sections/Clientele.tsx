import React from "react";

type Client = {
  name: string;
  logo: string;
};

const clients: Client[] = [
  { name: "BL", logo: `${import.meta.env.BASE_URL}logo/BL.webp` },
  { name: "DR Layla", logo: `${import.meta.env.BASE_URL}logo/DR Layla.webp` },
  { name: "Final Horizontal", logo: `${import.meta.env.BASE_URL}logo/Final Horizontal Black.webp` },
  { name: "JBK Controls", logo: `${import.meta.env.BASE_URL}logo/JBK Controls.webp` },
  { name: "JR Dental", logo: `${import.meta.env.BASE_URL}logo/JR Dental Logo Horizontal Black.webp` },
  { name: "Logo Horizontal", logo: `${import.meta.env.BASE_URL}logo/Logo Horizontal Black.webp` },
  { name: "Logotype", logo: `${import.meta.env.BASE_URL}logo/Logotype Black.webp` },
  { name: "Lspace", logo: `${import.meta.env.BASE_URL}logo/Lspace_Logo_Horizontal.webp` },
  { name: "Synergy Oils", logo: `${import.meta.env.BASE_URL}logo/Synergy Oils.webp` },
  { name: "The Sheikh Shawarma", logo: `${import.meta.env.BASE_URL}logo/The Sheikh Shawarma Logo Black Version.webp` },
  { name: "Untangle", logo: `${import.meta.env.BASE_URL}logo/Untangle_LogosV6-05 copy.webp` },
  { name: "Wanaromah", logo: `${import.meta.env.BASE_URL}logo/Wanaromah.webp` },
  { name: "Attea", logo: `${import.meta.env.BASE_URL}logo/attea logo.webp` },
  { name: "Kenrich International School", logo: `${import.meta.env.BASE_URL}logo/kenrich international school.webp` },
  { name: "Organic Ocean", logo: `${import.meta.env.BASE_URL}logo/organic ocean.webp` },
  { name: "Purple Curve", logo: `${import.meta.env.BASE_URL}logo/purple curve.webp` },
  { name: "Saregama", logo: `${import.meta.env.BASE_URL}logo/saregama.webp` },
  { name: "Seth G Exims", logo: `${import.meta.env.BASE_URL}logo/seth G exims.webp` },
];

export function Clientele() {
  const loop = [...clients, ...clients];

  return (
    <section className="border-y border-black/10 bg-white py-24 text-black">
      <div className="mx-auto mb-14 max-w-4xl px-6 text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-black/50">
          Clientele / 05
        </p>

        <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-black leading-none tracking-tight">
          Brands that trust{" "}
          <span className="italic font-light text-black/50">
            Shaffedits
          </span>
        </h2>
      </div>

      <div
        className="marquee-paused overflow-hidden"
        style={
          {
            "--marquee-duration": "35s",
          } as React.CSSProperties
        }
      >
        <div className="flex w-max animate-marquee items-center gap-20 px-10">
          {loop.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex h-20 w-40 items-center justify-center"
            >
              <img
                src={client.logo}
                alt={client.name}
                title={client.name}
                loading="lazy"
                draggable={false}
                className="max-h-14 max-w-full w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0"
                onError={(e) => {
                  console.error(`Failed to load: ${client.name}`);
                  e.currentTarget.style.border = "2px solid red";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
