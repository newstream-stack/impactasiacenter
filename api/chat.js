import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
  runtime: 'edge',
};

const THEMES = [
  { 
    id: 'ai', 
    title: '數位轉型與 AI 未來', 
    summary: '探討人工智慧如何在信仰基礎上引領企業變革，實現曠野中的技術突破。',
    points: ['人工智慧與信仰倫理', '從數據到生命智慧', '企業治理的 AI 聖約模式']
  },
  { 
    id: 'leadership', 
    title: '國度影響力領導力', 
    summary: '在高壓競爭的商業叢林中，如何保持靈性生命力，發揮僕人領導者的價值。',
    points: ['荒漠中的生命綠洲', '連結兩代', '逆境成長']
  },
  { 
    id: 'stewardship', 
    title: '土地管理與永續發展', 
    summary: '以管家的身分守護受造界，連結 ESG 與永續商業模式的實踐與委身。',
    points: ['聖經視野下的 ESG', '供應鏈透明化與勞工正義', '荒漠綠化']
  }
];

const SPEAKERS = [
  { name: '陳大衛 David Chen', title: '矽谷技術領袖 / 國度領袖', bio: '專精於 AI 倫理與企業轉型。' },
  { name: 'Sarah Williams', title: 'Global Impact CEO', bio: '跨國影響力投資專家。' },
  { name: '張恩年 Joshua Cheung', title: '亞洲影響力聯盟 發起人', bio: '推動亞洲教會與企業的國度連結。' },
  { name: '林約翰 John Lin', title: '永續發展基金會 執行長', bio: '深耕 ESG 與土地管家職分。' }
];

const TIMELINE = [
  { year: '2026', region: '美國 鳳凰城 (Phoenix, Arizona)', title: 'Impact Asia Alliance Summit', description: '在全球半導體中心探討「曠野中的重生」。' }
];

const REGISTRATION_URLS = {
  zh: "https://ct.org.tw/html/activity/6-3.php?article=38&area=&id=&parentid=",
  en: "https://ct.org.tw/html/activity/6-3.php?article=39&area=&id=&parentid="
};

const LOCATION_INFO = {
  arizona: "大峽谷之州，象徵強韌生命力與神的創造。",
  phoenix: "全球半導體新中心，象徵從火中重生的鳳凰，呼應年會主題「重生」。"
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
      systemInstruction: `You are the official AI assistant for the Impact Asia Alliance Summit 2026.
STRICTLY based on provided context. DO NOT hallucinate or speculate.
Context: ${JSON.stringify({ THEMES, SPEAKERS, TIMELINE, LOCATION_INFO, REGISTRATION_URLS })}.

Response Guidelines:
1. Language: Respond EXCLUSIVELY in ${isEn ? 'ENGLISH' : '繁體中文'}.
2. Registration: If asked how to join or register, provide this Markdown link: [${isEn ? 'Register Now' : '立即報名'}](${isEn ? REGISTRATION_URLS.en : REGISTRATION_URLS.zh}).
3. Triggers: Use [TRIGGER:id] (ai, leadership, stewardship) ONLY when the user asks for details about those specific themes.
4. Suggestions: ALWAYS end with [SUGGESTIONS] followed by 2-3 brief clickable questions user might ask next, SEPARATED BY COMMAS.
5. Tone: Professional, premium, welcoming, and concise.`
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
