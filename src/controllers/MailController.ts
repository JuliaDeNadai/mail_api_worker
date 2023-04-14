import { SendMailService } from "../service/send_mail_service";

import {resolve} from 'path';

class MailController {

  async send( receiver: string, subject: string, content: string ){

    const npsPath = resolve(__dirname, "..", "views", "emails", "default.hbs");

    const sendMailService = new SendMailService()
    const sendMail = await sendMailService.execute(
      receiver,
      subject,
      content,
      npsPath
    );

    if(sendMail) return true
    return false
  }  

}

export { MailController }