import axios from 'axios';

export type LoginData = {
  email:string,
  password: string,
}

type LoginRequestError = {
  isAxiosError: true;
  response?: {
    data?: unknown;
    status: number;
  };
};

const isLoginRequestError = (
  error: unknown,
): error is LoginRequestError =>
  typeof error === "object" &&
  error !== null &&
  "isAxiosError" in error &&
  error.isAxiosError === true;

//! login function 

export const login = async(user:LoginData):Promise<void>  => {

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

  if (!baseUrl) {
    throw new Error("The API URL is not configured. Set NEXT_PUBLIC_API_BASE_URL.");
  }

  try{
   await axios.post(`${baseUrl}/api/auth/login`,user) 
  }catch (error) {
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
          "Could not connect to the registration service. Check the API URL and backend availability.",
        );
      }

      throw new Error(
        `Registration failed with status ${error.response.status}.`,
      );
    }

    throw error;
  }
}