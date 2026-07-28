import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.1-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

export const testAi = async () => {
  try {
    const response = await model.invoke("what is the capital of india?");

    console.log(response.content);
  } catch (error) {
    console.log(error.message);
  }
};
