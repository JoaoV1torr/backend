const express = require('express');
const swaggerUI = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');

const router = express.Router();

// Lê o arquivo swagger.yaml
const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

// Middleware para servir o Swagger UI
router.use('/', swaggerUI.serve);

// Rota GET / que exibe a UI com o documento Swagger
router.get('/', swaggerUI.setup(swaggerDocument));

module.exports = router;
