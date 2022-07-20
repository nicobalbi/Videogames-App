const { Router } = require('express');
const { getVideogames, getVideogameByID, postVideogame } = require('../controllers/videogameControllers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get('/:idVideogame', getVideogameByID)
router.get('/', getVideogames)
router.post('/', postVideogame)

module.exports = router