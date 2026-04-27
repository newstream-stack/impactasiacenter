import { GoogleGenerativeAI } from "@google/generative-ai";
import { themes } from "../src/data/themes.js";
import { speakers } from "../src/data/speakers.js";
import { timelineData } from "../src/data/timeline.js";
import zhTranslations from "../src/i18n/translations/zh.json" assert { type: "json" };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) return res.status(500).json({ error: "API Key 缺失，請檢查 Vercel 設定。" });

  try {
    const systemInstruction = `你是亞洲論壇影響力中心的小助手。請根據提供的資料回答問題。
【資料】: ${JSON.stringify({ themes, speakers, timelineData, zhTranslations })}
請使用繁體中文，溫暖專業且精簡。`;

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
    // 把錯誤訊息直接丟回前端，方便我們除錯
    console.error("Gemini Error:", error);
    return res.status(500).json({ error: `AI 報錯: ${error.message}` });
  }
}
