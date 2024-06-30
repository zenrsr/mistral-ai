import ollama from "ollama";
import express from "express";

const app = express();
const port = 3000;

express.json();

app.get("/", async (req, res) => {
  const querstion = req.query.question;
  if (!question) {
    res.status(200).send("Ask something via `?question` paramater");
  } else {
    const respsonse = await ollama.chat({
      model: "mistral",
      messages: [{ role: "user", content: question }]
    });
    res.status(200).send(respsonse.messages.content);
  }
});

app.listen(port, () => {
  console.log(`Ollama is listening on port ${port}!`);
});
