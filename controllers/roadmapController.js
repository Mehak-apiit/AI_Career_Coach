const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const axios = require("axios");
const Roadmap = require("../models/Roadmap");
const generateRoadmap = async (req, res)=>{
    try {
        const {userId,goal} = req.body;
        const prompt = `
        You are an AI career coach.
        Create a step by step roadmap to achieve this goal:
        Goal: ${goal}
        Include:
        -Skills to learn 
        -Tools/technologies
        -Projects to build
        -Timeline
        `;
        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash",
            contents: [{ parts: [{ text: prompt }] }]
        });
         const reply = response.text;
         res.json({reply});

      
        
       
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:
                "Error generating roadmap"
        });
    }
};
module.exports = generateRoadmap;
