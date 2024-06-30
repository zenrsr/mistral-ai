import MistralClient from "@mistralai/mistralai";
import dotenv from "dotenv";
dotenv.config();

import { tools, getPaymentDate, getPaymentStatus } from "./tools.js";

const availableFunction = {
  getPaymentDate,
  getPaymentStatus
};

const mistralClient = new MistralClient(process.env.MISTRAL_API_KEY);
const agent = async (query) => {
  const messages = [{ role: "user", content: query }];

  for (let i = 0; i < 5; i++) {
    const response = await mistralClient.chat({
      model: "mistral-large-latest",
      messages: messages,
      tools: tools
    });

    messages.push(response.choices[0].message);

    if (response.choices[0].finish_reason === "stop") {
      return response.choices[0].message.content;
    } else if (response.choices[0].finish_reason === "tool_calls") {
      const functionObj = response.choices[0].message.tool_calls[0].function;
      const functionName = functionObj.name;
      const functionargs = JSON.parse(functionObj.arguments);

      const functionResponse = availableFunction[functionName](functionargs);

      messages.push({
        role: "tool",
        name: functionName,
        content: functionResponse
      });
    }
  }
};

const response = await agent("when was the transaction T1001 paid?");
console.log({ response });
