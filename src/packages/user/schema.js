const mongoose = require("mongoose")
const { v4 } = require("uuid")
const Joi = require("joi")

//database schema
const Schema = mongoose.Schema
const userShema = new Schema({
    _id: {
        type: String,
        default: v4()
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const User = mongoose.model('user', userShema)


// joi validator schema
const userValidatorSchema = Joi.object({
    email: Joi.string()
                .min(5)
                .required()
                .email(),

    password: Joi.string()
                .alphanum()
                .min(8)
                .required()
})

module.exports = { User, userValidatorSchema }
// module.exports = User