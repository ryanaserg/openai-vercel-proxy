import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { model, messages, temperature, max_tokens } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Missing OpenAI API key" });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens,
    });

    if (response?.choices && response.choices.length > 0) {
      res.status(200).json(response.choices[0].message);
    } else {
      res.status(500).json({ error: "Empty response from OpenAI" });
    }
  } catch (error) {
    console.error("OpenAI API Error:", error?.response?.data || error.message);

    if (error.response?.data) {
      res.status(error.response.status || 500).json({
        error: error.response.data,
      });
    } else {
      res.status(500).json({
        error: { message: error.message || "Unknown error occurred" },
      });
    }
  }
}
