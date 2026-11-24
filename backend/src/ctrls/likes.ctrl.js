const likesService = require('../services/likes.service');

const getProductLikes = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const userId = req.user ? req.user.id : null;
    const result = await likesService.getProductLikes(productId, userId);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const addLike = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;
    const result = await likesService.addLike(userId, productId);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const removeLike = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;
    const result = await likesService.removeLike(userId, productId);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getMyLikes = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const products = await likesService.getMyLikedProducts(userId);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProductLikes,
  addLike,
  removeLike,
  getMyLikes,
};
