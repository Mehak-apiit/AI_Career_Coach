const mongoose = require("mongoose");
const skillGapSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    careerGoal: {
        type:String,
        required:true
    },
    currentSkills:{
        type:[String],
        required:true
    },
    missingSkills: {
        type: [String]
    },
    recommendations: {
        type: [String]
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("SkillGap",skillGapSchema)