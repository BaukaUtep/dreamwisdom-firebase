const fs = require('fs')
const path = require('path')

const OUT = path.join(__dirname,'..','out')
const PUB = path.join(__dirname,'..','public')
const langs = ['en','ru','kk']

// Replace Windows/URL-problematic characters with '-'
function idToPath(id){
  return String(id)
    .trim()
    .replace(/[<>:"/\\|?*]+/g, '-') // Windows forbidden
    .replace(/\s+/g,'-');
}

function escapeHtml(s){
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;')
}

function tpl(html){
  return `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${html.title} — DreamWisdom</title><meta name="description" content="${html.description}"/></head>
<body><main style="max-width:720px;margin:40px auto;padding:0 20px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Helvetica,Arial,sans-serif">
${html.body}
</main></body></html>`
}

for(const lng of langs){
  const idx = JSON.parse(fs.readFileSync(path.join(PUB,'data',`symbols_index_${lng}.json`),'utf-8'))
  const groups = {}
  for(const [id, meta] of Object.entries(idx)){
    const L = meta.letter
    groups[L] = groups[L] || []
    groups[L].push(id)
  }
  for(const [letter, ids] of Object.entries(groups)){
    const list = JSON.parse(fs.readFileSync(path.join(PUB,'data',lng,`${letter}.json`),'utf-8'))
    const map = {}
    for(const it of list){ map[it.id] = it }
    for(const id of ids){
      const it = map[id]
      if(!it) continue
      const folder = idToPath(id)
      const dir = path.join(OUT, lng, 'dictionary', folder)
      fs.mkdirSync(dir, { recursive: true })
      const html = tpl({
        title: escapeHtml(it.label),
        description: `Interpretation of "${escapeHtml(it.label)}" in Islamic dream tradition.`,
        body: `<h1>${escapeHtml(it.label)}</h1><div style="color:#666;margin:.25rem 0 1rem 0">${escapeHtml(it.category||'')}</div><article style="white-space:pre-line">${escapeHtml(it.meaning||'')}</article>`
      })
      fs.writeFileSync(path.join(dir,'index.html'), html)
    }
  }
}

console.log('Static symbol pages generated (filesystem-safe ids).')