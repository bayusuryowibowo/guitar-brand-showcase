"use strict";

const userSchema = `#graphql
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
`;

module.exports = userSchema;
