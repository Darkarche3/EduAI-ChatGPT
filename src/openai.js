import OpenAI from 'openai';
const openai = new OpenAI({
    apiKey: "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", dangerouslyAllowBrowser: true
  });
//const { Configuration, OpenAIApi } = require('openai');
//const configuration= new Configuration({ apiKey: "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"});
//const openai = new OpenAIApi(configuration);

export async function sendMsgToOpenAI(message) {
    const res =  await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: message,
        temperature: 0.2,
        max_tokens: 4000,
        top_p: 1,
        frequency_penalty: 0
    });
    return res.choices[0].text;
}
