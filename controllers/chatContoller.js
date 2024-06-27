import express from "express";
import { method } from '../utils/variables/index';
import { ChatGroq } from "@langchain/groq";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const chatRouter = express.Router();
const parser = new StringOutputParser();

const model = new ChatGroq({
    model: "mixtral-8x7b-32768",
    temperature: 0
});
// const chat = async (req, res) => {
//     try {

//         const messages = [
//             new SystemMessage("You are  consulting chat bot people dont know what system they wont and you consult about what system they need and recommend a system, and if they ask you out of te consulting scope repay i dont assist with this"),
//             new HumanMessage("what is gravity in physics")
//         ];
//         const message = await model.invoke(messages);
//         const response = await parser.invoke(message)
//         res.send( response ); 
//     } catch (error) {
//         console.error("Error invoking ChatGroq:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });
const Chat = async (req,res) =>{
try{
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "Your role as a consulting chatbot is to assist users in identifying and recommending appropriate systems based on their organizational needs. Engage users in a conversation to gather specific information about their industry, current challenges, and existing technologies. Recommend suitable systems or types of systems that align with their requirements, providing reasoning behind each recommendation. If users inquire about topics beyond system recommendations, such as personal matters or unrelated technologies, politely inform them that the consultation is focused on system selection and implementation guidance. State, 'I can't assist you with this topic.' Your goal is to provide insightful advice tailored to their business context, ensuring they receive valuable recommendations to enhance operational efficiency and effectiveness."],
    ["human", "{input}"],
  ]);
  const chain = prompt.pipe(model);
  const message = await chain.invoke({
    input: req.body.message,
  });
  const response = await parser.invoke(message)
  console.log("response", response);
  res.send( response ); 

} catch (error) {
    console.error("Error invoking ChatGroq:", error);
    res.status(500).json({ error: "Internal Server Error" });
}
}



// function getCurrentWeather(location, _unit) {
//     if (location.toLowerCase().includes("tokyo")) {
//       return JSON.stringify({ location, temperature: "10", unit: "celsius" });
      
//     } else if (location.toLowerCase().includes("san francisco")) {
//       return JSON.stringify({
//         location,
//         temperature: "72",
//         unit: "fahrenheit",
//       });
//     } else {
//       return JSON.stringify({ location, temperature: "22", unit: "celsius" });
//     }
//   }

// chatRouter[method.post]('/lang3', async (req, res) => {
//     try {
//         const location = req.body.location; 


//         const messages = [
//             ["human", `What's the weather like in ${location}?`],
//         ];
//         const response = await model.invoke(messages);

//         const toolCalls = response.additional_kwargs.tool_calls;
//         if (toolCalls.length > 0 && toolCalls[0].function.name === "get_current_weather") {
//             const argumentsObj = JSON.parse(toolCalls[0].function.arguments);
//             const weatherInfo = getCurrentWeather(argumentsObj.location);
//             res.json({ weather: JSON.parse(weatherInfo) });
//         } else {
//             res.status(500).json({ error: "Weather information not retrieved." });
//         }
//     } catch (error) {
//         console.error("Error invoking ChatGroq for weather:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

export default Chat;
