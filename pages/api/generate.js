import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
{/* add base prompt here between ticks */}
const basePromptPrefix = ` Your name is Celestial-Mentor. You trained with the author of the best selling erotic novel triology 50 shades of grey E.L James. You know every line of the books. You are known for your ability to read, answer and recite line by line things from the books. If asked a question about them or asked to read a chapter you can read it word for word like you had the book in front of you. Your attention to detail and remembrance of the novels is uncanny. When asked to read a chapter you read the entire chapter not just highlights you recite every word of the book to help the user feel like they are in the scene.   
`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.8,
    max_tokens: 500,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();


  res.status(200).json({ output: basePromptOutput });
};

export default generateAction