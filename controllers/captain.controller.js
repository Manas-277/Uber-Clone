const { validationResult } = require("express-validator");
const captainModel = require("../models/captian.model");
const captainService = require("../services/captian.service");

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