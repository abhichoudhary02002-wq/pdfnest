# PDFNest - Tools Website (Vercel-ready)

This is a starter full-stack project for **PDFNest** — an online PDF tools website.
Features included:
- User auth (Email + Password, JWT)
- Tools implemented: Merge PDF, JPG → PDF, Split PDF, Compress PDF
- Optional integrations for heavy conversions (PDF→JPG, Word→PDF, Protect/Unlock) via CloudConvert
- Vercel-friendly (serverless API routes under `pages/api`)

## Quick start (local)

1. Copy `.env.example` to `.env.local` and fill values.
2. Install:
```bash
npm install
```
3. Run dev:
```bash
npm run dev
```
4. Open http://localhost:3000

## Deploy to Vercel

1. Push repo to GitHub.
2. Import project in Vercel and set environment variables (see `.env.example`).
3. Deploy.

## Environment variables

Copy `.env.example` to `.env.local` and fill:

- MONGODB_URI - your MongoDB Atlas connection string
- JWT_SECRET - secret for JWT tokens
- CLOUDCONVERT_API_KEY - (optional) CloudConvert API key for PDF→JPG, Word→PDF, Protect/Unlock

## Notes on conversions

- Merge, JPG→PDF, Split, Compress: Implemented using `pdf-lib` + `sharp`. Works for moderate file sizes.
- PDF→JPG, Word→PDF, Protect/Unlock: Recommended to enable `CLOUDCONVERT_API_KEY` and use CloudConvert. Code includes helper stubs.

## Project structure

- pages/ - Next.js pages and API routes
- lib/ - utilities (dbConnect, pdf helpers)
- models/ - Mongoose models
- public/ - static assets
- README.md - this file

If you want, I can:
- Add full UI with Tailwind components
- Connect CloudConvert for heavy conversions
- Prepare a production deployment checklist

