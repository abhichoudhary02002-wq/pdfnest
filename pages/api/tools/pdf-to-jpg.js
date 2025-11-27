export default async function handler(req, res) {
  // PDF->JPG conversion requires rasterization not reliably available in Vercel serverless.
  // If CLOUDCONVERT_API_KEY is provided, client can use CloudConvert directly.
  return res.status(501).json({
    message: "PDF→JPG conversion requires external worker or CloudConvert. Set CLOUDCONVERT_API_KEY and follow README to enable."
  });
}
