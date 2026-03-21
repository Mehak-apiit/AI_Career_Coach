const mongoose = require("mongoose");
const roadmapSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    goal: {
        type: String,
        required: true,
    },
    roadmap: {
        type: String,
    },

},{timestamps: true});
module.exports = mongoose.model("Roadmap",roadmapSchema);