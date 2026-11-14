import axios from "axios";

import { getStoredAuthSession } from "@/app/lib/auth";

export type Product = {
  name: string;
  quantity: number;
  min_avalabil_qaun: number;
  max_avalabil_qaun: number;
};

type AddProductRequestError = {
  isAxiosError: true;
  response?: {
    data?: unknown;
    status: number;
  };
};

const isAddProductRequestError = (
  error: unknown,
): error is AddProductRequestError =>
  typeof error === "object" &&
  error !== null &&
  "isAxiosError" in error &&
  error.isAxiosError === true;

export const addNewProduct = async (product: Product): Promise<void> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

  if (!baseUrl) {
    throw new Error(
      "The API URL is not configured. Set NEXT_PUBLIC_API_BASE_URL.",
    );
  }

  const session = getStoredAuthSession();

  if (!session?.token) {
    throw new Error("You must be logged in to add a product.");
  }

  if (session.user.role !== "MANUFACTURER") {
    throw new Error("Only manufacturers can add products.");
  }

  try {
    await axios.post(`${baseUrl}/api/service/addproduct`, product, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
  } catch (error) {
    if (isAddProductRequestError(error)) {
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
          "Could not connect to the product service. Check the API URL and backend availability.",
        );
      }

      throw new Error(
        `Adding the product failed with status ${error.response.status}.`,
      );
    }

    throw error;
  }
};
