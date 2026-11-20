import axios from "axios";

export type CloudinaryImage = {
  public_id: string;
  secure_url: string;
};

type CloudinaryUploadResponse = {
  public_id?: unknown;
  secure_url?: unknown;
};

type CloudinaryErrorResponse = {
  message?: string;
  error?: {
    message?: string;
  };
};

type CloudinaryUploadRequestError = {
  isAxiosError: true;
  response?: {
    data?: CloudinaryErrorResponse;
    status: number;
  };
};

const isCloudinaryUploadRequestError = (
  error: unknown,
): error is CloudinaryUploadRequestError =>
  typeof error === "object" &&
  error !== null &&
  "isAxiosError" in error &&
  error.isAxiosError === true;

export const isCloudinaryConfigured = () =>
  Boolean(
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  );

export const uploadImage = async (file: File): Promise<CloudinaryImage> => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "إعدادات Cloudinary غير متاحة لهذا التشغيل. أعد تشغيل التطبيق بعد ضبط متغيرات NEXT_PUBLIC_CLOUDINARY في .env.local.",
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post<CloudinaryUploadResponse>(
      `https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/image/upload`,
      formData,
    );

    if (
      typeof response.data.public_id !== "string" ||
      typeof response.data.secure_url !== "string"
    ) {
      throw new Error("Cloudinary did not return the image information.");
    }

    return {
      public_id: response.data.public_id,
      secure_url: response.data.secure_url,
    };
  } catch (error) {
    if (isCloudinaryUploadRequestError(error)) {
      const message =
        error.response?.data?.error?.message ?? error.response?.data?.message;

      if (message) {
        if (
          message.toLowerCase().includes("must be whitelisted for unsigned uploads")
        ) {
          throw new Error(
            "إعداد Upload Preset لا يسمح بالرفع المباشر. في Cloudinary > Settings > Upload Presets، فعّل Unsigned وأضف الـPreset إلى قائمة السماح للرفع غير الموقّع.",
          );
        }

        throw new Error(`تعذر رفع الصورة إلى Cloudinary: ${message}`);
      }

      if (!error.response) {
        throw new Error("تعذر الاتصال بـCloudinary. تحقق من اتصالك وحاول مجددًا.");
      }

      throw new Error(
        `فشل رفع الصورة (HTTP ${error.response.status}). تحقق من إعدادات Unsigned Upload Preset.`,
      );
    }

    throw error;
  }
};