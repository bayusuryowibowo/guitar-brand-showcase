const User = require("../models/user");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, username, password, phoneNumber, address } = req.body;
      await User.create({ email, username, password, phoneNumber, address });
      res
        .status(201)
        .json({ message: "Admin account has been successfully registered" });
    } catch (error) {
      next(error);
    }
  }

  static async readUsers(req, res, next) {
    try {
      const result = await User.findAll();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async readUserById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await User.findByPk(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUserById(req, res, next) {
    try {
      const { id } = req.params;
      await User.destroy(id);
      res.status(200).json({ message: `User with _id: ${id} deleted` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
