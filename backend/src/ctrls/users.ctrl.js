const usersService = require('../services/users.service');

const getAllUsers = async (req, res, next) => {
  try {
    const query = req.query && Object.keys(req.query).length > 0 ? req.query : {};
    const result = await usersService.listUsers(query);
    res.status(200).json({
      success: true,
      data: result.users,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req.params.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await usersService.createUser(req.body);
    res.status(201).json({
      success: true,
      data: user,
      message: 'Usuario creado con éxito',
    });
  } catch (error) {
    next(error);
  }
};

const updateUserStatus = async (req, res, next) => {
  try {
    const { isActive } = req.body;
    const user = await usersService.setUserStatus(req.params.id, isActive);
    res.status(200).json({
      success: true,
      data: user,
      message: `Usuario ${isActive ? 'activado' : 'suspendido'} con éxito`,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const { roleId, role } = req.body;
    const user = await usersService.setUserRole(req.params.id, { roleId, role });
    res.status(200).json({
      success: true,
      data: user,
      message: 'Rol de usuario actualizado con éxito',
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await usersService.deleteUser(req.params.id);
    res.status(200).json({
      success: true,
      data: user,
      message: 'Usuario eliminado lógicamente (soft delete) con éxito',
    });
  } catch (error) {
    next(error);
  }
};

const restoreUser = async (req, res, next) => {
  try {
    const user = await usersService.restoreUser(req.params.id);
    res.status(200).json({
      success: true,
      data: user,
      message: 'Usuario restaurado con éxito',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserStatus,
  updateUserRole,
  deleteUser,
  restoreUser,
};
