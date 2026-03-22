const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const Job = require("../models/Job");

const recommendJobs = async (req, res)=>{
    try {
        const {skills} = req.body;
        console.log(req.body);
        const skillsJson = JSON.stringify(currentSkills);
        console.log(skillsJson);
        const UserSkills = JSON.parse(skillsJson);
        console.log(currentSkills);
        const prompt = `
        A user wants to become ${careerGoal}
        Their currents skills are: ${UserSkills}
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