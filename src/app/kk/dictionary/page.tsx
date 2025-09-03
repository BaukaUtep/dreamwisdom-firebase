'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useEffect, useMemo, useState } from 'react'

const LNG = 'kk' as const
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('')

type Item = { id:string; label:string; category:string; meaning:string }

function idToPath(id:string){
  return String(id).trim().replace(/[<>:"/\\|?*]+/g,'-').replace(/\s+/g,'-')
}

async function loadLetter(letter: string): Promise<Item[]>{
  const res = await fetch(`/data/${LNG}/${letter}.json`)
  return res.json()
}

export default function Page(){
  const [items, setItems] = useState<Item[]>([])
  const [active, setActive] = useState('A')
  const [q, setQ] = useState('')

  useEffect(() => { loadLetter(active).then(setItems) }, [active])

  const filtered = useMemo(() => {
    if(!q) return items
    const qa = q.toLowerCase()
    return items.filter(i => (i.label||'').toLowerCase().includes(qa) || (i.meaning||'').toLowerCase().includes(qa))
  }, [items,q])

  return (
    <div>
      <Header lng={LNG} />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Symbol Dictionary</h1>
        <div className="grid md:grid-cols-[1fr,200px] gap-4">
          <input className="input" placeholder="Search symbols..." value={q} onChange={e=>setQ(e.target.value)} />
          <select className="input" value={active} onChange={e=>setActive(e.target.value)}>
            {letters.map(L => <option key={L} value={L}>{L}</option>)}
          </select>
        </div>
        <div className="mt-4 text-sm text-gray-600">Showing {filtered.length} symbols</div>
        <div className="mt-4 space-y-3">
          {filtered.map(i => {
            const href = `/${LNG}/dictionary/${idToPath(i.id)}/`
            return (
              <a key={i.id} href={href} className="block card p-4">
                <div className="font-semibold">{i.label}</div>
                <div className="text-xs mt-1 text-gray-500">{i.category}</div>
              </a>
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}
