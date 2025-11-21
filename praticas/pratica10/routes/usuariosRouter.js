const express = require('express');
const usuariosController = require('../controllers/usuariosController');
const { verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /usuarios
router.post('/', usuariosController.criar);

// POST /usuarios/login
router.post('/login', usuariosController.entrar);

// POST /usuarios/renovar (precisa de token)
router.post('/renovar', verificarToken, usuariosController.renovar);

// DELETE /usuarios/:id (precisa de token)
router.delete('/:id', verificarToken, usuariosController.remover);

module.exports = router;