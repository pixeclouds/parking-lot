const { verifyEmail } = require("./mail")

exports.sendVerificationMail = async (firstname, userEmail, verificationLink) => {
    let status = await verifyEmail(firstname, userEmail, verificationLink)
    return status
  
}