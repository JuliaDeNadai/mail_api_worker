import { MailController } from "../controllers/MailController"
import { RabbitMQ } from "../service/rabbitmq"
import { SendMailService } from "../service/send_mail_service"

class MailMessageChannel{

  async work(){

    const rabbitmq = new RabbitMQ() 

    const channel = await rabbitmq.createMessageChannel()

    if(channel)
      await channel.consume(process.env.QUEUE_NAME ?? "", async (msg) => {
        const message = JSON.parse(msg?.content.toString() ?? "")
        console.log(message)

        const mail_controller = new MailController()
        mail_controller.send(message.email, message.title, message.content)

        if (msg)
          await channel.ack(msg)
      })
  }
}

export {MailMessageChannel}