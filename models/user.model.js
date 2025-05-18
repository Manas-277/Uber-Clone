const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength : [3, 'First Name must be atleast 3 characters long']
        },
        lastName: {
            type: String,
            minlength : [3, 'Last Name must be atleast 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "email should be atleast 5 characters long"]
    },
    password: {
        type: String,
        required: true,
        select: true
    },
    socketId: {
        type: String,
    }
},{timestamps: true});

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
};

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;