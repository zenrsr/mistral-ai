import dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { readFile } from "fs/promises";
import MistralClient from "@mistralai/mistralai";

const mistralClient = new MistralClient(process.env.MISTRAL_API_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const splitDoc = async (path) => {
  const text = await readFile(path, "utf-8");
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 250,
    chunkOverlap: 40
  });
  const result = await splitter.createDocuments([text]);
  const x = result.map((chunk) => chunk.pageContent);
  return x;
};

// const createEmbeddings = async (dataChunks) => {
//   const response = await mistralClient.embeddings({
//     model: "mistral-embed",
//     input: dataChunks
//   });

//   const data = dataChunks.map((chunk, idx) => {
//     return {
//       content: chunk,
//       embedding: response.data[idx].embedding
//     };
//   });

//   return data;
// };

const createEmbeddings = async (input) => {
  const response = await mistralClient.embeddings({
    model: "mistral-embed",
    input: [input]
  });

  return response.data[0].embedding;
};

const retrieveMatches = async (embedding) => {
  let { data, error } = await supabase.rpc("match_data_docs", {
    query_embedding: embedding,
    match_threshold: 0.78,
    match_count: 5
  });
  if (error) console.error(error);
  //   else return data;
  else return data.map((chunk) => chunk.content).join(" ");
};

const generateChatResponse = async (context, query) => {
  // Implement the chat response generation logic
  const result = await mistralClient.chat({
    model: "mistral-large-latest",
    messages: [
      {
        role: "user",
        content: `Data docs context: ${context} - Question ${query}`
      }
    ]
  });

  return result.choices[0].message.content;
};

const input =
  "what did diffie-helman cntribute and create interms of exchange algorithm?";

// const textChunks = await splitDoc("data.txt");
const embeddings = await createEmbeddings(input);

const context = await retrieveMatches(embeddings);

console.log({ context });

const response = await generateChatResponse(context, input);
console.log({ response });
