"use strict";
const axios = require("axios");
const { APP_API, APP_PRODUCTS, APP_PRODUCT, USERS_API } = require("../constants/basePath");
const redis = require("../config/ioredis");

const productResolver = {
  Query: {
    products: async () => {
      try {
        const productsCache = await redis.get(APP_PRODUCTS);
        if (!productsCache) {
          const { data } = await axios.get(`${APP_API}/pub/products`);
          await redis.set(APP_PRODUCTS, JSON.stringify(data));
          return data;
        } else {
          const data = JSON.parse(productsCache);
          return data;
        }
      } catch (error) {
        throw error;
      }
    },
    product: async (_, args) => {
      try {
        const { id } = args;
        const productCacheKey = `${APP_PRODUCT}:${id}`;
        const productCache = await redis.get(productCacheKey);
        if (!productCache) {
          const { data: product } = await axios.get(
            `${APP_API}/pub/products/${id}`
          );
          const { data: user } = await axios.get(
            `${USERS_API}/users/${product.UserMongoId}`
          );
          product.User = user;
          await redis.set(productCacheKey, JSON.stringify(product));
          return product;
        } else {
          const data = JSON.parse(productCache);
          return data;
        }
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    addProduct: async (_, args) => {
      try {
        const { name, description, price, mainImg, categoryId, images } = args;
        const { data: message } = await axios.post(
          `${APP_API}/products`,
          {
            name,
            description,
            price,
            mainImg,
            categoryId,
            images,
          },
          {}
        );
        const { data: products } = await axios.get(`${APP_API}/products`, {});
        await redis.set(APP_PRODUCTS, JSON.stringify(products));
        return message;
      } catch (error) {
        throw error;
      }
    },
    editProduct: async (_, args) => {
      try {
        const { name, description, price, mainImg, categoryId, images } = args;
        const { data: message } = await axios.put(
          `${APP_API}/products`,
          {
            name,
            description,
            price,
            mainImg,
            categoryId,
            images,
          },
          {}
        );
        const { data: products } = await axios.get(`${APP_API}/products`, {});
        await redis.set(APP_PRODUCTS, JSON.stringify(products));
        return message;
      } catch (error) {
        throw error;
      }
    },
    deleteProduct: async (_, args) => {
      try {
        const { _id } = args;
        const productCacheKey = `${APP_CATEGORY}:${_id}`;
        const { data: message } = await axios.delete(`${APP_API}/users/${_id}`);
        const { data: products } = await axios.get(`${APP_API}/products`);
        await redis.set(APP_CATEGORIES, JSON.stringify(products));
        await redis.del(productCacheKey);
        return message;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = productResolver;
