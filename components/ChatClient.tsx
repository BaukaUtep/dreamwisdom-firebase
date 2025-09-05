'use client';
import { useEffect, useRef, useState } from 'react';

type Msg = { role: 'user' | 'bot'; text: string };

function extractAnswer(json: any, raw: string) {
  if (json && typeof json === 'object') {
    // Под API: главный ключ — "answer"
    return json.answer ?? json.reply ?? json.result ?? json.message ?? JSON.stringify(json);
  }
  return raw;
}

export default function ChatClient({
  endpoint,
  locale,
}: {
  endpoint: string;            // https://noor-dreams-bot-nowl.onrender.com/api/interpret
  locale: 'en' | 'ru' | 'kk';
}) {
  const [history, setHistory] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const ui = {
    en: { placeholder: 'Type your dream…', send: 'Send', empty: 'Say hi to the bot 👋' },
    ru: { placeholder: 'Опишите свой сон…', send: 'Отправить', empty: 'Напишите первыми 👋' },
    kk: { placeholder: 'Түсті жазыңыз…', send: 'Жіберу', empty: 'Алдымен жазыңыз 👋' },
  }[locale];

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight });
  }, [history, loading]);

  async function askBackend(message: string) {
    // 1) Пытаемся POST (основной путь)
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const ct = res.headers.get('content-type') || '';
      const raw = ct.includes('application/json') ? '' : await res.text().catch(() => '');
      const json = ct.includes('application/json') ? await res.json().catch(() => null) : null;

      if (res.ok) return extractAnswer(json, raw);
      // если сервер ответил ошибкой — покажем её текст
      return `Error ${res.status}: ${extractAnswer(json, raw)}`;
    } catch (e) {
      // пойдём на GET как запасной вариант (часто без предварительного CORS-префлайта)
      try {
        const url = `${endpoint}?message=${encodeURIComponent(message)}`;
        const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
        const ct = res.headers.get('content-type') || '';
        const raw = ct.includes('application/json') ? '' : await res.text().catch(() => '');
        const json = ct.includes('application/json') ? await res.json().catch(() => null) : null;
        if (res.ok) return extractAnswer(json, raw);
        return `Error ${res.status}: ${extractAnswer(json, raw)}`;
      } catch (e2: any) {
        return `Network error. Is CORS enabled on the API? (${e2?.message || e2})`;
      }
    }
  }

  async function onSend() {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setHistory((h) => [...h, { role: 'user', text }]);
    setLoading(true);

    const reply = await askBackend(text);
    setHistory((h) => [...h, { role: 'bot', text: reply }]);
    setLoading(false);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') onSend();
  }

  return (
    <div className="max-w-3xl">
      <div
        ref={boxRef}
        className="h-[45vh] sm:h-[60vh] md:h-[65vh] w-full overflow-y-auto rounded-2xl border border-gray-200 p-4 bg-white"
      >
        {history.length === 0 && (
          <p className="text-gray-400 text-sm">{ui.empty}</p>
        )}
        <ul className="space-y-3">
          {history.map((m, i) => (
            <li key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
              <span
                className={
                  'inline-block max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ' +
                  (m.role === 'user'
                    ? 'bg-brand-500 text-white'
                    : 'bg-gray-100 text-gray-900')
                }
              >
                {m.text}
              </span>
            </li>
          ))}
          {loading && (
            <li className="text-left">
              <span className="inline-block rounded-2xl bg-gray-100 px-3 py-2 text-sm text-gray-500">
                …
              </span>
            </li>
          )}
        </ul>
      </div>

      <div className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder={ui.placeholder}
          className="flex-1 rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-400"
        />
        <button
          onClick={onSend}
          disabled={loading}
          className="rounded-2xl bg-accent-500 px-5 py-3 font-semibold text-white disabled:opacity-50"
        >
          {ui.send}
        </button>
      </div>
    </div>
  );
}
