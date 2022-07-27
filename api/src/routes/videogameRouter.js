const { Router } = require('express');
const { getVideogameByID } = require('../controllers/videogameControllers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get('/:idVideogame', getVideogameByID)

module.exports = router