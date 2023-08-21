"use strict";

const imageSchema = `#graphql
  type Image {
    id: ID
    productId: Int
    imgUrl: String
    createdAt: String
    updatedAt: String
  }
`;

module.exports = imageSchema;
