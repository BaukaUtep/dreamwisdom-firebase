export default function BlogPage({ params }: { params: { locale: 'en'|'ru'|'kk' } }) {
  const t = {
    en: { h: 'Dream Blog', p: 'Guides, symbolism, cultural context. (Coming soon)' },
    ru: { h: 'Блог о снах', p: 'Гайды, символика, культурный контекст. (Скоро)' },
    kk: { h: 'Түстер блогы', p: 'Нұсқаулықтар, символика, мәдени контекст. (Жақында)' }
  }[params.locale];
  return (
    <section>
      <h1 className="text-2xl font-bold">{t.h}</h1>
      <p className="mt-2 text-gray-700">{t.p}</p>
    </section>
  );
}
