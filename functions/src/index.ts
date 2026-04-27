import { onCall } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";

export const chatWithAI = onCall(async (request) => {
  const userMessage = request.data.message;

  if (!userMessage) {
    return { error: "Message is required" };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    logger.error("GEMINI_API_KEY is not set.");
    return { error: "Server Configuration Error" };
  }

  try {
    // Read knowledge files
    const themesContent = fs.readFileSync(path.join(__dirname, "data/themes.js"), "utf8");
    const speakersContent = fs.readFileSync(path.join(__dirname, "data/speakers.js"), "utf8");
    const timelineContent = fs.readFileSync(path.join(__dirname, "data/timeline.js"), "utf8");
    const translationsContent = fs.readFileSync(path.join(__dirname, "i18n/translations/zh.json"), "utf8");

    const systemInstruction = `你是亞洲論壇影響力中心的小助手。請根據提供的 JSON 與 JS 資料（包含議程、講員、主題等）回答關於 2026 年鳳凰城年會的問題。請使用繁體中文回答，口氣要專業且溫暖。\n\n資料內容如下：\n\n【themes.js】\n${themesContent}\n\n【speakers.js】\n${speakersContent}\n\n【timeline.js】\n${timelineContent}\n\n【zh.json】\n${translationsContent}`;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction,
    });

    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();

    return { text };
  } catch (error) {
    logger.error("Error calling Gemini API:", error);
    return { error: "Internal Server Error" };
  }
});
