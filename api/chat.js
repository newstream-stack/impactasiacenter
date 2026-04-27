import { GoogleGenerativeAI } from "@google/generative-ai";

// 這裡是你的活動資料 (嵌入式，確保 Vercel 100% 讀得到)
const EVENT_DATA = {
  themes: "數位轉型與 AI 未來、國度影響力領導力、土地管理與永續發展",
  location: "美國亞利桑那州鳳凰城 (Phoenix, Arizona)",
  date: "2026 年",
  org: "亞洲論壇影響力中心 (Impact Asia Center)"
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) return res.status(500).json({ error: "API Key 缺失" });

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // 使用 gemini-1.5-flash 模型
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: `你是亞洲論壇影響力中心的小助手。
活動資訊：${JSON.stringify(EVENT_DATA)}
請使用繁體中文回答，口氣溫暖專業且精簡。`
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ text });
  } catch (error) {
    console.error("Gemini Error:", error);
    // 如果 1.5-flash 還是不行，嘗試備用模型 gemini-pro
    return res.status(500).json({ error: `AI 報錯: ${error.message}` });
  }
}
