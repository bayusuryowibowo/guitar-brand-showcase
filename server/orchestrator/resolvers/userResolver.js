"use strict";
const axios = require("axios");
const { USERS_API, USERS_USERS, USERS_USER } = require("../constants/basePath");
const redis = require("../config/ioredis");

const userResolver = {
  Query: {
    users: async () => {
      try {
        const usersCache = await redis.get(USERS_USERS);
        if (!usersCache) {
          const { data: users } = await axios.get(`${USERS_API}/users`);
          await redis.set(USERS_USERS, JSON.stringify(users));
          return users;
        } else {
          const users = JSON.parse(usersCache);
          return users;
        }
      } catch (error) {
        throw error;
      }
    },
    user: async (_, args) => {
      try {
        const { _id } = args;
        const userCacheKey = `${USERS_USER}:${_id}`;
        const userCache = await redis.get(userCacheKey);
        if (!userCache) {
          const { data: user } = await axios.get(`${USERS_API}/users/${_id}`);
          await redis.set(userCacheKey, JSON.stringify(user));
          return user;
        } else {
          const user = JSON.parse(userCache);
          return user;
        }
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        const { email, username, password, phoneNumber, address } = args;
        const { data: message } = await axios.post(
          `${USERS_API}/users`,
          {
            email,
            username,
            password,
            phoneNumber,
            address,
          },
          {}
        );
        const { data: users } = await axios.get(`${USERS_API}/users`);
        await redis.set(USERS_USERS, JSON.stringify(users));
        return message;
      } catch (error) {
        throw error;
      }
    },
    deleteUser: async (_, args) => {
      try {
        const { _id } = args;
        const userCacheKey = `${USERS_USER}:${_id}`;
        const { data: message } = await axios.delete(
          `${USERS_API}/users/${_id}`
        );
        const { data: users } = await axios.get(`${USERS_API}/users`);
        await redis.set(USERS_USERS, JSON.stringify(users));
        await redis.del(userCacheKey);
        return message;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = userResolver;
