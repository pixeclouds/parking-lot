const { getUser, createNewUser, checkIfUserExists, activateAccount } = require("./repository.js")
const { generateToken, generateVerificationLink, verifyToken } = require("../../utils/token")
const { validateInput } = require("../../utils/validator")
const { userValidatorSchema } = require("./schema")
const { hashPassword, comparePasswords } = require("../../utils/hasher")
const { sendVerificationMail } = require("../../services/email/index.js")

exports.signin = async (req, res ) => {
    let { email, password } = req.body

    try {
        //validate inputs
        let isValid = await validateInput(userValidatorSchema, { email, password})
        if (!isValid){
            throw Error
        }
        user = await getUser(email)
        if (!user){
            throw new Error("Account not found. Sign up instead")
        }
        // check if account is activated
        if (user.status == "inactive"){
            throw new Error("Account not activated. Verify your email to active your account")
        }
        let password2 = user.password
        //check for duplicate
        if(!user || !(await comparePasswords(password, password2))){
            throw new Error("Invalid username or password")
        }
        //filter result
        user = { _id: user._id, }
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
    let { firstname, email, password } = req.body

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
        user = await createNewUser(firstname, email, password)
        //generate verification link
        userToken = { user: user._id}
        let link = await generateVerificationLink(userToken)
        // send confirmation mail
        let emailSent = await sendVerificationMail(user.firstname, user.email, link)
        if (emailSent == true) {
            res.status(200).json({ 
                "Message": "Verification mail sent"
            })
        }
    } catch (err) {
        res.status(400).json({
            "Error": err.message
        })
    }
}

exports.verifyAccount = async (req, res) => {
    try {
        let { link } = req.params
        let user = await verifyToken(link)
        await activateAccount(user.user)
        res.json({
            "Message": "Email verifed. Proceed to login"
        })
    } catch (err) {
        res.status(400).json({
            "Error": err.message
        })
        
    }
}



