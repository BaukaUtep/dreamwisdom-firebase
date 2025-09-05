'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const SUPPORTED = ['en', 'ru', 'kk'] as const
const FALLBACK = 'en'

function pickLocale(): 'en'|'ru'|'kk' {
  try {
    // 1) если пользователь уже выбирал язык — уважаем его выбор
    const saved = localStorage.getItem('dw_locale')
    if (saved && SUPPORTED.includes(saved as any)) return saved as any

    // 2) смотрим язык браузера
    const nav = navigator.languages?.[0] || navigator.language || ''
    const l = nav.toLowerCase()
    if (l.startsWith('ru')) return 'ru'
    if (l.startsWith('kk') || l.startsWith('kz')) return 'kk'
  } catch {}
  return FALLBACK
}

export default function RootRedirect() {
  const router = useRouter()
  useEffect(() => {
    const loc = pickLocale()
    router.replace(`/${loc}/`)
  }, [router])
  return null
}
