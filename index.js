import { Telegraf } from "telegraf";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

bot.start((ctx) => {
  ctx.reply("Xin chào! Tôi là AI Bot 🤖");
});

bot.on("text", async (ctx) => {
  try {
    const userMessage = ctx.message.text;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const answer = completion.choices[0].message.content;

    await ctx.reply(answer);
  } catch (err) {
    console.error(err);
    await ctx.reply("Đã xảy ra lỗi.");
  }
});

bot.launch();

console.log("Bot đang chạy...");