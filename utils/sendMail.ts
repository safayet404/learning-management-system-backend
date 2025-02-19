require('dotenv').config()
import nodemailer , {Transporter} from "nodemailer"

import ejs from "ejs"
import path from "path"

interface EmailOptions {
    email :string
    subject : string
    template : string
    data : {[key:string] : any}
}

console.log(process.env.SMTP_MAIL, process.env.SMTP_PASSWORD);

const sendMail = async (options : EmailOptions) : Promise <void> =>{
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true, // Use true for port 465, false for 587
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });
    
    // Test Connection
    transporter.verify((error, success) => {
        if (error) {
            console.error("SMTP Connection Error:", error);
        } else {
            console.log("SMTP Connected Successfully!");
        }
    });

    const {email,subject,template,data} = options
    const templatePath = path.join(__dirname, "../mails",template)

    const html:string = await ejs.renderFile(templatePath,data)

    const mailOptions = {
        from : process.env.SMTP_MAIL,
        to : email,
        subject,
        html
    }

    await transporter.sendMail(mailOptions)
}

export default sendMail