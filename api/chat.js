import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) return res.status(500).json({ error: "API Key 缺失" });

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // 強制指定 API 版本為 v1，這通常能解決 1.5-flash 的 404 問題
    const model = genAI.getGenerativeModel(
      { model: "gemini-1.5-flash" },
      { apiVersion: "v1" }
    );

    const result = await model.generateContent(message || "你好");
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ text });
  } catch (error) {
    console.error("Gemini Flash Error:", error);
    return res.status(500).json({ error: `Flash 報錯: ${error.message}` });
  }
}
