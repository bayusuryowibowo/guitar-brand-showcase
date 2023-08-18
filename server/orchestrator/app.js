const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const redis = require("./config/ioredis");
const { default: axios } = require("axios");
const { APP_API, APP_PRODUCT, APP_PRODUCTS } = require("../constants/basePath");

const typeDefs = `#graphql
  type User {
    id: ID
    username: String
    email: String
    password: String
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

  type Query {
    products: [Product]
    product(id: ID): Product
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
        const productCache = await redis.get(APP_PRODUCT);
        if (!productCache) {
          const { data } = await axios.get(`${APP_API}/pub/products/${id}`);
          await redis.set(APP_PRODUCT, JSON.stringify(data));
          return data;
        } else {
          const data = JSON.parse(productCache);
          return data;
        }
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
