const { Router } = require('express');
const { getAllVideogames } = require('../controllers/videogameControllers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// GET VIDEOGAMES
const router = Router();
router.use('/', getAllVideogames)

module.exports = router