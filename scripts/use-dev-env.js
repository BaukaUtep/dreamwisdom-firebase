
// Copies .env.development -> .env.production for preview builds.
const fs = require('fs')
if (fs.existsSync('.env.development')) {
  try {
    fs.copyFileSync('.env.development', '.env.production')
    console.log('(.env.development) copied to (.env.production) for preview build')
  } catch (e) {
    console.warn('Could not copy env file:', e.message)
  }
} else {
  console.log('No .env.development found; skipping copy.')
}
