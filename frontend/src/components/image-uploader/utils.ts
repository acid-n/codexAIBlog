export default async function getCroppedImg(
  src: string,
  crop: { x: number; y: number },
  zoom: number,
): Promise<Blob> {
  const img = document.createElement("img");
  img.src = src;
  await new Promise((resolve) => {
    img.onload = resolve;
  });
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const size = img.width * zoom;
  canvas.width = size;
  canvas.height = size;
  ctx.drawImage(img, crop.x, crop.y, size, size, 0, 0, size, size);
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob as Blob);
    }, "image/jpeg");
  });
}
