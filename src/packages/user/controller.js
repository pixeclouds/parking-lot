const { getUser, createNewUser, checkIfUserExists } = require("./repository.js")
const { generateToken } = require("../../utils/token")
const { validateInput } = require("../../utils/validator")
const { userValidatorSchema } = require("./schema")
const { hashPassword, comparePasswords } = require("../../utils/hasher")
exports.login = async (req, res ) => {
    let { email, password } = req.body

    try {
        //validate inputs
        let isValid = await validateInput(userValidatorSchema, { email, password})
        if (!isValid){
            throw Error
        }
        user = await getUser(email)
        let password2 = user.password

        //check for duplicate
        if(!user || !(await comparePasswords(password, password2))){
            throw new Error("Invalid username or password")
        }

        //filter result
        user = {
            _id: user._id,
        }

        //generate token
        let token = await generateToken(user)

        res.status(200).json({
            token
        })
    } catch (err) {
        res.status(400).json({
            "Error": err.message
        })
    }
}

exports.signup = async (req, res) => {
    let { email, password } = req.body

    try {
        //validate input
        let isValid = await validateInput(userValidatorSchema, { email, password})
        if (!isValid){
            throw Error
        }

        //check for duplicates
        let user = await checkIfUserExists(email)
        if (user){
            throw Error('User already exists')
        }

        //hash password
        password = await hashPassword(password)
        //create new user
        user = await createNewUser(email, password)

        //generate token
        let token = await generateToken(user)

        res.status(200).json({ 
            token
        })
        
    } catch (err) {
        res.status(400).json({
            "Error": err.message
        })
    }
}





