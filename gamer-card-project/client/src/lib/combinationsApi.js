export const adminTokenStorageKey = "empireyoncar-admin-token";

export function getAdminToken() {
  return localStorage.getItem(adminTokenStorageKey) || "";
}

export function setAdminToken(token) {
  localStorage.setItem(adminTokenStorageKey, token);
}

const combinationsApiBase = `${import.meta.env.BASE_URL}api/combinations`;

function normalizeAssetUrl(url) {
  if (typeof url !== "string") return url;
  if (url.startsWith("/local-assets/")) return `${import.meta.env.BASE_URL}${url.slice(1)}`;
  if (url.startsWith("local-assets/")) return `${import.meta.env.BASE_URL}${url}`;
  return url;
}

function normalizeCombination(combination) {
  if (!combination?.assets) return combination;

  return {
    ...combination,
    assets: Object.fromEntries(Object.entries(combination.assets).map(([key, value]) => [key, normalizeAssetUrl(value)])),
  };
}

async function requestCombinationApi(path = "", options = {}) {
  const response = await fetch(`${combinationsApiBase}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": getAdminToken(),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(response.status === 401 ? "Token de admin incorrecto." : "No se pudo completar la accion.");
  }

  if (response.status === 204) return null;
  const data = await response.json();
  return Array.isArray(data) ? data.map(normalizeCombination) : normalizeCombination(data);
}

export function listCombinations() {
  return requestCombinationApi();
}

export function saveCombination(payload) {
  return requestCombinationApi("", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateCombination(id, payload) {
  return requestCombinationApi(`/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteCombination(id) {
  return requestCombinationApi(`/${id}`, { method: "DELETE" });
}
