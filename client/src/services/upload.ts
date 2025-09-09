// services/upload.ts
export async function uploadImageToCloudinary(file: File, opts: {
  cloudName: string;        // למשל: "demo"
  uploadPreset: string;     // למשל: "unsigned_preset"
}) {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('upload_preset', opts.uploadPreset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${opts.cloudName}/image/upload`, {
    method: 'POST',
    body: fd,
  });
  if (!res.ok) throw new Error('Cloudinary upload failed');
  const data = await res.json();
  return data.secure_url as string; // זה ה-URL ששומרים ב-imageUrl
}
