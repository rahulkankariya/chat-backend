
const express = require("express");
const authController = require('../../controllers/v1/authController')
const router = express();
router.post('/signup',authController.signUp)
router.post('/login',authController.login)
router.get('/getProfile',authController.getProfile)
router.post('/userList',authController.userList)
router.post('/userList',authController.chatMessageList)
router.post('/userChat',authController.chatMessageList)


router.all("*", function (req, res, next) {
    res.send("Invalid Url");
});


module.exports = router;