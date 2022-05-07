import Twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

export const createCall = (
  message: string,
  phone_number: string
) => {
  const client = Twilio(accountSid, authToken);
  client.calls
  .create({
    twiml: `<Response><Say>${message}</Say></Response>`,
    to: phone_number,
    from: '+12722137116'
  });
};
