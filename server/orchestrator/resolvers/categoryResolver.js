"use strict";
const axios = require("axios");
const { APP_API, APP_CATEGORIES, APP_CATEGORY } = require("../constants/basePath");
const redis = require("../config/ioredis");

const categoryResolver = {
  Query: {
    categories: async () => {
      try {
        const categoriesCache = await redis.get(APP_CATEGORIES);
        if (!categoriesCache) {
          const { data: categories } = await axios.get(
            `${APP_API}/pub/categories`
          );
          await redis.set(APP_CATEGORIES, JSON.stringify(categories));
          return categories;
        } else {
          const categories = JSON.parse(categoriesCache);
          return categories;
        }
      } catch (error) {
        throw error;
      }
    },
    category: async (_, args) => {
      try {
        const { id } = args;
        const categoryCacheKey = `${APP_CATEGORY}:${id}`;
        const categoryCache = await redis.get(categoryCacheKey);
        if (!categoryCache) {
          const { data: category } = await axios.get(
            `${APP_API}/pub/categories/${id}`
          );
          await redis.set(categoryCacheKey, JSON.stringify(category));
          return category;
        } else {
          const category = JSON.parse(categoryCache);
          return category;
        }
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = categoryResolver;
