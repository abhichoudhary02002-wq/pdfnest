import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import sharp from 'sharp';
import { parseForm } from '../_utils/parseForm';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { files } = await parseForm(req);
  if (!files || !files.file) return res.status(400).json({ message: 'No files uploaded' });
  const fileArray = Array.isArray(files.file) ? files.file : [files.file];
  const pdfDoc = await PDFDocument.create();

  for (const f of fileArray) {
    const imgBuf = fs.readFileSync(f.filepath);
    const png = await sharp(imgBuf).png().toBuffer();
    const img = await pdfDoc.embedPng(png);
    const page = pdfDoc.addPage([img.width, img.height]);
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
  }

  const out = await pdfDoc.save();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=converted.pdf');
  res.status(200).send(Buffer.from(out));
}
