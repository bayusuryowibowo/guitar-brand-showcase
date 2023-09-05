const { Product } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const data = await Product.findByPk(req.params.id);
    if (!data) throw { name: "NotFound" };
    if (data.authorId === req.user.id) return next();
    else throw { name: "Forbidden" };
  } catch (error) {
    next(error);
  }
};
