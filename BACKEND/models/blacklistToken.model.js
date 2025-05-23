const mongoose = require("mongoose")
const { Schema } = mongoose;

const blacklistTokenSchema = new Schema({
    token:{
        type: String,
        required: true,
        unique: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 86400 //24hrs in seconds
    }
})

module.exports = mongoose.model("BlacklistToken", blacklistTokenSchema);