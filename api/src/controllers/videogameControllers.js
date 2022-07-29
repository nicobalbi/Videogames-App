const axios = require('axios');
const { getAllVideogames } = require('./videogamesControllers');
require('dotenv').config();


// GET VIDEOGAMES BY ID /videogame/{idVideogame}
async function getVideogameByID(req, res, next) {
  const { idVideogame } = req.params
  if (idVideogame) {
    let videogames = await getAllVideogames()
    let videogame = await videogames.filter(v => v.id == idVideogame)
    if (!videogame.length) return res.status(404).send('Juego no encontrado')
    res.json(videogame)
  }
}

module.exports = {
  getVideogameByID,
}