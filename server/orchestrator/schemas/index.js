"use strict";
const userSchema = require("./userSchema");
const productSchema = require("./productSchema");
const categorySchema = require("./categorySchema");
const imageSchema = require("./imageSchema");

const typeDefs = `#graphql
  ${userSchema}
  ${productSchema}
  ${categorySchema}
  ${imageSchema}

  type MessageResponse {
    message: String
  }

  type Query {
    products: [Product]
    product(id: ID): Product
    categories: [Category]
    category(id: ID): Category
    users: [User]
    user(_id: ID): User
  }

  type Mutation {
    addUser(
      email: String
      username: String
      password: String
      phoneNumber: String
      address: String
    ): MessageResponse
    deleteUser(_id: ID): MessageResponse
    addProduct(
      name: String
      description: String
      price: String
      mainImg: String
      categoryId: Int
      images: String
    ): MessageResponse
    editProduct(
      name: String
      description: String
      price: String
      mainImg: String
      categoryId: Int
      images: String
    ): MessageResponse
    deleteProduct(_id: ID): MessageResponse
  }
`;

module.exports = typeDefs;
