import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
  runtime: 'edge',
};

const THEMES = [
  { id: 'ai', title: '數位轉型與 AI 未來', summary: '探討人工智慧如何在信仰基礎上引領企業變革...' },
  { id: 'leadership', title: '國度影響力領導力', summary: '在高壓競爭的商業叢林中，如何保持靈性生命力...' },
  { id: 'stewardship', title: '土地管理與永續發展', summary: '以管家的身分守護受造界...' }
];

const SPEAKERS = [
  { name: '陳大衛 David Chen', title: '矽谷技術領袖 / 國度領袖' },
  { name: 'Sarah Williams', title: 'Global Impact CEO' },
  { name: '張恩年 Joshua Cheung', title: '亞洲影響力聯盟 發起人' },
  { name: '林約翰 John Lin', title: '永續發展基金會 執行長' }
];

const TIMELINE = [
  { year: '2026', region: '美國 鳳凰城', title: '美國', description: '曠野中的重生', active: true }
];

const LOCATION_INFO = {
  arizona: {
    overview: "亞利桑那州被稱為『大峽谷之州』（The Grand Canyon State），擁有世界七大自然奇觀之一的大峽谷。這裡有壯闊的紅岩地貌與強韌生命力。",
    spiritual_connection: "這片曠野是靈性重生的聖地。"
  },
  phoenix: {
    overview: "鳳凰城是全球半導體新中心，一座從沙漠中崛起的現代化大都市。",
    symbolism: "『鳳凰』象徵火中重生，與會主題『曠野中的重生』完美契合。"
  }
};

export default async function handler(req) {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  const { message, history = [], language = 'zh' } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return new Response('API Key 缺失', { status: 500 });

  const isEn = language === 'en';

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      systemInstruction: `Respond in ${isEn ? 'ENGLISH' : '繁體中文'}. You are IAA assistant. Info: ${JSON.stringify({ THEMES, SPEAKERS, TIMELINE, LOCATION_INFO })}. Tone: Terse, friendly. Triggers: [TRIGGER:id] (ai, leadership, stewardship). Suggestions: [SUGGESTIONS] q1, q2.`
    });

    let formattedHistory = history
      .filter(msg => msg.content && msg.content.trim() !== '')
      .map(msg => ({ role: msg.role === 'user' ? 'user' : 'model', parts: [{ text: msg.content }] }));

    const firstUserIndex = formattedHistory.findIndex(msg => msg.role === 'user');
    formattedHistory = firstUserIndex !== -1 ? formattedHistory.slice(firstUserIndex).slice(-6) : [];

    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessageStream(message);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          controller.enqueue(encoder.encode(chunk.text()));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}ser' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

    // Gemini 要求第一條訊息必須是 'user'
    const firstUserIndex = formattedHistory.findIndex(msg => msg.role === 'user');
    if (firstUserIndex !== -1) {
      formattedHistory = formattedHistory.slice(firstUserIndex);
    } else {
      formattedHistory = [];
    }

    // 限制最近 10 則
    formattedHistory = formattedHistory.slice(-10);

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessageStream(message);
    
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      res.write(chunkText);
    }
    
    res.end();
  } catch (error) {
    console.error("Gemini Error:", error);
    if (!res.writableEnded) {
      res.status(500).json({ error: error.message });
    }
  }
}
