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

  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) return res.status(500).json({ error: "API Key 缺失" });

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      systemInstruction: `你是亞洲論壇影響力中心的小助手。請根據以下資料回答問題：
主題資料：${JSON.stringify(THEMES)}
講員資料：${JSON.stringify(SPEAKERS)}
議程與地點：${JSON.stringify(TIMELINE)}
地點背景：${JSON.stringify(LOCATION_INFO)}

請使用繁體中文回答，口氣溫暖專業且精簡。
**特別要求**：
1. 請在回答結束時，根據對話內容提供 2-3 個相關的簡短後續問題，放在 [SUGGESTIONS] 標記之後。
2. 格式範例：這裡的回答內容... [SUGGESTIONS] 如何報名鳳凰城年會？, 亞利桑那州的天氣如何？, 還有其他講員嗎？`
    });

    const result = await model.generateContentStream(message);
    
    // 設定串流回應標頭
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
      res.status(500).json({ error: `AI 暫時無法回應: ${error.message}` });
    }
  }
}
