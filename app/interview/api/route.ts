import { GoogleGenerativeAI } from "@google/generative-ai";

// TODO: optimize env values form config
const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_KEY + '');
const model = genAI.getGenerativeModel(
    {
        model: process.env.GEMINI_MODEL + '',
        generationConfig: {
            temperature: .5,
        }
    });

type Params = {
    prompt: string
}

export async function POST(request: Request) {
    console.log('api called...');
    const prompt = await request.text();
    console.log('prompt: ', prompt);
    if (!prompt) {
        return new Response('No prompt provided', { status: 400 });
    }

    const result = await model.generateContent(prompt);
    console.log('result: ', result.response.text());
    return new Response(result.response.text());
}
