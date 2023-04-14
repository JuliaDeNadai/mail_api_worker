import nodemailer, { Transport } from 'nodemailer';

import fs from 'fs';
import handlebars from 'handlebars';

class SendMailService {
  async execute(
    receiver: string,
    subject: string,
    content: string,
    path: string
  ) {
  
    const variables = {
      receiver, 
      subject, 
      content
    };

    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const mailTemplateParse = handlebars.compile(templateFileContent);

    const html = mailTemplateParse(variables);

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
      tls:{
        rejectUnauthorized: false
      }
    });

    try{

      let info = await transporter.sendMail({
        from: process.env.MAIL_USER, // sender address
        to: receiver, // list of receivers
        subject: `${subject}`, // Subject line
        html,
      });
    }
    catch(error){
      console.log(error)
      return false
    }

    return true;
  }
}

export {SendMailService};