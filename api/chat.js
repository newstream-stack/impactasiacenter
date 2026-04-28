import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
  runtime: 'edge',
};

const THEMES = [
  { id: 'ai', title: '數位轉型與 AI 未來', summary: '探討人工智慧如何在信仰基礎上引領企業變革，從矽谷技術視角看數位轉型。' },
  { id: 'leadership', title: '國度影響力領導力', summary: '在商業競爭中保持靈性生命力，發揮國度領導力。' },
  { id: 'stewardship', title: '土地管理與永續發展', summary: '以管家身分守護受造界，探討企業永續與環境責任。' }
];

const SPEAKERS = [
  { name: '陳大衛 David Chen', title: '矽谷技術領袖 / 國度領袖', expert: 'AI 技術、數位轉型、矽谷創業經驗' },
  { name: 'Sarah Williams', title: 'Global Impact CEO', expert: '跨國組織領導、社會影響力投資' },
  { name: '張恩年 Joshua Cheung', title: '亞洲影響力聯盟 發起人', expert: '國度宣教策略、領導力培育' },
  { name: '林約翰 John Lin', title: '永續發展基金會 執行長', expert: 'ESG 策略、環境保護、管家職分' }
];

const TIMELINE = [
  { year: '2026', region: '美國 鳳凰城', title: '2026 亞太高峰會', description: '曠野中的重生：在全球半導體新中心鳳凰城，探討信仰與技術的融合。', active: true }
];

const LOCATION_INFO = {
  arizona: {
    overview: "亞利桑那州（大峽谷之州）擁有壯闊地貌，象徵強韌生命力。",
    spiritual: "曠野地景與『曠野中的重生』主題契合，是靈性再造的聖地。"
  },
  phoenix: {
    overview: "鳳凰城是全球半導體與高科技新中心（矽沙漠），如台積電投資地。",
    symbolism: "鳳凰象徵火中重生，與年會主題呼應。"
  }
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
      systemInstruction: `Respond EXCLUSIVELY in ${isEn ? 'ENGLISH' : '繁體中文'}. 
You are the IAA 2026 Assistant. 
Context: ${JSON.stringify({ THEMES, SPEAKERS, TIMELINE, LOCATION_INFO })}. 
Style: Casual, friendly, TERSE. 
Triggers: Use [TRIGGER:theme_id] (ai, leadership, stewardship) when discussing those themes. 
Suggestions: ALWAYS end with [SUGGESTIONS] followed by 2-3 brief questions (no labels like q1:).`
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
