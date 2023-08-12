const { generateAccessToken } = require("../helpers/jwt");
const { sequelize, User, Category, Product, Image } = require("../models");

class adminController {
  static async register(req, res, next) {
    try {
      const { email, username, password, phoneNumber, address } = req.body;
      await User.create({
        email,
        username,
        password,
        phoneNumber,
        address,
      });
      res
        .status(201)
        .json({ message: "Admin account has been successfully registered" });
    } catch (error) {
      next(error);
    }
  }

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
      const { name, description, price, mainImg, categoryId, images } =
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
      images.forEach((el) => {
        el.productId = product.id;
      });
      await Image.bulkCreate(images, { transaction: t });
      await t.commit();
      res.status(201).json({ message: "Product & images added" });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

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

  static async editProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { name, description, price, mainImg, categoryId, images } =
        req.body;
      await Product.update(
        {
          name,
          description,
          price,
          mainImg,
          categoryId,
          authorId: req.user.id,
        },
        {
          transaction: t,
          where: {
            id: id,
          },
        }
      );
      await Promise.all(
        images.map(async (image) => {
          await Image.update(
            {
              imgUrl: image.imgUrl,
            },
            {
              transaction: t,
              where: {
                id: image.id,
              },
            }
          );
        })
      );
      await t.commit();
      res.status(200).json({ message: "Product edited" });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      await Product.destroy({ where: { id: id } });
      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      next(error);
    }
  }

  static async addCategory(req, res, next) {
    try {
      const { name } = req.body;
      await Category.create({ name });
      res.status(201).json({ message: "Category added" });
    } catch (error) {
      next(error);
    }
  }

  static async readCategories(req, res, next) {
    try {
      const categories = await Category.findAll({});
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async editCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      await Category.update(
        { name },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(200).json({ message: "Category edited" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      await Category.destroy({ where: { id: id } });
      res.status(200).json({ message: "Category deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = adminController;
