const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const Interview = require("../models/Interview");

const generateInterviewQuestions = async (req, res)=>{
    try {
        const {role} = req.body;
        const prompt = `
        Generate 10 technical interview questions for the role: ${role}.
        Include beginner to advanced questions
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
                "Interview generations failed"
        });
    }
};
module.exports = generateInterviewQuestions;