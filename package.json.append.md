
Add this script to your package.json "scripts":

  "build:preview": "node scripts/use-dev-env.js && next build && next export && node scripts/postbuild.js"

Usage:
  npm run build:preview
