const { validationResult } = require("express-validator");
const captainModel = require("../models/captian.model");
const captainService = require("../services/captian.service");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerCaption = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, email, password, vehicle } = req.body;

        // Check for missing password or vehicle fields
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }
        if (!vehicle || !vehicle.plateNumber || !vehicle.type) {
            return res.status(400).json({ message: "Vehicle plateNumber and type are required" });
        }

        const isCaptainAlreadyExists = await captainModel.findOne({ email });
        if (isCaptainAlreadyExists) {
            return res.status(400).json({ message: "Captain already Exists" });
        }
        const hashedPassword = await captainModel.hashPassword(password);
        const captain = await captainService.createCaptain({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plateNumber,
            capacity: vehicle.capacity,
            vehicleType: vehicle.type
        });

        const token = captain.generateToken();
        res.status(200).json({ message: "Captain Registered", token });
    } catch (error) {
        res.status(400).json({ message: "Registeration Failed", error: error.message });
    }
}

module.exports.loginCaptain = async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {email, password} = req.body;
        const user = await captainModel.findOne({email}).select("+password");
        if(!user){
            res.status(404).json({message: "Invalid email or Password"});
        }
    
        isPasswordCorrect = await user.comparePassword(password);
        if(!isPasswordCorrect){
            res.status(404).json({message: "Invalid email or Password"});
        }
    
        const token = user.generateToken();
        res.cookie('token', token);
        res.status(200).json({message: "Logged In!" , user: user, token: token });
    } catch (error) {
        res.status(400).json({message: "login failed!",error: error.message})
    }
}

module.exports.getCaptainProfile = async (req, res) => {
    res.status(200).json(req.user);
}

module.exports.logoutCaptain = async (req, res) => {
    try {
        res.clearCookie('token');
        const token = (req.cookies && req.cookies.token) || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
        await blacklistTokenModel.create({token});
        res.status(200).json({message: "Logged Out!"});
    } catch (error) {
        res.status(500).json({message: "Logout failed!" , error: error.message})
    }
}