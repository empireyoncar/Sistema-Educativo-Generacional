import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { createCombination, readCombinations, writeCombinations } from "./combinationsStore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);
  const adminToken = process.env.ADMIN_TOKEN || "empire-admin";

  app.use(express.json({ limit: "5mb" }));

  function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.header("x-admin-token") !== adminToken) {
      res.status(401).json({ error: "Admin token required" });
      return;
    }
    next();
  }

  app.get("/api/combinations", requireAdmin, async (_req, res) => {
    res.json(await readCombinations());
  });

  app.post("/api/combinations", requireAdmin, async (req, res) => {
    const combinations = await readCombinations();
    const combination = createCombination(req.body);
    combinations.unshift(combination);
    await writeCombinations(combinations);
    res.status(201).json(combination);
  });

  app.put("/api/combinations/:id", requireAdmin, async (req, res) => {
    const combinations = await readCombinations();
    const index = combinations.findIndex((item) => item.id === req.params.id);

    if (index === -1) {
      res.status(404).json({ error: "Combination not found" });
      return;
    }

    combinations[index] = { ...combinations[index], ...req.body, id: req.params.id, updatedAt: new Date().toISOString() };
    await writeCombinations(combinations);
    res.json(combinations[index]);
  });

  app.delete("/api/combinations/:id", requireAdmin, async (req, res) => {
    const combinations = await readCombinations();
    const nextCombinations = combinations.filter((item) => item.id !== req.params.id);
    await writeCombinations(nextCombinations);
    res.status(204).end();
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
