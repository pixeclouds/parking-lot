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
    firstname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    status: {
        type: String,
        default: "inactive"
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