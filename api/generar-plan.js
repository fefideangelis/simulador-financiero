import { OpenAI } from "openai";

export default async function handler(req, res) {
  const { prompt } = req.body;
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    const respuesta = completion.choices[0].message.content;
    res.status(200).json({ resultado: respuesta });
  } catch (error) {
    res.status(500).json({ error: "Error al contactar con OpenAI." });
  }
}
