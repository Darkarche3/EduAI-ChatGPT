import OpenAI from 'openai';
const openai = new OpenAI({
    apiKey: "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", dangerouslyAllowBrowser: true
  });
//const { Configuration, OpenAIApi } = require('openai');
//const configuration= new Configuration({ apiKey: "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"});
//const openai = new OpenAIApi(configuration);

export async function sendMsgToOpenAI(message) {
    const res =  await openai.completions.create({
        model: 'text-davinci-003',
        prompt: message,
        temperature: 0.7,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0
    });
    return res.choices[0].text;
}
