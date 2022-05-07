"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPrice = void 0;
const coingecko_api_1 = __importDefault(require("coingecko-api"));
const fetchPrice = async (token) => {
    const CoinGeckoClient = new coingecko_api_1.default();
    const response = await CoinGeckoClient.simple.price({
        ids: [token],
        vs_currencies: ['usd'],
    });
    console.log(response.data);
};
exports.fetchPrice = fetchPrice;
