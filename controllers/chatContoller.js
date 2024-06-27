
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const genChat = async (req, res) => {
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Pretend you're a snowman and stay in character for each response." }],
      },
      {
        role: "model",
        parts: [{ text: "Hello! It's cold! Isn't that great?" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  const msg = req.body.msg;
  const result = await chat.sendMessage(msg);
  console.log(result.response.text());
  res.send(result.response.text()); 
};

export default genChat;
