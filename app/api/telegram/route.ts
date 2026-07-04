import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { message } = body;

  if (!message?.text) {
    return NextResponse.json({ ok: true });
  }

  const chatId = String(message.chat.id);
  const text: string = message.text;

  // TODO: implement command routing
  if (text === '/start') {
    // sendMessage(chatId, 'Welcome to Slow Drip! ...')
    console.log(`/start from chatId ${chatId}`);
  } else if (text === '/orders') {
    // sendMessage(chatId, 'No active orders.')
    console.log(`/orders from chatId ${chatId}`);
  }

  return NextResponse.json({ ok: true });
}
