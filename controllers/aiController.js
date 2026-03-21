const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const axios = require("axios");
const Chat = require("../models/Chat");
const User = require('../models/User');
const chatWithAI = async (req, res) => {
    try {
        const { message, userId } = req.body;
        const user = await User.findById(userId);
        // Get last 5 chats
        const chats = await Chat.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5);
        let history = "";
        chats.reverse().forEach(chat => {
            history += `User: ${chat.message}\nAI: ${chat.reply}\n`;
        });
        const prompt = `You are an AI career coach
        User Info:
        -Skills: ${user.skills}
        -Goal: ${user.goal}
        Chat History:
        ${history}
        User: ${message}
        AI:
        `;
        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash",
            contents: [{ parts: [{ text: prompt }] }]
        });
        const reply = response.text;
        // const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:
        //     generateContent?key=${process.env.GEMINI_API_KEY}`,
        //     {
        //         contents: [{parts: [{text: prompt}] }]
        //     }
        // );
        // const reply = 
        // response.data.candidates[0].content.parts[0].text.text;
        // // save chat
        await Chat.create({userId, message, reply});
        res.json({reply});
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to chat with AI" });
    }
};
module.exports = chatWithAI;