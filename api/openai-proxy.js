// api/openai‑proxy.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  try {
    const completion = await openai.chat.completions.create(req.body);
    res.status(200).json(completion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
