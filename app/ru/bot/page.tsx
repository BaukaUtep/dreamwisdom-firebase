import ChatClient from '../../../components/ChatClient';

export default function BotPage() {
  const ENDPOINT = 'https://noor-dreams-bot-nowl.onrender.com/api/interpret';
  return (
    <section>
      <h1 className="text-2xl font-bold">Dream Bot</h1>
      <p className="mt-2 text-gray-700 whitespace-pre-line">
        {`Онлайн-чат о значениях снов.\nИнтерпретации носят исключительно ознакомительный характер.\nИнтерпретации не заменяют собственных размышлений и советов знающих людей.`}
      </p>

      <div className="mt-4">
        <ChatClient endpoint={ENDPOINT} locale="ru" />
      </div>

      <a
        href="https://t.me/DreamWisdom_bot"
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-6 rounded-2xl bg-accent-500 px-5 py-3 font-semibold text-white"
      >
        Открыть в Telegram (@DreamWisdom_bot)
      </a>
    </section>
  );
}
