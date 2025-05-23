const express = require('express')
const router = express.Router();
const {body} = require("express-validator")
const userController = require('../controllers/user.controller')
const authMiddleWare = require('../middlewares/auth.middleware')

router.post('/register', 
    [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min: 3}).withMessage('first name must be atleast 3 character long'),
    body('password').isLength({min: 6}).withMessage('password should be atleast 6 character long')
    ],
    userController.registerUser
)

router.post('/login',
    [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('password should be atleast 6 character long')
    ],
    userController.loginUser
)

router.get('/profile', authMiddleWare.authUser, userController.getUserProfile);
router.get('/logout', authMiddleWare.authUser, userController.logoutUser);



module.exports = router;