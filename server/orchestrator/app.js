const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const redis = require("./config/ioredis");
const { default: axios } = require("axios");
const { APP_API, APP_PRODUCT, APP_PRODUCTS, USERS_API } = require("./constants/basePath");

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

  type Query {
    products: [Product]
    product(id: ID): Product
  }

  # type Mutation {
  #   addUser(input);

  # }
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
          const { data: product } = await axios.get(`${APP_API}/pub/products/${id}`);
          const { data: user } = await axios.get(`${USERS_API}/users/${product.UserMongoId}`);
          product.User = user;
          await redis.set(APP_PRODUCT, JSON.stringify(product));
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
  // Mutation: {

  // }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}`));
