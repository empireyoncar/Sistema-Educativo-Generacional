const API_URL = import.meta.env.VITE_API_URL || "/api";
const TOKEN_KEY = "rpg_card_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function api(path, options = {}) {
  const token = getToken();
  const apiPath = API_URL.endsWith("/api") && path.startsWith("/api/") ? path.slice(4) : path;
  const response = await fetch(`${API_URL}${apiPath}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Error de servidor" }));
    throw new Error(error.detail || "Error de servidor");
  }

  if (response.status === 204) return null;
  return response.json();
}

export const authApi = {
  register: (payload) => api("/api/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => api("/api/auth/login", { method: "POST", body: JSON.stringify(payload) }),
};

export const cardApi = {
  me: () => api("/api/card/me"),
  generate: () => api("/api/card/generate", { method: "POST" }),
};

export const adminApi = {
  listCombinations: () => api("/api/admin/combinations"),
  createCombination: (payload) => api("/api/admin/combinations", { method: "POST", body: JSON.stringify(payload) }),
  updateCombination: (id, payload) => api(`/api/admin/combinations/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteCombination: (id) => api(`/api/admin/combinations/${id}`, { method: "DELETE" }),
  listCards: () => api("/api/admin/cards"),
  getCard: (id) => api(`/api/admin/cards/${id}`),
  updateCard: (id, payload) => api(`/api/admin/cards/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
};
