import dotenv from "dotenv";
dotenv.config();

import { ChatMistralAI } from "@langchain/mistralai";
import { createAgent } from "langchain";
import { HumanMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import * as z from "zod";
import readline from "readline/promises";
import chalk from "chalk";

import { sendEmail } from "./mail.service.js";

const emailTool = tool(sendEmail, {
  name: "emailTool",
  description: "Send an email using the provided details.",
  schema: z.object({
    to: z.string().describe("Recipient email address"),
    subject: z.string().describe("Subject of the email"),
    html: z.string().describe("HTML content of the email"),
    text: z.string().optional().describe("Plain text content"),
  }),
});

const model = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-small-latest",
});

const agent = createAgent({
  model,
  tools: [emailTool],
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messages = [];

console.clear();

console.log(chalk.cyan.bold("=========================================="));
console.log(chalk.green.bold("🤖 Mistral AI Chat"));
console.log(chalk.yellow("Type 'bye' to exit."));
console.log(chalk.cyan.bold("==========================================\n"));

while (true) {
  const userInput = await rl.question(chalk.green.bold("🧑 You ➜ "));

  if (userInput.toLowerCase() === "bye") {
    console.log(chalk.blue.bold("👋 Goodbye!"));
    break;
  }

  messages.push(new HumanMessage(userInput));

  try {
    const response = await agent.invoke({
      messages,
    });

    const aiMessage = response.messages.at(-1);

    messages.push(aiMessage);

    console.log(chalk.blue.bold("🤖 AI ➜"), aiMessage.content);
  } catch (err) {
    console.error(chalk.red("❌ Error:"), err);
  }
}

rl.close();
