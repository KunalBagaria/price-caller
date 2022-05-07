import {
  Client,
  Intents
} from 'discord.js';
import dotenv from 'dotenv';
import { poller, pushRequest } from './price';

dotenv.config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]
});
const token = process.env.TOKEN;

client.once('ready', async () => {
	console.log('Ready!');
  setInterval(poller, 10000);
});

client.on('messageCreate', (message) => {
  if (message.content.includes('$poll')) {
    const message_args = message.content.split(' ');
    message_args.shift();
    if (message_args.length < 4) {
      message.channel.send('Invalid arguments!');
      return;
    }
    const request = {
      coin: message_args[0],
      price: message_args[1],
      status: message_args[2],
      phone_number: message_args[3],
    };
    pushRequest(request);
    message.delete();
    message.channel.send('Request added!');
  }
});

client.login(token);