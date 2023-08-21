"use strict";

const productSchema = `#graphql
  type Product {
    id: ID
    name: String
    slug: String
    description: String
    price: Float
    mainImg: String
    categoryId: Int
    UserMongoId: String
    createdAt: String
    updatedAt: String
    User: User
    Category: Category
    Images: [Image]
  }
`;

module.exports = productSchema;
