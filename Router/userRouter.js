const express = require('express');
const router = express.Router();
const {registerUser,loginUser,userPreferences,updateUserPreferences,getNews} = require('../Controllers/userController');
const verifyUser = require('../Middleware/verifyUser');

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/preferences', verifyUser,userPreferences);
router.put('/preferences', verifyUser, updateUserPreferences);
router.get('/news',verifyUser,getNews);

module.exports = router;
