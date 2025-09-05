import ChatClient from '../../../components/ChatClient';

export default function BotPage() {
  const ENDPOINT = 'https://noor-dreams-bot-nowl.onrender.com/api/interpret';
  return (
    <section>
      <h1 className="text-2xl font-bold">Dream Bot</h1>
      <p className="mt-2 text-gray-700 whitespace-pre-line">
        {`Online chat about the meaning of dreams.\nInterpretations are for informational purposes only.\nInterpretations do not replace your own thoughts and advice from knowledgeable people.`}
      </p>

      <div className="mt-4">
        <ChatClient endpoint={ENDPOINT} locale="en" />
      </div>

      <a
        href="https://t.me/DreamWisdom_bot"
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-6 rounded-2xl bg-accent-500 px-5 py-3 font-semibold text-white"
      >
        Open in Telegram (@DreamWisdom_bot)
      </a>
    </section>
  );
}
