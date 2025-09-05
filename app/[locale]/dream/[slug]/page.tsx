import fs from 'node:fs';
import path from 'node:path';

function readData(locale: 'en'|'ru'|'kk') {
  const p = path.join(process.cwd(), 'data', `dreams_${locale}.json`);
  const raw = fs.readFileSync(p, 'utf-8');
  return JSON.parse(raw);
}

export async function generateStaticParams() {
  const en = readData('en');
  return en.map((e: any) => ({ locale: 'en', slug: e.slug }))
    .concat(en.map((e: any) => ({ locale: 'ru', slug: e.slug })))
    .concat(en.map((e: any) => ({ locale: 'kk', slug: e.slug })));
}

export default function DreamPage({ params }: { params: { locale: 'en'|'ru'|'kk', slug: string } }) {
  const { locale, slug } = params;
  const data = readData(locale);
  const item = data.find((x: any) => x.slug === slug);
  if (!item) return <div className="py-16">Not found</div>;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'name': item.label,
    'about': 'Islamic dream interpretation',
    'inLanguage': locale,
    'alternateName': slug,
    'text': item.meaning
  };

  return (
    <article className="prose prose-slate max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1>{item.label}</h1>
      {item.category && <p><span className="text-gray-500">Category:</span> {item.category}</p>}
      <div className="whitespace-pre-wrap leading-7">{item.meaning}</div>
    </article>
  );
}
