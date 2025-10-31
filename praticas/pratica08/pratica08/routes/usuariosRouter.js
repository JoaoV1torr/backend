// routes/usuariosRouter.js
const express = require('express');
const { verificarToken, gerarToken } = require('../middlewares/authMiddleware');

const router = express.Router();


router.post('/login', (req, res) => {
  const { usuario, email } = req.body;
  
  const emailPayload = email || usuario || 'anon@exemplo.com';

  const token = gerarToken({ email: emailPayload });
  return res.status(200).json({ token });
});


router.post('/renovar', verificarToken, (req, res) => {
  const emailPayload = req.usuario?.email || 'anon@exemplo.com';
  const token = gerarToken({ email: emailPayload });
  return res.status(200).json({ token });
});

module.exports = router;