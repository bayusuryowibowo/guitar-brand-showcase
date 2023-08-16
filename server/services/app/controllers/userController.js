const { Category, Product, Image, User } = require("../models");

class userController {
  static async readProducts(req, res, next) {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
          Category,
          Image,
        ],
        order: [["id", "ASC"]],
      });
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async readProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {
        include: [Category, Image],
      });
      if (!product) throw { name: "NotFound" };
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async readCategories(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async readCategoryById(req, res, next) {
    try {
      const category = await Category.findByPk(req.params.id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userController;
