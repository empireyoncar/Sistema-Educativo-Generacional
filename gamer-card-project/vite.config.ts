import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";

const projectRoot = process.cwd();
const defaultLocalAssetRoot =
  process.platform === "win32"
    ? "C:\\Users\\empir\\OneDrive\\Pictures\\Constructor de tarjetas RPG"
    : "/home/empire/Imágenes/Constructor de tarjetas RPG";
const localAssetRoot = process.env.RPG_CARD_ASSET_ROOT || defaultLocalAssetRoot;

const localAssetFolders = {
  backgrounds: path.join(localAssetRoot, "Fondos tarjetas"),
  characters: path.join(localAssetRoot, "Personajes"),
  attributes: path.join(localAssetRoot, "Atributos"),
  ranks: path.join(localAssetRoot, "Rango"),
  frames: path.join(localAssetRoot, "Marcos"),
  glows: path.join(localAssetRoot, "Brillo"),
};

const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
const combinationsFile = path.join(projectRoot, "server", "data", "combinations.json");
const adminToken = process.env.ADMIN_TOKEN || "empire-admin";

function listImages(dir: string) {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

async function readRequestBody(req: import("node:http").IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

async function ensureCombinationsFile() {
  await fsPromises.mkdir(path.dirname(combinationsFile), { recursive: true });
  if (!fs.existsSync(combinationsFile)) {
    await fsPromises.writeFile(combinationsFile, "[]\n", "utf8");
  }
}

async function readCombinations() {
  await ensureCombinationsFile();
  return JSON.parse(await fsPromises.readFile(combinationsFile, "utf8"));
}

async function writeCombinations(combinations: unknown[]) {
  await ensureCombinationsFile();
  await fsPromises.writeFile(combinationsFile, `${JSON.stringify(combinations, null, 2)}\n`, "utf8");
}

function sendJson(res: import("node:http").ServerResponse, status: number, data: unknown) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function localAssetPlugin(): Plugin {
  return {
    name: "local-rpg-card-assets",
    configureServer(server) {
      server.middlewares.use("/api/combinations", async (req, res) => {
        if (req.headers["x-admin-token"] !== adminToken) {
          sendJson(res, 401, { error: "Admin token required" });
          return;
        }

        const requestUrl = new URL(req.url ?? "/", "http://localhost");
        const parts = requestUrl.pathname.split("/").filter(Boolean);
        const id = parts[0];
        const combinations = await readCombinations();

        if (req.method === "GET" && !id) {
          sendJson(res, 200, combinations);
          return;
        }

        if (req.method === "POST" && !id) {
          const body = await readRequestBody(req);
          const now = new Date().toISOString();
          const combination = {
            id: crypto.randomUUID(),
            name: body.name || `Combinacion ${now.slice(0, 10)}`,
            card: body.card ?? {},
            assets: body.assets ?? {},
            assetNames: body.assetNames ?? {},
            modelText: body.modelText ?? {},
            selectedModelId: body.selectedModelId ?? "",
            templateId: body.templateId ?? "",
            textStyleId: body.textStyleId ?? "",
            createdAt: now,
            updatedAt: now,
          };
          combinations.unshift(combination);
          await writeCombinations(combinations);
          sendJson(res, 201, combination);
          return;
        }

        if (req.method === "PUT" && id) {
          const body = await readRequestBody(req);
          const index = combinations.findIndex((item: { id: string }) => item.id === id);
          if (index === -1) {
            sendJson(res, 404, { error: "Combination not found" });
            return;
          }
          combinations[index] = { ...combinations[index], ...body, id, updatedAt: new Date().toISOString() };
          await writeCombinations(combinations);
          sendJson(res, 200, combinations[index]);
          return;
        }

        if (req.method === "DELETE" && id) {
          await writeCombinations(combinations.filter((item: { id: string }) => item.id !== id));
          res.writeHead(204);
          res.end();
          return;
        }

        sendJson(res, 404, { error: "Unknown combinations route" });
      });

      server.middlewares.use("/local-assets", (req, res) => {
        const requestUrl = new URL(req.url ?? "/", "http://localhost");
        const parts = requestUrl.pathname.split("/").filter(Boolean);
        const group = parts[0] as keyof typeof localAssetFolders | undefined;
        const folder = group ? localAssetFolders[group] : undefined;

        if (!folder) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Unknown asset group" }));
          return;
        }

        if (parts[1] === "list") {
          const files = listImages(folder).map((name) => ({
            name,
            path: path.join(folder, name),
            url: `/local-assets/${group}/file/${encodeURIComponent(name)}`,
          }));

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(files));
          return;
        }

        if (parts[1] === "file" && parts[2]) {
          const requestedName = decodeURIComponent(parts.slice(2).join("/"));
          const filePath = path.resolve(folder, requestedName);
          const safeFolder = path.resolve(folder);

          if (!filePath.startsWith(safeFolder) || !fs.existsSync(filePath)) {
            res.writeHead(404);
            res.end();
            return;
          }

          res.writeHead(200, {
            "Content-Type": `image/${path.extname(filePath).slice(1).replace("jpg", "jpeg")}`,
            "Cache-Control": "no-store",
          });
          fs.createReadStream(filePath).pipe(res);
          return;
        }

        res.writeHead(404);
        res.end();
      });
    },
  };
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react(), tailwindcss(), localAssetPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(projectRoot, "client", "src"),
      "@shared": path.resolve(projectRoot, "shared"),
      "@assets": path.resolve(projectRoot, "attached_assets"),
    },
  },
  envDir: projectRoot,
  root: path.resolve(projectRoot, "client"),
  build: {
    outDir: path.resolve(projectRoot, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: true,
  },
});
