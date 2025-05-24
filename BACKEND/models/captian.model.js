const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const {Schema} = mongoose;

const captainSchema = new Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, "first name must be atleast 3 characters long"]
        },
        lastName: {
            type: String,
            required: true,
            minlength: [3, "last name must be atleast 3 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "colour name must be atleast 3 characters long"]
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "plate number must be atleast 3 characters long"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Atleast capacity of 1 should be there"]
        },
        vehicleType: {
            type: String,
            enum: ['auto', 'moto', 'car'],
            required: true
        }
    },
    location:{
        lat: {
            type: Number,
        },
        lng:{
            type: String,
        }
    }
}, { timestamps: true });

captainSchema.methods.generateToken = function(){
    return jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'})
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}






module.exports = mongoose.model("Captain", captainSchema);