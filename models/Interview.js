const mongoose = require("mongoose");
const interviewSchema = new mongoose.Schema({
    role:{
        type: String,
        required: true
    },
    questions: {
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("Inteview",interviewSchema);