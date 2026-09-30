import { readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function adminRedirectPlugin() {
  return {
    name: "admin-redirect",
    configureServer(server: { middlewares: { use: (handler: (req: { url?: string }, res: { statusCode: number; setHeader: (name: string, value: string) => void; end: () => void }, next: () => void) => void) => void } }) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/admin" || req.url === "/admin/") {
          res.statusCode = 302;
          res.setHeader("Location", "/admin/index.html");
          res.end();
          return;
        }
        next();
      });
    },
  };
}

function sitemapPlugin() {
  return {
    name: "sitemap",
    closeBundle() {
      const site = process.env.VITE_SITE_URL?.replace(/\/$/, "") || "https://example.com";
      const slugs = readdirSync(resolve("content/projects"))
        .filter((file) => file.endsWith(".md"))
        .map((file) => file.replace(/\.md$/, ""));
      const urls = ["/", "/work", "/about", "/moments", ...slugs.map((slug) => `/work/${slug}`)];
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url><loc>${site}${url}</loc></url>`,
  )
  .join("\n")}
</urlset>
`;
      writeFileSync(resolve("dist/sitemap.xml"), xml);
      writeFileSync(
        resolve("dist/robots.txt"),
        `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`,
      );
    },
  };
}

export default defineConfig({
  plugins: [adminRedirectPlugin(), react(), sitemapPlugin()],
  server: {
    port: 5173,
  },
});
