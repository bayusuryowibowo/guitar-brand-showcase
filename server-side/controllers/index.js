const { generateAccessToken } = require("../helpers/jwt");
const { sequelize, User, Product, Image } = require("../models");

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "ValidationError" };
      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "UserNotFound" };
      const isPasswordValid = user.verifyPassword(password);
      if (isPasswordValid) {
        var access_token = generateAccessToken(user);
      } else {
        throw { name: "FailedLogin" };
      }
      res.status(200).json({
        message: "You have logged in successfully",
        access_token,
        email: user.email,
        username: user.username,
        role: user.role,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, description, price, mainImg, categoryId, imgUrls } =
        req.body;
      const product = await Product.create(
        {
          name,
          description,
          price,
          mainImg,
          categoryId,
          authorId: req.user.id,
        },
        { transaction: t }
      );
      imgUrls.forEach((el) => {
        el.productId = product.id;
      });
      await Image.bulkCreate(imgUrls, { transaction: t });
      await t.commit();
      res.status(201).json({ message: "Product & images added" });
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = Controller;
