import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
  runtime: 'edge',
};

const THEMES = [
  { id: 'ai', title: '數位轉型與 AI 未來', summary: '探討人工智慧如何在信仰基礎上引領企業變革。' },
  { id: 'leadership', title: '國度影響力領導力', summary: '在商業競爭中保持靈性生命力，發揮國度領導力。' },
  { id: 'stewardship', title: '土地管理與永續發展', summary: '以管家身分守護受造界。' }
];

const SPEAKERS = [
  { name: '陳大衛 David Chen', title: '矽谷技術領袖 / 國度領袖' },
  { name: 'Sarah Williams', title: 'Global Impact CEO' },
  { name: '張恩年 Joshua Cheung', title: '亞洲影響力聯盟 發起人' },
  { name: '林約翰 John Lin', title: '永續發展基金會 執行長' }
];

const TIMELINE = [
  { year: '2026', region: '美國 鳳凰城', title: '2026 亞太高峰會', description: '在全球半導體中心鳳凰城探討信仰與技術融合。' }
];

const LOCATION_INFO = {
  arizona: "大峽谷之州，象徵強韌生命力。",
  phoenix: "全球半導體新中心，象徵鳳凰火中重生。"
};

export default async function handler(req) {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  try {
    const { message, history = [], language = 'zh' } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return new Response('API Key 缺失', { status: 500 });

    const isEn = language === 'en';
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      systemInstruction: `CRITICAL: STRICTLY based on provided data ONLY. DO NOT speculate, assume, or hallucinate. 
Respond EXCLUSIVELY in ${isEn ? 'ENGLISH' : '繁體中文'}.
Context: ${JSON.stringify({ THEMES, SPEAKERS, TIMELINE, LOCATION_INFO })}.
Guidelines:
1. If info is not in context, state: "抱歉，目前沒有關於這方面的詳細資訊。" or similar.
2. DO NOT create leading questions about details not provided.
3. Suggestions MUST be based on actual context items. 
4. Style: Extremely TERSE, professional, and friendly.
5. ALWAYS end with [SUGGESTIONS] followed by 2-3 brief follow-up questions.`
    });

    let formattedHistory = history
      .filter(msg => msg.content && msg.content.trim() !== '')
      .map(msg => ({ 
        role: msg.role === 'user' ? 'user' : 'model', 
        parts: [{ text: msg.content }] 
      }));

    const firstUserIndex = formattedHistory.findIndex(msg => msg.role === 'user');
    formattedHistory = firstUserIndex !== -1 ? formattedHistory.slice(firstUserIndex).slice(-6) : [];

    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessageStream(message);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            controller.enqueue(encoder.encode(chunk.text()));
          }
        } catch (e) {
          console.error(e);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
