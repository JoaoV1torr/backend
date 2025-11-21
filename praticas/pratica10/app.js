require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const apidocsRouter = require('./routes/apidocsRouter');
const usuariosRouter = require('./routes/usuariosRouter');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_DATABASE,
} = process.env;

const mongoUri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

mongoose
  .connect(mongoUri)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch((err) => console.error('❌ Erro ao conectar no MongoDB:', err));


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API de Prática 10 funcionando' });
});


app.use('/api-docs', apidocsRouter);
app.use('/usuarios', usuariosRouter);


app.use((req, res) => {
  res.status(404).json({ msg: 'Rota não encontrada' });
});


app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ msg: 'Erro interno do servidor' });
});

module.exports = app;
