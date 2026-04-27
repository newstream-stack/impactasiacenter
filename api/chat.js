import { GoogleGenerativeAI } from "@google/generative-ai";
// 直接 import 資料，確保 Vercel 打包時會包含進去
import { themes } from "../src/data/themes.js";
import { speakers } from "../src/data/speakers.js";
import { timelineData } from "../src/data/timeline.js";
import zhTranslations from "../src/i18n/translations/zh.json" with { type: "json" };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing");
    return res.status(500).json({ error: "Server Configuration Error: API Key missing" });
  }

  try {
    // 將資料轉為字串作為 Context
    const themesContent = JSON.stringify(themes);
    const speakersContent = JSON.stringify(speakers);
    const timelineContent = JSON.stringify(timelineData);
    const translationsContent = JSON.stringify(zhTranslations);

    const systemInstruction = `你是亞洲論壇影響力中心的小助手。請根據提供的資料回答關於 2026 年鳳凰城年會的問題。
資料內容如下：
【主題】: ${themesContent}
【講員】: ${speakersContent}
【歷屆與今年議程】: ${timelineContent}
【常用翻譯】: ${translationsContent}

請使用繁體中文回答，口氣要專業且溫暖。回答要精簡，不要太冗長。`;

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
    console.error("Gemini API Error details:", error);
    return res.status(500).json({ error: "AI 暫時無法回應，請稍後再試。" });
  }
}
