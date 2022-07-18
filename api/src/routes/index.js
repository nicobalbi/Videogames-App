const { Router } = require('express');
const videogameRouter = require('./videogameRoutes')
const genreRouter = require('./genreRoutes')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use('/videogames', videogameRouter)
router.use('/genres', genreRouter)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
