const API_URL = import.meta.env.VITE_API_URL || "/api";
const TOKEN_KEY = "rpg_card_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getTokenPayload() {
  const token = getToken();
  if (!token) return null;

  try {
    return JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
}

export function isAdmin() {
  return getTokenPayload()?.role === "admin";
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
    throw new Error(formatApiError(error.detail));
  }

  if (response.status === 204) return null;
  return response.json();
}

function formatApiError(detail) {
  if (!detail) return "Error de servidor";
  if (typeof detail === "string") return detail;

  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        const field = Array.isArray(item.loc) ? item.loc.filter((part) => part !== "body").join(".") : "";
        return field ? `${field}: ${item.msg}` : item.msg;
      })
      .join(" | ");
  }

  if (typeof detail === "object") {
    return detail.msg || JSON.stringify(detail);
  }

  return String(detail);
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
  listBuilderCombinations: () => api("/api/admin/builder-combinations"),
  listUsers: () => api("/api/admin/users"),
  updateUser: (id, payload) => api(`/api/admin/users/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteUser: (id) => api(`/api/admin/users/${id}`, { method: "DELETE" }),
  listCards: () => api("/api/admin/cards"),
  getCard: (id) => api(`/api/admin/cards/${id}`),
  updateCard: (id, payload) => api(`/api/admin/cards/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteCard: (id) => api(`/api/admin/cards/${id}`, { method: "DELETE" }),
};
