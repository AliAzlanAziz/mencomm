const nodemailer = require('nodemailer')

module.exports = {
    sendmail: function(receiver, subject, message){
        // Step 1=
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true, 
            auth: {
                user: process.env.EMAIL || 'abc@gmail.com',
                pass: process.env.GMAIL_PASSWORD || '1234'
            }
        });

        // Step 2
        const mailOptions = {
            from: {
                name: 'Mencomm App',
                address: 'abc@gmail.com'
            }, 
            to: receiver,
            subject: subject,
            html: message
        };

        // Step 3
        transporter.sendMail(mailOptions, (error, data) => {
            if(error){
                return error
            }
        });
    }
}