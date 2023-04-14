import express from 'express';
import { RabbitMQ } from './service/rabbitmq';
import { MailMessageChannel } from './message/mail_message_chanel';

const app = express();
var http = require('http').Server(app)


app.set("http", http); 

const mail_channel = new MailMessageChannel()
mail_channel.work()

export { app }