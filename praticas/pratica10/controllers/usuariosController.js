const {
    cifrarSenha,
    gerarToken,
    compararSenha,
  } = require('../middlewares/authMiddleware');
  
  const Usuario = require('../models/usuariosModel');
  
  // POST /usuarios
  async function criar(req, res) {
    try {
      const { email, senha } = req.body;
  
      if (!email || !senha) {
        return res
          .status(422)
          .json({ msg: 'Email e Senha são obrigatórios' });
      }
  
      const senhaCifrada = cifrarSenha(senha);
  
      const novoUsuario = await Usuario.create({
        email,
        senha: senhaCifrada,
      });
  
      return res.status(201).json({
        _id: novoUsuario._id,
        email: novoUsuario.email,
      });
    } catch (err) {
      return res
        .status(422)
        .json({ msg: 'Email e Senha são obrigatórios' });
    }
  }
  
  // POST /usuarios/login
  async function entrar(req, res) {
    try {
      const { usuario, senha } = req.body;
  
      if (!usuario || !senha) {
        return res.status(401).json({ msg: 'Credenciais inválidas' });
      }
  
      const usuarioEncontrado = await Usuario.findOne({ email: usuario });
  
      if (!usuarioEncontrado) {
        return res.status(401).json({ msg: 'Credenciais inválidas' });
      }
  
      const senhaConfere = compararSenha(senha, usuarioEncontrado.senha);
  
      if (!senhaConfere) {
        return res.status(401).json({ msg: 'Credenciais inválidas' });
      }
  
      const token = gerarToken({ email: usuario });
  
      return res.status(200).json({ token });
    } catch (err) {
      return res.status(401).json({ msg: 'Credenciais inválidas' });
    }
  }
  
  // POST /usuarios/renovar
  async function renovar(req, res) {
    const token = gerarToken({ email: req.usuario });
    return res.status(200).json({ token });
  }
  
  // DELETE /usuarios/:id
  async function remover(req, res) {
    const { id } = req.params;
    await Usuario.findOneAndDelete({ _id: id });
    return res.status(204).send();
  }
  
  module.exports = {
    criar,
    entrar,
    renovar,
    remover,
  };