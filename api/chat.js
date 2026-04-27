import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API Key 缺失" });

  try {
    // 透過 API 查詢目前 Key 支援的所有模型名稱
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    
    if (data.error) {
      return res.status(500).json({ error: `API 錯誤: ${data.error.message}` });
    }

    const modelNames = data.models ? data.models.map(m => m.name.replace('models/', '')).join(', ') : "無可用模型";
    
    return res.status(200).json({ text: `你的 Key 目前支援以下模型，請從中選擇一個（或告訴我清單）：\n\n${modelNames}` });
  } catch (error) {
    console.error("List Models Error:", error);
    return res.status(500).json({ error: `連線失敗: ${error.message}` });
  }
}
