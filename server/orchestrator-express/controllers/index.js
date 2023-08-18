const redis = require("../config/ioredis");
const { default: axios } = require("axios");
const {
  APP_PRODUCTS,
  APP_API,
  APP_PRODUCT,
  APP_CATEGORIES,
  APP_CATEGORY,
} = require("../constants/baseUrl");

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

  static async readProductById(req, res, next) {
    try {
      const { id } = req.params;
      const productCache = await redis.get(APP_PRODUCT);
      if (!productCache) {
        const { data } = await axios.get(`${APP_API}/pub/products/${id}`);
        await redis.set(APP_PRODUCT, JSON.stringify(data));
        res.status(200).json(data);
      } else {
        const data = JSON.parse(productCache);
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async readCategories(req, res, next) {
    try {
      const categoriesCache = await redis.get(APP_CATEGORIES);
      if (!categoriesCache) {
        const { data } = await axios.get(`${APP_API}/pub/categories`);
        await redis.set(APP_CATEGORIES, JSON.stringify(data));
        res.status(200).json(data);
      } else {
        const data = JSON.parse(categoriesCache);
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async readCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const categoryCache = await redis.get(APP_CATEGORY);
      if (!categoryCache) {
        const { data } = await axios.get(`${APP_API}/pub/categories/${id}`);
        await redis.set(APP_CATEGORY, JSON.stringify(data));
        res.status(200).json(data);
      } else {
        const data = JSON.parse(categoryCache);
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
