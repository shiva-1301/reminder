const USER_KEY = "user";

/** Email of the signed-in user, from "remember me" (localStorage) or this tab's session. */
export function getUser(): string | null {
  try {
    return localStorage.getItem(USER_KEY) ?? sessionStorage.getItem(USER_KEY);
  } catch {
    return null;
  }
}

export function setUser(email: string, remember: boolean) {
  clearUser();
  (remember ? localStorage : sessionStorage).setItem(USER_KEY, email);
}

export function clearUser() {
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(USER_KEY);
}
