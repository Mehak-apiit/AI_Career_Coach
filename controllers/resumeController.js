const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const fs = require("fs");
const pdfParse = require("pdf-parse");
const axios = require("axios");
const Resume = require("../models/Resume");
const analyeResume = async (req, res)=>{
    try {
        const {userId} = req.body;
        // check file
        if(!req.file){
            return res.status(400).json({message: "No file uploaded"});
        }
        const filePath = req.file.path;
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);
        const resumeText = pdfData.text;
        const prompt = `
        You are an AI career coach.
        Analyze this resume and give :
        1. Strengths
        2. Weaknesses
        3.Suggestions to improve
        4.Skills missing
        
        Resume: 
        ${resumeText}
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
                "Error analyzing resume"
        });
    }
};
module.exports = analyeResume;