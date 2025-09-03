const fs = require('fs')
const path = require('path')

const PUBLIC = path.join(__dirname,'..','public')
const BASE = (process.env.SITE_ORIGIN || 'https://YOUR_DOMAIN').replace(/\/$/,'')
const langs = ['en','ru','kk']

// Same sanitizer to keep URLs == filenames
function idToPath(id){
  return String(id)
    .trim()
    .replace(/[<>:"/\\|?*]+/g, '-')
    .replace(/\s+/g,'-');
}

function url(loc, priority=0.6){
  const lastmod = new Date().toISOString()
  return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><priority>${priority}</priority></url>`
}

let urls = []
// static pages
for(const lng of langs){
  urls.push(url(`${BASE}/${lng}/`, 0.9))
  urls.push(url(`${BASE}/${lng}/interpreter/`))
  urls.push(url(`${BASE}/${lng}/dictionary/`))
  urls.push(url(`${BASE}/${lng}/history/`))
  urls.push(url(`${BASE}/${lng}/contact/`))
}
// dictionary detail pages
for(const lng of langs){
  const idx = JSON.parse(fs.readFileSync(path.join(PUBLIC,'data',`symbols_index_${lng}.json`),'utf-8'))
  for(const id of Object.keys(idx)){
    const folder = idToPath(id)
    urls.push(url(`${BASE}/${lng}/dictionary/${folder}/`, 0.7))
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`
fs.writeFileSync(path.join(PUBLIC,'sitemap.xml'), xml)
console.log('sitemap.xml generated with', urls.length, 'urls (filesystem-safe ids)')