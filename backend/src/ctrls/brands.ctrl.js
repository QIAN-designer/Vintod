const brandsService = require('../services/brands.service');

const getBrands = async (req, res, next) => {
  try {
    const brands = await brandsService.getAllBrands(req.query);
    res.status(200).json({
      success: true,
      count: brands.length,
      data: brands
    });
  } catch (err) {
    next(err);
  }
};

const getBrandById = async (req, res, next) => {
  try {
    const brand = await brandsService.getBrandById(req.params.id);
    res.status(200).json({
      success: true,
      data: brand
    });
  } catch (err) {
    next(err);
  }
};

const getBrandBySlug = async (req, res, next) => {
  try {
    const brand = await brandsService.getBrandBySlug(req.params.slug);
    res.status(200).json({
      success: true,
      data: brand
    });
  } catch (err) {
    next(err);
  }
};

const createBrand = async (req, res, next) => {
  try {
    const newBrand = await brandsService.createBrand(req.body);
    res.status(201).json({
      success: true,
      message: 'Marca creada exitosamente',
      data: newBrand
    });
  } catch (err) {
    next(err);
  }
};

const updateBrand = async (req, res, next) => {
  try {
    const updated = await brandsService.updateBrand(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Marca actualizada exitosamente',
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

const deleteBrand = async (req, res, next) => {
  try {
    await brandsService.deleteBrand(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Marca eliminada exitosamente'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBrands,
  getBrandById,
  getBrandBySlug,
  createBrand,
  updateBrand,
  deleteBrand
};

