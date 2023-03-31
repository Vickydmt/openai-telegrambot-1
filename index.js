require("dotenv").config();
const { Telegraf } = require("telegraf");
const sendRequestToOpenAI = require("./sendRequestToOpenAi");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
    "Welcome to the Tsi Telegram Bot\n\nAsk me a Question and I will reply to you with a Message"
  );
});

bot.on("text", async (ctx) => {
  const message = ctx.message.text;
  try {
    const response = await sendRequestToOpenAI(message);
    const data = response.data;
    const text = data.choices[0].text.trim();
    ctx.reply(text);
  } catch (err) {
    console.log(err.message);
    ctx.reply("Something went wrong");
  }
});

bot.launch();
console.log("Bot started");
