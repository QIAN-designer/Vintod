const reviewsService = require('../services/reviews.service');

const getMyReviews = async (req, res, next) => {
  try {
    const result = await reviewsService.getUserReviews(req.user.id);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getUserReviews = async (req, res, next) => {
  try {
    const result = await reviewsService.getUserReviews(req.params.userId);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createReview = async (req, res, next) => {
  try {
    const result = await reviewsService.createReview(
      req.user.id,
      req.params.userId,
      req.body
    );
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    await reviewsService.deleteReview();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyReviews,
  getUserReviews,
  createReview,
  deleteReview,
};
