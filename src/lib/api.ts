import type { UserProfileForm } from "../types";

const TIMEOUT_MS = 120000;

const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
};

async function post(path: string, body: object) {
  const res = await fetchWithTimeout(`/api${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP ${res.status}: Request failed`);
  }
  return res.json();
}

async function get(path: string) {
  const res = await fetchWithTimeout(`/api${path}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP ${res.status}: Request failed`);
  }
  return res.json();
}

export const api = {
  saveProfile: (profile: UserProfileForm) => {
    return post("/profile", profile);
  },
  generatePlan: (profileId: string) => {
    return post("/plan/generate", { profileId });
  },
  getCurrentPlan: (profileId: string) => {
    return get(`/plan/current?profileId=${profileId}`);
  },
};
