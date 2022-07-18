const { Router } = require('express');
const { getGenresFromDB } = require('../controllers/genreControllers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// GET VIDEOGAMES
const router = Router();
router.use('/', getGenresFromDB)

module.exports = router