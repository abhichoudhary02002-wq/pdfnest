export default async function handler(req, res) {
  return res.status(501).json({
    message: "PDF Protect (password) requires external service (CloudConvert/qpdf). See README."
  });
}
