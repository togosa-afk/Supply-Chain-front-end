export type AuthUser = {
  id?: string | number;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
};

export const AUTH_STORAGE_KEYS = {
  token: "supplyflow_token",
  user: "supplyflow_user",
};

export const saveAuthSession = (session: AuthSession) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEYS.token, session.token);
  window.localStorage.setItem(
    AUTH_STORAGE_KEYS.user,
    JSON.stringify(session.user ?? {}),
  );
};

export const getStoredAuthSession = (): AuthSession | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const token = window.localStorage.getItem(AUTH_STORAGE_KEYS.token);
  const rawUser = window.localStorage.getItem(AUTH_STORAGE_KEYS.user);

  if (!token) {
    return null;
  }

  try {
    const user = rawUser ? (JSON.parse(rawUser) as AuthUser) : {};
    return { token, user };
  } catch {
    return { token, user: {} };
  }
};

export const clearAuthSession = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEYS.token);
  window.localStorage.removeItem(AUTH_STORAGE_KEYS.user);
};
