const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
    skills: {
        type: [String],
        required: true
    },
    recommendation: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});
module.exports = mongoose.model("Job",jobSchema);