import CoinGecko from 'coingecko-api';
import { createCall } from './call';

interface Request {
  coin: string;
  price: string;
  status: string;
  phone_number: string;
};

const requests: Request[] = [];

export const pushRequest = (req: Request) => {
  requests.push(req);
};

export const fetchPrice = async (
  token: string
) => {
  const CoinGeckoClient = new CoinGecko();
  const response = await CoinGeckoClient.simple.price({
    ids: [token],
    vs_currencies: ['usd'],
  });
  const price = Number(response.data[token].usd);
  return isNaN(price) ? 0 : price;
};

export const poller = () => {
  if (requests.length > 0) {
    console.log('Poller is running.')
    requests.forEach(async (req, index) => {
      const price = await fetchPrice(req.coin);
      if (price === 0) return;
      if (price > Number(req.price) && req.status === 'high') {
        const message = `${req.coin} is currently high at ${price} USD.`;
        console.log(message);
        createCall(message, req.phone_number);
        requests.splice(index, 1);
      } else if (price < Number(req.price) && req.status === 'low') {
        const message = `${req.coin} is currently low at ${price} USD.`;
        console.log(message);
        createCall(message, req.phone_number);
        requests.splice(index, 1);
      }
    });
  }
};
