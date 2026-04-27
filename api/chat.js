import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) return res.status(500).json({ error: "API Key 缺失" });

  try {
    // 這裡我們暫時不用讀取外部檔案，先用最簡單的方式測試 AI 是否能通
    const systemInstruction = "你是亞洲論壇影響力中心的小助手。請用繁體中文回答問題。";

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction,
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ text });
  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(500).json({ error: `AI 報錯: ${error.message}` });
  }
}
