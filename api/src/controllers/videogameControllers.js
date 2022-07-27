const axios = require('axios');
require('dotenv').config();

const { API_KEY } = process.env;

// GET VIDEOGAMES BY ID /videogame/{idVideogame}
async function getVideogameByID(req, res, next) {
  const { idVideogame } = req.params
  try {
    let videogame = (await axios(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)).data
    if (!videogame) return res.send('Juego no encontrado')
    res.send({
      background_image: videogame.background_image,
      name: videogame.name,
      genres: videogame.genres,
      description: videogame.description,
      released: videogame.released,
      rating: videogame.rating,
      platforms: videogame.platforms
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getVideogameByID,
}