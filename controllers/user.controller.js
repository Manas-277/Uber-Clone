const userModel  = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model.js');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { fullName, email, password } = req.body;
        const isUserAlreadyExists = userModel.findOne({email});
        if(!isUserAlreadyExists){
            res.status(400).json({message: "User already Exists"});
        }
        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstName: fullName.firstName,
            lastName : fullName.lastName,
            email,
            password: hashedPassword
        });

        const token = user.generateAuthToken();

        res.status(201).json({ token, user });
    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            return res.status(409).json({ message: "Email already exists" });
        }
        next(err);
    }
};

module.exports.loginUser = async(req, res, next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const isMatched = await user.comparePassword(password);
    if(!isMatched){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(201).json({ token, user });

}

module.exports.getUserProfile = async(req, res, next) => {
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next)=>{
    res.clearCookie('token');
    const token = (req.cookies && req.cookies.token) || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    await blacklistTokenModel.create({token});


    res.status(200).json({message: "Logged Out!"})

}