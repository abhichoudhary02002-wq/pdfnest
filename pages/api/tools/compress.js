import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import sharp from 'sharp';
import { parseForm } from '../_utils/parseForm';

export const config = { api: { bodyParser: false } };

// Simple compress: rasterize each page to JPEG at lower quality and re-embed in PDF
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { files } = await parseForm(req);
  if (!files || !files.file) return res.status(400).json({ message: 'No file uploaded' });
  const f = Array.isArray(files.file) ? files.file[0] : files.file;
  const data = fs.readFileSync(f.filepath);
  const pdf = await PDFDocument.load(data);
  const outPdf = await PDFDocument.create();
  const total = pdf.getPageCount();
  for (let i=0;i<total;i++) {
    // render page to PNG via pdf-lib is not available; so we return 501 if rendering not supported.
    return res.status(501).json({ message: 'Compress (raster) requires external worker or CloudConvert. See README.' });
  }
}
