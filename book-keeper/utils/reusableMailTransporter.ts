import nodemailer from 'nodemailer';

/**resuable mail transporter for dispatching mails to user */
const mailTransporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST as string,
    port: parseInt(process.env.EMAIL_SERVER_PORT as string),
    auth: {
        user: process.env.EMAIL_SERVER_USER as string,
        pass: process.env.EMAIL_SERVER_PASSWORD as string,
    },
    secure: true,
});

export default mailTransporter;