const redis = require("../config/ioredis");
const { default: axios } = require("axios");
const { APP_PRODUCTS, APP_API } = require("../constants/baseUrl");

class Controller {
  static async readProducts(req, res, next) {
    try {
      const productsCache = await redis.get(APP_PRODUCTS);
      if (!productsCache) {
        const { data } = await axios.get(`${APP_API}/pub/products`);
        await redis.set(APP_PRODUCTS, JSON.stringify(data));
        res.status(200).json(data);
      } else {
        const data = JSON.parse(productsCache);
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;