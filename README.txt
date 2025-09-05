Dream Dictionary — Next.js static site (EN/RU/KZ) + Firebase Hosting

Quick start:
1) Install Node.js LTS (v20+ recommended): https://nodejs.org/en
2) In this folder, run:
   npm i
   npm run dev
   # open http://localhost:3000/en/ (also /ru/ and /kk/)

Build + sitemap:
   npm run build  # outputs to ./out plus ./out/sitemap.xml

Deploy to Firebase:
   npm i -g firebase-tools
   firebase login
   firebase init hosting   # use 'out' as public dir, single-page app: No
   firebase deploy

Notes:
- Data files are in ./data (for static build) and ./public/data (for client search).
- Change SITE_URL in scripts/generate-sitemap.mjs and metadataBase in app/layout.tsx to your real domain before deploy.
