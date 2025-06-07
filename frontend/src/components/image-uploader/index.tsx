"use client";
import { useState } from "react";

interface ImageInfo {
  originalUrl: string;
  webpUrl: string;
  originalSize: number;
  webpSize: number;
  width: number;
  height: number;
  webpFile: Blob;
}

interface ImageUploaderProps {
  label?: string;
  multiple?: boolean;
  onUploadComplete: (files: Blob | Blob[]) => void;
}

async function convertToWebP(file: File): Promise<ImageInfo> {
  const originalUrl = URL.createObjectURL(file);
  const img = document.createElement("img");
  img.src = originalUrl;
  await new Promise((resolve) => {
    img.onload = resolve;
  });
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.drawImage(img, 0, 0);
  const webpBlob: Blob = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b as Blob), "image/webp"),
  );
  const webpUrl = URL.createObjectURL(webpBlob);
  return {
    originalUrl,
    webpUrl,
    originalSize: file.size,
    webpSize: webpBlob.size,
    width: img.width,
    height: img.height,
    webpFile: webpBlob,
  };
}

export default function ImageUploader({
  label,
  multiple = false,
  onUploadComplete,
}: ImageUploaderProps) {
  const [previews, setPreviews] = useState<ImageInfo[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const result: ImageInfo[] = [];
    for (const file of Array.from(files)) {
      const info = await convertToWebP(file);
      result.push(info);
    }
    setPreviews(result);
  };

  const handleInsert = () => {
    if (!previews.length) return;
    const blobs = previews.map((p) => p.webpFile);
    onUploadComplete(multiple ? blobs : blobs[0]);
    setPreviews([]);
  };

  return (
    <div className="space-y-2">
      {label && <label className="block mb-1">{label}</label>}
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleChange}
      />
      {previews.length > 0 && (
        <div className="mt-2 space-y-4">
          {previews.map((p, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="text-center">
                <img src={p.originalUrl} alt="orig" className="max-w-[150px]" />
                <p className="text-xs">
                  {(p.originalSize / 1024).toFixed(1)}kB
                </p>
              </div>
              <div className="text-center">
                <img src={p.webpUrl} alt="webp" className="max-w-[150px]" />
                <p className="text-xs">
                  {(p.webpSize / 1024).toFixed(1)}kB WEBP
                </p>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleInsert}
            className="rounded bg-blue-600 px-3 py-1 text-white"
          >
            Вставить
          </button>
        </div>
      )}
    </div>
  );
}
