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
        max_tokens: 4000,
        top_p: 1,
        frequency_penalty: 0
    });
    return res.choices[0].text;
}
