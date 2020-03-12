const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    `${process.env.CLIENT_ID}`,
    `${process.env.CLIENT_SECRET}`,
    "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
    refresh_token: `${process.env.REFRESH_TOKEN}`
});
const accessToken = oauth2Client.getAccessToken()

const sendEmail = async (req, res, next) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            type: 'OAuth2',
            user: `${process.env.EMAIL_ADDRESS}`,
            accessToken: accessToken,
            clientId: `${process.env.CLIENT_ID}`,
            clientSecret: `${process.env.CLIENT_SECRET}`,
            refreshToken: `${process.env.REFRESH_TOKEN}`
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const mailOptions = {
        from: `${process.env.EMAIL_ADDRESS} <${process.env.EMAIL_ADDRESS}>`,
        subject: `Feedback regarding the program`,
        to: `${process.env.EMAIL_ADDRESS}`,
        text: `${req.body.comments}` + `\nSent By:${req.body.email}`
    }

    await transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log('Email Sent Successfully!!!')
        }
    });
};
module.exports = sendEmail;