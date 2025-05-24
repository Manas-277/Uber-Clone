const express = require('express')
const router = express.Router();
const {body} = require("express-validator")
const captainController = require('../controllers/captain.controller');
const authMiddleWare = require('../middlewares/auth.middleware');

router.post('/register', 
    [
        body('email')
            .isEmail().withMessage('Invalid Email'),
        body('fullName.firstName')
            .isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
        body('fullName.lastName')
            .isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
        body('password')
            .isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),
        body('vehicle.color')
            .notEmpty().withMessage('Vehicle color is required'),
        body('vehicle.plateNumber')
            .notEmpty().withMessage('Vehicle plate number is required'),
        body('vehicle.capacity')
            .isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
        body('vehicle.type')
            .notEmpty().withMessage('Vehicle type is required')
    ],
    captainController.registerCaption
)

router.post('/login', 
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({min: 6}).withMessage('password should be atleast 6 character long')
    ],
    captainController.loginCaptain
)

router.get('/profile', authMiddleWare.authCaptain, captainController.getCaptainProfile);
router.get('/logout', authMiddleWare.authCaptain, captainController.logoutCaptain);

module.exports = router;