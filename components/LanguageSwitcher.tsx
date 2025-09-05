'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function replaceLocale(p: string, n: string) {
  const a = p.split('/').filter(Boolean);
  const k = ['en', 'ru', 'kk'];
  if (!a.length) return `/${n}/`;
  if (k.includes(a[0])) a[0] = n; else a.unshift(n);
  return '/' + a.join('/') + '/';
}

export function LanguageSwitcher() {
  const path = usePathname() || '/';
  const langs = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'kk', label: 'KZ' },
  ];

  const current = (() => {
    const first = path.split('/').filter(Boolean)[0];
    return ['en','ru','kk'].includes(first as any) ? first : 'en';
  })();

  return (
    <nav className="flex gap-1 rounded-xl border border-gray-200 p-1">
      {langs.map(l => (
        <Link
          key={l.code}
          href={replaceLocale(path, l.code)}
          onClick={() => { try { localStorage.setItem('dw_locale', l.code) } catch {} }}
          className={
            'px-2 py-1 text-sm rounded-lg hover:bg-gray-100 ' +
            (current === l.code ? 'bg-gray-100 font-medium' : '')
          }
          aria-current={current === l.code ? 'page' : undefined}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
