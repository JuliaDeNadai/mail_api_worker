import { Channel, connect } from 'amqplib';
import { config } from 'dotenv';

var amqp = require('amqplib/callback_api');

class RabbitMQ {

  /* channel: Channel | null = null

  async RabbitMQ(){
    this.channel = await this.createMessageChannel()
  } */

  async createMessageChannel(): Promise<Channel | null> {
    config()

    try {
      console.log(process.env.AMQP_SERVER)
      const connection = await connect(process.env.AMQP_SERVER ?? "")

      const channel = await connection.createChannel()
      await channel.assertQueue(process.env.QUEUE_NAME ?? "default")

      return channel
    }
    catch(error){

      console.log(error)
      return null
    }
  }
  
}

export { RabbitMQ }
