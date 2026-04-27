import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  projectId: "impact-asia-ai",
  // 其他欄位在 Callable 模式下非必填，但如果有 API Key 會更好
  // 如果是 Vercel 部署，Firebase SDK 通常能透過 projectId 運作
};

const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app);
