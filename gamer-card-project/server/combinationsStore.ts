import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const dataDir = path.resolve(process.cwd(), "server", "data");
const dataFile = path.join(dataDir, "combinations.json");

export type CardCombination = {
  id: string;
  name: string;
  card: Record<string, unknown>;
  assets: Record<string, string>;
  assetNames: Record<string, string>;
  modelText: Record<string, string>;
  selectedModelId: string;
  templateId: string;
  textStyleId: string;
  createdAt: string;
  updatedAt: string;
};

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, "[]\n", "utf8");
  }
}

export async function readCombinations(): Promise<CardCombination[]> {
  await ensureStore();
  const raw = await fs.readFile(dataFile, "utf8");
  return JSON.parse(raw || "[]");
}

export async function writeCombinations(combinations: CardCombination[]) {
  await ensureStore();
  await fs.writeFile(dataFile, `${JSON.stringify(combinations, null, 2)}\n`, "utf8");
}

export function createCombination(payload: Partial<CardCombination>): CardCombination {
  const now = new Date().toISOString();

  return {
    id: randomUUID(),
    name: payload.name || `Combinacion ${now.slice(0, 10)}`,
    card: payload.card ?? {},
    assets: payload.assets ?? {},
    assetNames: payload.assetNames ?? {},
    modelText: payload.modelText ?? {},
    selectedModelId: payload.selectedModelId ?? "",
    templateId: payload.templateId ?? "",
    textStyleId: payload.textStyleId ?? "",
    createdAt: now,
    updatedAt: now,
  };
}
