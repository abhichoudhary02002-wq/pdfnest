# CloudConvert integration (optional)

For heavy conversions (PDF->JPG, Word->PDF, Protect/Unlock), use CloudConvert API.

Example flow:
1. Upload file to CloudConvert via their upload endpoint or directly from client.
2. Start a conversion job (e.g., docx to pdf, pdf to jpg).
3. Poll for job completion and download result.

Set env var CLOUDCONVERT_API_KEY to enable.

See: https://cloudconvert.com/api/v2
