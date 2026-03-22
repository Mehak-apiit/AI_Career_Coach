const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const SkillGap = require("../models/SkillGap");

const analyzeSkillGap = async (req, res)=>{
    try {
        const {careerGoal,currentSkills} = req.body;
        const prompt = `
        A user wants to become ${careerGoal}
        Their currents skills are: ${currentSkills.json(",")}
        Identify:
        1.Missing Skills
        2. Learning recommendations
        Return response in JSON
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
                "Skill gap analysis failed"
        });
    }
};
module.exports = analyzeSkillGap;