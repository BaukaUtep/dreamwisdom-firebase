export default function Contacts({ params }: { params: { locale: 'en'|'ru'|'kk' } }) {
  const t = {
    en: { h: 'Contacts', p: 'Have suggestions? Write to us.' },
    ru: { h: 'Контакты', p: 'Есть предложения? Напишите нам.' },
    kk: { h: 'Байланыс', p: 'Ұсыныстарыңыз бар ма? Бізге жазыңыз.' }
  }[params.locale];
  return (
    <section>
      <h1 className="text-2xl font-bold">{t.h}</h1>
      <p className="mt-2 text-gray-700">{t.p}</p>
      <a className="mt-6 inline-block rounded-xl border border-gray-300 px-4 py-2" href="mailto:butepberge@gmail.com">butepberge@gmail.com</a>
    </section>
  );
}
