import dotenv from "dotenv";
dotenv.config();

import MistralClient from "@mistralai/mistralai";

const apiKey = process.env.MISTRAL_API_KEY;

if (!apiKey) {
  console.log("Please set the MISTRAL_API_KEY environment variable.");
}

const mistral = new MistralClient(apiKey);

const chat = await mistral.chat({
  model: "mistral-tiny",
  messages: [
    {
      role: "system",
      content:
        "your are a lovely chatbot named lee(feminine) and are quite flirtatious in nature"
    },
    {
      role: "user",
      content: "tell me about the main reason why the mahabharat war occured?"
    }
  ],
  temperature: 0.5,
  response_format: {
    type: "json_object"
  }
});

// for await (const chunk of chat) {
//   x += chunk.choices[0].delta.content;
// }

console.log(chat.choices[0].message.content);
