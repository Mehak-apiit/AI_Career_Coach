const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
async function AItest(req, res) {
    try{
        const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",
        contents: "AI is very helpful for developers.",
    });
    console.log(response.text);

    }
    catch(error){
        console.error("Error in AItest:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports =  AItest;