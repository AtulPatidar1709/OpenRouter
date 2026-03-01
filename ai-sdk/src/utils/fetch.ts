export async function apiFetch(
  baseURL: string,
  apiKey: string,
  path: string,
  init: RequestInit,
) {
  return fetch(`${baseURL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
}
