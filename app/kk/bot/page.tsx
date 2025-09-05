import ChatClient from '../../../components/ChatClient';

export default function BotPage() {
  const ENDPOINT = 'https://noor-dreams-bot-nowl.onrender.com/api/interpret';
  return (
    <section>
      <h1 className="text-2xl font-bold">Dream Bot</h1>
      <p className="mt-2 text-gray-700 whitespace-pre-line">
        {`Түстер мағынасы туралы онлайн-чат.\nЖорулар тек ақпараттық мақсатта беріледі.\nЖорулар жеке ой-пікірді және білетін адамдардың кеңесін алмастырмайды.`}
      </p>

      <div className="mt-4">
        <ChatClient endpoint={ENDPOINT} locale="kk" />
      </div>

      <a
        href="https://t.me/DreamWisdom_bot"
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-6 rounded-2xl bg-accent-500 px-5 py-3 font-semibold text-white"
      >
        Telegram-да ашу (@DreamWisdom_bot)
      </a>
    </section>
  );
}
