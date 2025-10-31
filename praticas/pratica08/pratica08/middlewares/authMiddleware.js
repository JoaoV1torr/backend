// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

function extrairToken(req) {
  
  const auth = req.headers['authorization'];
  if (!auth) return null;
  const partes = auth.split(' ');
  return partes.length === 2 ? partes[1] : partes[0];
}

function verificarToken(req, res, next) {
  const token = extrairToken(req);
  if (!token) {
    return res.status(401).json({ msg: 'Não autorizado' });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload; 
    return next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
}

function gerarToken(payload) {
  try {
    const expiresIn = 120; // segundos
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  } catch (err) {
    throw new Error('Erro ao gerar o token');
  }
}

module.exports = { verificarToken, gerarToken };