export const adminTokenStorageKey = "empireyoncar-admin-token";

export function getAdminToken() {
  return localStorage.getItem(adminTokenStorageKey) || "";
}

export function setAdminToken(token) {
  localStorage.setItem(adminTokenStorageKey, token);
}

async function requestCombinationApi(path = "", options = {}) {
  const response = await fetch(`/api/combinations${path}`, {
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
  return response.json();
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
