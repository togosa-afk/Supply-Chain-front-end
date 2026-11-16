import { useState } from "react";
import imageCompression from "browser-image-compression";

export default function ImageUploder() {
  const [uplodedImage, setUploadedImage] = useState<File | null>(null);
  const handelImageProcessing = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSizeMB = 5;

    if (file.size / 1024 / 1024 > maxSizeMB) {
      alert(`حجم الصورة يجب أن يكون أقل من ${maxSizeMB} ميغابايت.`);
      return;
    }
		 
		const options = {
      maxSizeMB: 2,
      useWebWorker: true,
      fileType: "image/webp",
    };

		try{
			setUploadedImage(file);
			const compressedFile = await imageCompression(file, options);
			setUploadedImage(compressedFile);
		}catch(error){
			console.error("حدث خطأ أثناء ضغط الصورة:", error);
		}
  };
  return (
    <>
      <div>
        <input
          type="file"
          accept="image/*"
          name="img_url"
          id="img_url"
          onChange={handelImageProcessing}
          disabled={uplodedImage !== null}
        />
      </div>
    </>
  );
}
