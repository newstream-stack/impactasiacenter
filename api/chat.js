import { GoogleGenerativeAI } from "@google/generative-ai";

// 直接嵌入資料，徹底解決 Vercel 讀取路徑與匯入語法問題
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

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) return res.status(500).json({ error: "API Key 缺失" });

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      systemInstruction: `你是亞洲論壇影響力中心的小助手。請根據以下資料回答問題。
主題：${JSON.stringify(THEMES)}
講員：${JSON.stringify(SPEAKERS)}
議程：${JSON.stringify(TIMELINE)}
請使用繁體中文回答，口氣溫暖專業且精簡。`
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    return res.status(200).json({ text: response.text() });
  } catch (error) {
    return res.status(500).json({ error: `AI 暫時無法回應: ${error.message}` });
  }
}
