import axios from "axios";

export type RegistrationRole =
  | "CUSTOMER"
  | "MERCHANT"
  | "MANUFACTURER"
  | "LOGISTICS_PROVIDER";

export type RegistrationData = {
  name: string;
  email: string;
  password: string;
  role: RegistrationRole;
};

type RegistrationRequestError = {
  isAxiosError: true;
  response?: {
    data?: unknown;
    status: number;
  };
};

const isRegistrationRequestError = (
  error: unknown,
): error is RegistrationRequestError =>
  typeof error === "object" &&
  error !== null &&
  "isAxiosError" in error &&
  error.isAxiosError === true;

//! register function
export const register = async (user: RegistrationData): Promise<void> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

  if (!baseUrl) {
    throw new Error("The API URL is not configured. Set NEXT_PUBLIC_API_BASE_URL.");
  }

  try {
    await axios.post(`${baseUrl}/api/auth/register`, user);
  } catch (error) {
    if (isRegistrationRequestError(error)) {
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
          "Could not connect to the registration service. Check the API URL and backend availability.",
        );
      }

      throw new Error(
        `Registration failed with status ${error.response.status}.`,
      );
    }

    throw error;
  }
};
