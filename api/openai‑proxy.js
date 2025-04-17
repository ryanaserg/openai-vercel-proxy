// файл: /api/openai‑proxy.js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  // принимаем только POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // перенаправляем запрос к OpenAI
    const response = await openai.createChatCompletion(req.body);
    // возвращаем результат
    return res.status(200).json(response.data);
  } catch (err) {
    // если что‑то пошло не так
    return res.status(500).json({ error: err.message });
  }
}
