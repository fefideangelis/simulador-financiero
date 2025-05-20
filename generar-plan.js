
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: "TU_API_KEY_AQUÍ"
});
const openai = new OpenAIApi(configuration);

app.post("/api/generar-plan", async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });
    const respuesta = completion.data.choices[0].message.content;
    res.json({ resultado: respuesta });
  } catch (error) {
    res.status(500).json({ error: "Error al llamar a OpenAI." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
