// app.js
require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const produtosRouter = require('./routes/produtosRouter');

const app = express();

// Middlewares padrão
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Conexão MongoDB Atlas
const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_DATABASE 
} = process.env;

const mongoUri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}`;

mongoose
  .connect(mongoUri)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch((err) => {
    console.error('❌ Erro ao conectar no MongoDB:', err.message);
    process.exit(1);
  });

// Rotas
app.use(produtosRouter);

// Exporta app para testes
module.exports = app;