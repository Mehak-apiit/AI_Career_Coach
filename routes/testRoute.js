const express = require('express');
const router = express.Router();
//const {registerUser,loginUser} =require('../controllers/authController');
const AItest = require('../controllers/testController');

router.get('/test', AItest);


module.exports = router;