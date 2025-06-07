"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import getCroppedImg from "./utils";

interface ImageUploaderProps {
  label?: string;
  multiple?: boolean;
  onUploadComplete: (url: string | string[]) => void;
  cropMode?: "avatar" | "thumbnail" | "content";
}

export default function ImageUploader({
  label,
  multiple = false,
  onUploadComplete,
  cropMode = "content",
}: ImageUploaderProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (!imageSrc) return;
    const blob = await getCroppedImg(imageSrc, crop, zoom);
    const url = URL.createObjectURL(blob);
    onUploadComplete(url);
    setImageSrc(null);
  };

  return (
    <div className="space-y-2">
      {label && <label className="block mb-1">{label}</label>}
      <div
        {...getRootProps()}
        className={`border-dashed border-2 p-4 text-center cursor-pointer ${
          isDragActive ? "bg-gray-100" : ""
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? "Отпустите файл" : "Перетащите изображение сюда"}
      </div>
      {imageSrc && (
        <div className="relative h-64 w-full">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={cropMode === "avatar" ? 1 : 16 / 9}
            onCropChange={setCrop}
            onZoomChange={setZoom}
          />
          <button
            type="button"
            onClick={handleUpload}
            className="absolute bottom-2 right-2 rounded bg-blue-600 px-3 py-1 text-white"
          >
            Сохранить
          </button>
        </div>
      )}
    </div>
  );
}
