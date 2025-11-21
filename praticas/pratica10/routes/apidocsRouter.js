const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');

const router = express.Router();

// Lê o arquivo swagger.yaml
const file = fs.readFileSync('swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

// Swagger UI em /api-docs
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;