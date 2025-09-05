import ChatClient from '../../../components/ChatClient';

type Lang = 'en' | 'ru' | 'kk';

export default function BotPage({ params }: { params: { locale: Lang } }) {
  const ENDPOINT = 'https://noor-dreams-bot-nowl.onrender.com/api/interpret';

  const supported: Lang[] = ['en', 'ru', 'kk'];
  const lang: Lang = (supported.includes(params.locale) ? params.locale : 'en') as Lang;

  const t = {
    en: {
      h: 'Dream Bot',
      p: [
        'Online chat about the meaning of dreams.',
        'Interpretations are for informational purposes only.',
        'Interpretations do not replace your own thoughts and advice from knowledgeable people.',
      ],
      btn: 'Open in Telegram (@DreamWisdom_bot)',
    },
    ru: {
      h: 'Dream Bot',
      p: [
        'Онлайн-чат о значениях снов.',
        'Интерпретации носят исключительно ознакомительный характер.',
        'Интерпретации не заменяют собственных размышлений и советов знающих людей.',
      ],
      btn: 'Открыть в Telegram (@DreamWisdom_bot)',
    },
    kk: {
      h: 'Dream Bot',
      p: [
        'Түстер мағынасы туралы онлайн-чат.',
        'Жорулар тек ақпараттық мақсатта беріледі.',
        'Жорулар жеке ой-пікірді және білетін адамдардың кеңесін алмастырмайды.',
      ],
      btn: 'Telegram-да ашу (@DreamWisdom_bot)',
    },
  }[lang];

  return (
    <section>
      <h1 className="text-2xl font-bold">{t.h}</h1>

      <p className="mt-2 text-gray-700 whitespace-pre-line">
        {t.p.join('\n')}
      </p>

      <div className="mt-4">
        <ChatClient endpoint={ENDPOINT} locale={lang} />
      </div>

      <a
        href="https://t.me/DreamWisdom_bot"
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-6 rounded-2xl bg-accent-500 px-5 py-3 font-semibold text-white"
      >
        {t.btn}
      </a>
    </section>
  );
}
