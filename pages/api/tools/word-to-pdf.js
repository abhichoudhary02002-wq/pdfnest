export default async function handler(req, res) {
  return res.status(501).json({
    message: "Word→PDF conversion requires external worker or CloudConvert. Set CLOUDCONVERT_API_KEY and follow README to enable."
  });
}
