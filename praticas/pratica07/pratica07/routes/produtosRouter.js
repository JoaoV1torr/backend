// routes/produtosRouter.js
const express = require('express');
const controller = require('../controllers/produtosController');

const router = express.Router();

// POST /produtos
router.post('/produtos', controller.criar);

// GET /produtos
router.get('/produtos', controller.listar);

// GET /produtos/:id  (buscar + exibir)
router.get('/produtos/:id', controller.buscar, controller.exibir);

// PUT /produtos/:id  (buscar + atualizar)
router.put('/produtos/:id', controller.buscar, controller.atualizar);

// DELETE /produtos/:id (buscar + remover)
router.delete('/produtos/:id', controller.buscar, controller.remover);

module.exports = router;