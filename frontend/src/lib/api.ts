/**
 * Base URL of the Spring Boot backend.
 * Set VITE_API_BASE_URL in .env.local (dev) or in your hosting provider (prod).
 */
export const getApiUrl = (): string =>
  (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080").replace(/\/+$/, "");

/**
 * Make an API request. Returns parsed JSON when possible, otherwise raw text
 * (the auth endpoints respond with plain strings).
 */
export const apiCall = async <T = unknown>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const { headers, ...rest } = options;
  let response: Response;
  try {
    response = await fetch(`${getApiUrl()}${endpoint}`, {
      ...rest,
      headers: { "Content-Type": "application/json", ...(headers || {}) },
    });
  } catch {
    throw new Error("Could not reach the server. Check your connection and try again.");
  }

  const text = await response.text();
  if (!response.ok) {
    throw new Error(text || `Request failed (${response.status})`);
  }
  try {
    return (text ? JSON.parse(text) : text) as T;
  } catch {
    return text as unknown as T;
  }
};
