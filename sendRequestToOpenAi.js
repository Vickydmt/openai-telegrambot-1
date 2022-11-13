const { Configuration, OpenAIApi } = require("openai");

const sendRequestToOpenAI = async (text) => {
  const configuration = new Configuration({
    // your API Key
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createCompletion({
      model: process.env.OPENAI_MODEL
        ? process.env.OPENAI_MODEL
        : "text-davinci-002",
      prompt: text,
      temperature: process.env.OPENAI_TEMPERATURE
        ? process.env.OPENAI_TEMPERATURE
        : 0.9,
      max_tokens: process.env.OPENAI_MAX_TOKENS
        ? process.env.OPENAI_MAX_TOKENS
        : 256,
      top_p: process.env.OPENAI_TOP_P ? process.env.OPENAI_TOP_P : 1,
      frequency_penalty: process.env.OPENAI_FREQUENCY_PENALTY
        ? process.env.OPENAI_FREQUENCY_PENALTY
        : 0,
      presence_penalty: process.env.OPENAI_PRESENCE_PENALTY
        ? process.env.OPENAI_PRESENCE_PENALTY
        : 0,
    });

    return response;
  } catch (err) {
    if (err.response.status === 401) {
      console.log("Invalid API Key");
    }
    throw new Error(err);
  }
};
module.exports = sendRequestToOpenAI;
