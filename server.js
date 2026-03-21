const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// Import routes
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoute');
const aiRoutes = require("./routes/aiRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/ai', testRoutes);
app.use('/api/ai',aiRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/roadmap",roadmapRoutes);

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Connected to MongoDB"))
.catch((err)=> console.error("Error connecting to MongoDB:", err));

//Test route
app.get("/",(req,res)=>{
    res.send("Server is running");
});
//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});