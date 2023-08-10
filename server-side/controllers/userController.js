const { Category, Product, Image } = require("../models");

class userController {
  static async readProducts(req, res, next) {
    try {
      const products = await Product.findAll({
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
}

module.exports = userController;
