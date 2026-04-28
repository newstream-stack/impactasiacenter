import { GoogleGenerativeAI } from "@google/generative-ai";

const THEMES = [
  { id: 'ai', title: '數位轉型與 AI 未來', summary: '探討人工智慧如何在信仰基礎上引領企業變革...' },
  { id: 'leadership', title: '國度影響力領導力', summary: '在高壓競爭的商業叢林中，如何保持靈性生命力...' },
  { id: 'stewardship', title: '土地管理與永續發展', summary: '以管家的身分守護受造界...' }
];

const SPEAKERS = [
  { name: '陳大衛 David Chen', title: '矽谷技術領袖' },
  { name: 'Sarah Williams', title: 'Global Impact CEO' },
  { name: '張恩年 Joshua Cheung', title: '亞洲影響力聯盟 發起人' },
  { name: '林約翰 John Lin', title: '永續發展基金會 執行長' }
];

const TIMELINE = [
  { year: '2026', region: '美國 鳳凰城', title: '美國', description: '曠野中的重生', active: true }
];

const LOCATION_INFO = {
  arizona: {
    overview: "亞利桑那州被稱為『大峽谷之州』（The Grand Canyon State），擁有世界七大自然奇觀之一的大峽谷。這裡有壯闊的紅岩地貌（如靈性之城色多娜 Sedona）與巨大的巨人柱仙人掌（Saguaro），象徵著在極端環境中依然挺立的強韌生命力。",
    spiritual_connection: "這片曠野不僅是地理上的沙漠，更是靈性重生的聖地。正如聖經中以色列人在曠野受試煉並經歷上帝，參與者能在亞利桑那的廣袤中重新遇見上帝。"
  },
  phoenix: {
    overview: "鳳凰城（Phoenix）是全美第五大城市，也是全球半導體與高科技的新中心（矽沙漠），如台積電（TSMC）在此的重大投資。它是一座從乾旱沙漠中透過灌溉與創新奇蹟般崛起的現代化大都市。",
    symbolism: "『鳳凰』在神話中象徵火中重生，與 2026 年會的主題『曠野中的重生』完美契合。這裡展現了如何透過遠見、技術與信仰，將荒蕪之地轉化為充滿活力的繁榮之城。"
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { message, history = [], language = 'zh' } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) return res.status(500).json({ error: "API Key 缺失" });

  const isEn = language === 'en';

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: `CRITICAL: You MUST respond EXCLUSIVELY in ${isEn ? 'ENGLISH' : 'TRADITIONAL CHINESE (繁體中文)'}.

You are the helpful AI assistant for the Impact Asia Alliance Summit 2026.
Theme Info: ${JSON.stringify(THEMES)}
Speaker Info: ${JSON.stringify(SPEAKERS)}
Schedule & Location: ${JSON.stringify(TIMELINE)}
Location Background: ${JSON.stringify(LOCATION_INFO)}

Tone: Casual, friendly, and extremely TERSE.
Current Language Setting: ${isEn ? 'English' : 'Chinese'}

**Constraint**: If a user's question is unrelated to the Impact Asia Alliance Summit, the themes, speakers, or location, politely decline to answer and redirect them.

**Markdown Rule**: Use strict Markdown syntax. For bold text, ensure there are NO spaces between the asterisks and the content.

**Interactive Triggers**: If you mention a specific theme, you can append a trigger tag at the end of the sentence to allow the user to open the detail panel.
- Format: [TRIGGER:theme_id]
- Valid IDs: ai, leadership, stewardship
- Example: "...談談 AI 在信仰中的角色。[TRIGGER:ai]"

**Special Requirements**:
1. At the end of your response, provide 2-3 brief follow-up questions after the [SUGGESTIONS] tag.
2. Example: [SUGGESTIONS] ${isEn ? 'How to register?, Who are the speakers?' : '如何報名年會？, 講員名單有哪些？'}`
    });

    // 將歷史記錄轉換為 Gemini 格式 (限制最近 10 則以節省 Token)
    const chat = model.startChat({
      history: history.slice(-10).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
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
    // 傳回更詳細的錯誤資訊給前端處理
    if (!res.writableEnded) {
      res.status(500).end(`ERROR: ${error.message}`);
    }
  }
}
