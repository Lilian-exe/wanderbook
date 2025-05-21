const nodemailer = require("nodemailer");

// Configure the transporter (update with your email provider's credentials)
const transporter = nodemailer.createTransport({
    service: "gmail", // For example, "gmail" or "outlook"
    auth: {
        user: "your-email@gmail.com", // replace with your email
        pass: "your-app-password", // replace with your email app password (note: using an app password is more secure)
    },
});

const sendVerificationEmail = (recipientEmail, verificationCode) => {
    const mailOptions = {
        from: "noreply@wanderbook.com", // replace this with your sender email
        to: recipientEmail,
        subject: "Please verify your email with WanderBook",
        text: `Your verification code is: ${verificationCode}`,
        html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

module.exports = { sendVerificationEmail };
