import axios from "axios";
import { getStoredAuthSession } from "@/app/lib/auth";

export type roleData = {
  role: string;
};

type UpdateRoleRequestError = {
  isAxiosError: true;
  response?: {
    data?: unknown;
    status: number;
  };
};

const isUpdateRoleRequestError = (
  error: unknown,
): error is UpdateRoleRequestError =>
  typeof error === "object" &&
  error !== null &&
  "isAxiosError" in error &&
  error.isAxiosError === true;

const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") ||
  "http://localhost:3001";

export const updateRole = async (data: roleData) => {
  const session = getStoredAuthSession();

  if (!session?.token) {
    throw new Error("You must be logged in to update your role.");
  }

  try {
    return await axios.patch(
      `${baseUrl}/api/auth/updaterole`,
      { role: data.role },
      {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      },
    );
  } catch (error) {
    if (isUpdateRoleRequestError(error)) {
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
          "Could not connect to the role service. Check the API URL and backend availability.",
        );
      }

      throw new Error(
        `Role update failed with status ${error.response.status}.`,
      );
    }

    throw error;
  }
};
