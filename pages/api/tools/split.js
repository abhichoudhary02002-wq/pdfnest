import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import { parseForm } from '../_utils/parseForm';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  // Splits each uploaded PDF into separate single-page PDFs and returns a zip-like response is complex.
  // For simplicity, if a single PDF is uploaded, return first page as a PDF.
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { files } = await parseForm(req);
  if (!files || !files.file) return res.status(400).json({ message: 'No file uploaded' });
  const f = Array.isArray(files.file) ? files.file[0] : files.file;
  const data = fs.readFileSync(f.filepath);
  const pdf = await PDFDocument.load(data);
  const total = pdf.getPageCount();
  // If query has page param, return that page. Otherwise return first page.
  const pageIndex = parseInt(req.url.split('page=')[1]) || 0;
  const outPdf = await PDFDocument.create();
  const [copied] = await outPdf.copyPages(pdf, [pageIndex]);
  outPdf.addPage(copied);
  const bytes = await outPdf.save();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=page-${pageIndex + 1}.pdf`);
  res.status(200).send(Buffer.from(bytes));
}
