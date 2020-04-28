const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env_SENDGRID_API_KEY)
const sendWelcomeEmail = (email,name) =>  {
    sgMail.send({
        to:email,
        from: 'myemail@gmail.com',
        subject: 'Thanks for joining in',
        text: `Welcome to the app, ${name}.`
    })
}

const sendCancelationEmail = (email,name) =>  {
    sgMail.send({
        to:email,
        from: 'myemail@gmail.com',
        subject: 'your account is removed',
        text: `Hi, ${name}. We just wanted to notify that your account is removed.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}