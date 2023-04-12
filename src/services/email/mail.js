const nodemailer = require("nodemailer")
const { getMailTemplate } = require("./template");


async function sendEmail(firstname, userEmail, verificationLink) {
  try {
    // smtp configuration
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN
        }
    });

    let mailContent = getMailTemplate(firstname, verificationLink)
    const sent = await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to:  userEmail,
        subject: 'Email Confirmation',
        html: mailContent
    });

    return true;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}

async function verifyEmail(firstname, userEmail, verificationLink) {
  const sent = await sendEmail(firstname, userEmail, verificationLink);
  return sent;
}


module.exports = { verifyEmail}

