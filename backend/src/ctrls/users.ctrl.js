const usersService = require('../services/users.service');

const getAllUsers = async (req, res, next) => {
  try {
    const result = await usersService.listUsers(req.query);
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
    const { roleId } = req.body;
    const user = await usersService.setUserRole(req.params.id, roleId);
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
  updateUserStatus,
  updateUserRole,
  deleteUser,
  restoreUser,
};
