"use strict";
const { getDb } = require("../config/mongodb-connection");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

module.exports = class User {
  verifyPassword(plainPassword) {
    return bcrypt.compareSync(plainPassword, this.password);
  }

  static async create(value) {
    try {
      const hashedPassword = bcrypt.hashSync(value.password, salt);
      const db = await getDb();
      const users = await db.collection("Users");
      const doc = {
        email: value.email,
        username: value.username,
        password: hashedPassword,
        role: "Admin",
        phoneNumber: value.phoneNumber,
        address: value.address,
      };
      const result = await users.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      return;
    } catch (error) {
      return error;
    }
  }
};
