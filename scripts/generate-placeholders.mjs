import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function svg(file, w, h, bg, label, ink = "#f4f1ea", accent = "#c6452e") {
  const path = join(root, "public", file);
  mkdirSync(dirname(path), { recursive: true });
  const grain = Array.from({ length: 18 }, (_, i) => {
    const x = ((i * 97) % 30) * (w / 30);
    const y = ((i * 53) % 20) * (h / 20);
    return `<circle cx="${x}" cy="${y}" r="${8 + (i % 5)}" fill="${ink}" opacity="0.04"/>`;
  }).join("");
  writeFileSync(
    path,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <rect x="0" y="${h * 0.62}" width="${w}" height="${h * 0.38}" fill="${ink}" opacity="0.06"/>
  <rect x="${w * 0.08}" y="${h * 0.12}" width="${w * 0.55}" height="${h * 0.48}" fill="${ink}" opacity="0.05"/>
  ${grain}
  <rect x="${w * 0.07}" y="${h * 0.1}" width="10" height="10" fill="${accent}"/>
  <text x="${w * 0.07}" y="${h * 0.09}" fill="${ink}" font-size="${Math.round(h * 0.028)}" letter-spacing="6" font-family="Inter, Helvetica, sans-serif">FAYE</text>
  <text x="${w * 0.07}" y="${h * 0.88}" fill="${ink}" font-size="${Math.round(h * 0.055)}" font-family="Georgia, serif">${label}</text>
  <text x="${w * 0.07}" y="${h * 0.93}" fill="${accent}" font-size="${Math.round(h * 0.022)}" letter-spacing="4" font-family="Inter, Helvetica, sans-serif">PLACEHOLDER · REPLACE IN CMS</text>
</svg>
`,
  );
}

const stills = [
  ["uploads/about/hero.svg", 1920, 1080, "#2b221c", "Working still"],
  ["uploads/about/faye-working.svg", 1200, 1600, "#3a2c24", "On site"],
  ["uploads/projects/triathlon.svg", 1600, 1000, "#1f2a28", "Triathlon"],
  ["uploads/projects/triathlon-hero.svg", 1920, 1080, "#16302c", "Triathlon field"],
  ["uploads/projects/swimming.svg", 1200, 1600, "#163445", "Swimming"],
  ["uploads/projects/swimming-hero.svg", 1920, 900, "#0f3a4a", "Lane"],
  ["uploads/projects/nikk.svg", 1600, 1000, "#3a2a22", "Nikk"],
  ["uploads/projects/nikk-hero.svg", 1920, 1080, "#4a3126", "Nikk, a day"],
  ["uploads/projects/ting-hai.svg", 1600, 1100, "#2a3338", "Ting Hai"],
  ["uploads/projects/hangzhou-films.svg", 1600, 1000, "#4a3b2c", "Hangzhou"],
  ["uploads/projects/lu-ming.svg", 1200, 1500, "#2c241c", "Lu Ming"],
  ["uploads/projects/lu-ming-hero.svg", 1920, 1080, "#241c16", "West Lake"],
  ["uploads/projects/ceremony.svg", 1920, 1080, "#1a1a1a", "Ceremony"],
  ["uploads/projects/broadcast.svg", 1600, 1000, "#2b2b28", "Broadcast"],
  ["uploads/projects/cricket.svg", 1600, 900, "#31401f", "Cricket"],
  ["uploads/projects/hate-spring.svg", 1200, 1600, "#4a2a28", "Spring"],
  ["uploads/projects/clouds.svg", 1920, 1000, "#5a5348", "Clouds"],
  ["uploads/projects/hitchcock.svg", 1600, 1000, "#111111", "Zoom"],
  ["uploads/projects/french-music.svg", 1920, 1080, "#2c201c", "Music season"],
  ["uploads/projects/volunteer.svg", 1600, 1000, "#3a4032", "Between classes"],
  ["uploads/projects/wechat.svg", 1400, 900, "#e6dcc8", "Editorial", "#111111"],
  ["uploads/projects/poster.svg", 1200, 1500, "#c6452e", "Poster", "#f4f1ea"],
  ["uploads/projects/interview.svg", 1600, 1000, "#352820", "Interview"],
  ["uploads/projects/city-vlog.svg", 1920, 1080, "#2a3330", "City vlog"],
  ["uploads/projects/graduation.svg", 1920, 1080, "#2a2420", "Graduation"],
  ["uploads/moments/city.svg", 1000, 1300, "#3b332c", "City"],
  ["uploads/moments/bike.svg", 1400, 900, "#2a4038", "Bike"],
  ["uploads/moments/backstage.svg", 1100, 1400, "#1c1c1c", "Backstage"],
  ["uploads/moments/sea.svg", 1600, 1000, "#2c3a40", "Sea"],
  ["uploads/moments/race.svg", 1200, 800, "#12343f", "Race"],
  ["uploads/moments/travel.svg", 900, 1200, "#4a4036", "Travel"],
  ["uploads/moments/friends.svg", 1100, 1100, "#3a3028", "Friends"],
  ["uploads/moments/night.svg", 1400, 900, "#151515", "Night"],
];

for (const [file, w, h, bg, label, ink] of stills) {
  svg(file, w, h, bg, label, ink);
}

console.log(`wrote ${stills.length} placeholder stills`);
