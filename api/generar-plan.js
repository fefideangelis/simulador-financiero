import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  try {
    // 🔧 Leer el body manualmente
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const data = JSON.parse(Buffer.concat(buffers).toString());
    const prompt = data.prompt;

    if (!prompt) {
      console.error("❌ Prompt no recibido");
      return res.status(400).json({ error: "Falta el prompt" });
    }

    console.log("🔍 Prompt recibido:", prompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    const respuesta = completion.choices?.[0]?.message?.content;

    if (!respuesta) {
      console.error("❌ La IA no devolvió respuesta");
      return res.status(500).json({ error: "La IA no respondió" });
    }

    console.log("✅ Respuesta generada:", respuesta);

    res.status(200).json({ resultado: respuesta });

  } catch (error) {
    console.error("🚨 Error en función IA:", error);
    res.status(500).json({ error: error.message || "Fallo la generación con OpenAI" });
  }
}
