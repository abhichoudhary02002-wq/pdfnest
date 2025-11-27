import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import dbConnect from '../../../lib/dbConnect';
import FileRecord from '../../../models/FileRecord';
import { parseForm, config } from '../_utils/parseForm';
export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { files } = await parseForm(req);
  let fileArray = [];
  if (!files || !files.file) return res.status(400).json({ message: 'No files uploaded' });
  fileArray = Array.isArray(files.file) ? files.file : [files.file];

  const mergedPdf = await PDFDocument.create();
  for (const f of fileArray) {
    const data = fs.readFileSync(f.filepath);
    const donor = await PDFDocument.load(data);
    const copied = await mergedPdf.copyPages(donor, donor.getPageIndices());
    copied.forEach(p => mergedPdf.addPage(p));
  }
  const mergedBytes = await mergedPdf.save();

  // save file temporarily
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=merged.pdf');
  res.status(200).send(Buffer.from(mergedBytes));
}
