import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import dotenv from "dotenv";
import readline from "readline/promises";
import chalk from "chalk";

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-small-latest",
});

const messages = [];

console.clear();

console.log(chalk.cyan.bold("=========================================="));
console.log(chalk.green.bold("🤖 Mistral AI Chat"));
console.log(chalk.yellow("Type 'bye' to exit."));
console.log(chalk.cyan.bold("==========================================\n"));

while (true) {
  const userInput = await rl.question(chalk.green.bold("🧑 You  ➜ "));

  if (userInput.trim().toLowerCase() === "bye") {
    console.log("\n" + chalk.red.bold("🤖 AI   ➜ Goodbye! 👋\n"));
    break;
  }

  messages.push(new HumanMessage(userInput));

  try {
    const response = await model.invoke(messages);

    console.log();
    console.log(chalk.hex("#A020F0").bold("🤖 AI   ➜"));
    console.log(chalk.white(response.content));
    console.log(chalk.gray("────────────────────────────────────────────"));
    console.log();

    messages.push(new AIMessage(response.content));
  } catch (error) {
    console.log();
    console.log(chalk.red("❌ Error"));
    console.log(chalk.red(error.message));
    console.log(chalk.gray("────────────────────────────────────────────"));
    console.log();
  }
}

rl.close();
