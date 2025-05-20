import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Falta el prompt" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    const resultado = completion.choices?.[0]?.message?.content;

    if (!resultado) {
      return res.status(500).json({ error: "La IA no respondió" });
    }

    res.status(200).json({ resultado });
  } catch (error) {
    console.error("Error en OpenAI:", error);
    res.status(500).json({ error: "Fallo la generación con OpenAI" });
  }
}
