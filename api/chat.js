import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  // Vercel Serverless Functions use this handler format for Node.js
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set in environment variables.");
    return res.status(500).json({ error: "Server Configuration Error" });
  }

  try {
    // Read knowledge files for context
    const dataDir = path.join(process.cwd(), "src", "data");
    const i18nDir = path.join(process.cwd(), "src", "i18n", "translations");

    const themesContent = fs.readFileSync(path.join(dataDir, "themes.js"), "utf8");
    const speakersContent = fs.readFileSync(path.join(dataDir, "speakers.js"), "utf8");
    const timelineContent = fs.readFileSync(path.join(dataDir, "timeline.js"), "utf8");
    const translationsContent = fs.readFileSync(path.join(i18nDir, "zh.json"), "utf8");

    const systemInstruction = `你是亞洲論壇影響力中心的小助手。請根據提供的 JSON 與 JS 資料（包含議程、講員、主題等）回答關於 2026 年鳳凰城年會的問題。請使用繁體中文回答，口氣要專業且溫暖。\n\n資料內容如下：\n\n【themes.js】\n${themesContent}\n\n【speakers.js】\n${speakersContent}\n\n【timeline.js】\n${timelineContent}\n\n【zh.json】\n${translationsContent}`;

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
    console.error("Error calling Gemini API:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
