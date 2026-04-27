import { onRequest, Request } from "firebase-functions/v2/https";
import { Response } from "express";
import * as logger from "firebase-functions/logger";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";

interface ChatRequestBody {
  message?: string;
  data?: {
    message?: string;
  };
}

export const chatWithAI = onRequest(
  { cors: true },
  async (req: Request, res: Response) => {
    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    try {
      const body = req.body as ChatRequestBody;
      const userMessage = body.message || body.data?.message;

      if (!userMessage) {
        res.status(400).send("Message is required");
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        logger.error("GEMINI_API_KEY is not set.");
        res.status(500).send("Server Configuration Error");
        return;
      }

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

      const result = await model.generateContentStream(userMessage);

      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Transfer-Encoding", "chunked");

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        if (chunkText) {
          res.write(chunkText);
        }
      }
      res.end();
    } catch (error) {
      logger.error("Error calling Gemini API:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);
