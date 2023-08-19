const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const redis = require("./config/ioredis");
const { default: axios } = require("axios");
const {
  APP_API,
  APP_PRODUCT,
  APP_PRODUCTS,
  USERS_API,
  USERS_USERS,
  APP_CATEGORIES,
  APP_CATEGORY,
} = require("./constants/basePath");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const typeDefs = `#graphql
  type User {
    _id: String
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
    createdAt: String
    updatedAt: String
  }

  type Product {
    id: ID
    name: String
    slug: String
    description: String
    price: Float
    mainImg: String
    categoryId: Int
    authorId: Int
    createdAt: String
    updatedAt: String
    User: User
    Category: Category
    Images: [Image]
  }

  type Category {
    id: ID
    name: String
    createdAt: String
    updatedAt: String
  }

  type Image {
    id: ID
    productId: Int
    imgUrl: String
    createdAt: String
    updatedAt: String
  }

  type MessageResponse {
    message: String
  }

  type Query {
    products: [Product]
    product(id: ID): Product
    categories: [Category]
    category(id: ID): Category
    users: [User]
  }

  type Mutation {
    addUser(
      email: String,
      username: String,
      password: String,
      phoneNumber: String,
      address: String
      ): MessageResponse
  }
`;

const resolvers = {
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
        const productCacheKey = `${APP_PRODUCT}:${id}`
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
    categories: async () => {
      try {
        const categoriesCache = await redis.get(APP_CATEGORIES);
        if (!categoriesCache) {
          const { data: categories } = await axios.get(`${APP_API}/pub/categories`);
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
        const categoryCacheKey = `${APP_CATEGORY}:${id}`
        const categoryCache = await redis.get(categoryCacheKey);
        if (!categoryCache) {
          const { data: category } = await axios.get(`${APP_API}/pub/categories/${id}`);
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
    }
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
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}`));
