import axios from "axios";

import { saveAuthSession, type AuthSession, type AuthUser } from "@/app/lib/auth";

export type LoginData = {
  email: string;
  password: string;
};

type LoginRequestError = {
  isAxiosError: true;
  response?: {
    data?: unknown;
    status: number;
  };
};

type LoginApiResponse = {
  token?: string;
  accessToken?: string;
  user?: AuthUser;
  data?: {
    token?: string;
    user?: AuthUser;
  };
};

const isLoginRequestError = (
  error: unknown,
): error is LoginRequestError =>
  typeof error === "object" &&
  error !== null &&
  "isAxiosError" in error &&
  error.isAxiosError === true;

const parseAuthSession = (payload: unknown): AuthSession => {
  const response =
    payload && typeof payload === "object" ? (payload as Record<string, unknown>) : {};

  const nested =
    response.data && typeof response.data === "object"
      ? (response.data as Record<string, unknown>)
      : {};

  const token =
    typeof response.token === "string"
      ? response.token
      : typeof nested.token === "string"
        ? nested.token
        : typeof response.accessToken === "string"
          ? response.accessToken
          : typeof nested.accessToken === "string"
            ? nested.accessToken
            : "";

  const user =
    response.user && typeof response.user === "object"
      ? (response.user as AuthUser)
      : nested.user && typeof nested.user === "object"
        ? (nested.user as AuthUser)
        : {};

  if (!token.trim()) {
    throw new Error("Login response did not include a token.");
  }

  return {
    token,
    user,
  };
};

export const login = async (user: LoginData): Promise<AuthSession> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

  if (!baseUrl) {
    throw new Error(
      "The API URL is not configured. Set NEXT_PUBLIC_API_BASE_URL.",
    );
  }

  try {
    const response = await axios.post<LoginApiResponse>(
      `${baseUrl}/api/auth/login`,
      user,
    );
    const session = parseAuthSession(response.data);
    saveAuthSession(session);
    return session;
  } catch (error) {
    if (isLoginRequestError(error)) {
      const responseData = error.response?.data;
      const backendMessage =
        typeof responseData === "object" &&
        responseData !== null &&
        "message" in responseData
          ? responseData.message
          : undefined;

      if (typeof backendMessage === "string" && backendMessage.trim()) {
        throw new Error(backendMessage);
      }

      if (!error.response) {
        throw new Error(
          "Could not connect to the login service. Check the API URL and backend availability.",
        );
      }

      throw new Error(`Login failed with status ${error.response.status}.`);
    }

    throw error;
  }
};
