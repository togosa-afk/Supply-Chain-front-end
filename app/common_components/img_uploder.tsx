import { useState } from "react";
import imageCompression from "browser-image-compression";
import {
  isCloudinaryConfigured,
  uploadImage,
  type CloudinaryImage,
} from "@/app/services/img_uploder/img_uploder";

type ImageUploderProps = {
  value: string;
  onUpload: (image: CloudinaryImage) => void;
  onUploadingChange: (isUploading: boolean) => void;
};

export default function ImageUploder({
  value,
  onUpload,
  onUploadingChange,
}: ImageUploderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const cloudinaryConfigured = isCloudinaryConfigured();

  const handleImageProcessing = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.value = "";
    setErrorMessage(null);

    const maxSizeMB = 5;

    if (file.size / 1024 / 1024 > maxSizeMB) {
      setErrorMessage(`يجب أن يكون حجم الصورة أقل من ${maxSizeMB} ميغابايت.`);
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErrorMessage("اختر صورة بصيغة PNG أو JPG أو WebP.");
      return;
    }

    const options = {
      maxSizeMB: 2,
      useWebWorker: true,
      fileType: "image/webp",
    };

    try {
      setIsUploading(true);
      onUploadingChange(true);
      const compressedFile = await imageCompression(file, options);
      const uploadedImage = await uploadImage(compressedFile);
      onUpload(uploadedImage);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "تعذر رفع الصورة. حاول مرة أخرى.",
      );
    } finally {
      setIsUploading(false);
      onUploadingChange(false);
    }
  };

  return (
    <div className="image-uploader" aria-busy={isUploading}>
      <label className="ui-label" htmlFor="img_url">
        صورة المنتج
        <span aria-hidden="true" className="ui-required">
          *
        </span>
      </label>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        name="img_url"
        id="img_url"
        onChange={handleImageProcessing}
        disabled={isUploading || !cloudinaryConfigured}
        aria-describedby={errorMessage ? "img_url-error" : undefined}
        aria-invalid={Boolean(errorMessage)}
        aria-required="true"
        className="image-uploader-input"
      />
      <label
        className="image-uploader-choice"
        htmlFor="img_url"
        aria-disabled={isUploading || !cloudinaryConfigured}
      >
        <span aria-hidden="true" className="image-uploader-icon">
          ↑
        </span>
        <span className="image-uploader-title">
          {value ? "اختر صورة أخرى" : "اختر صورة المنتج"}
        </span>
        <span className="image-uploader-hint">
          PNG أو JPG أو WebP · حتى 5 ميغابايت
        </span>
      </label>
      {!cloudinaryConfigured && (
        <p className="image-uploader-error" role="alert">
          إعدادات Cloudinary غير متاحة لهذا التشغيل. أعد تشغيل التطبيق بعد ضبط
          متغيرات
          <code dir="ltr">NEXT_PUBLIC_CLOUDINARY</code>
          في <code dir="ltr">.env.local</code>.
        </p>
      )}
      {isUploading && (
        <p className="image-uploader-status" role="status">
          جارٍ ضغط الصورة ورفعها إلى Cloudinary…
        </p>
      )}
      {value && !isUploading && (
        <div className="image-uploader-success" role="status">
          <span>تم رفع الصورة بنجاح</span>
          <a href={value} target="_blank" rel="noreferrer">
            عرض الصورة
          </a>
        </div>
      )}
      {errorMessage && (
        <p className="image-uploader-error" id="img_url-error" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
