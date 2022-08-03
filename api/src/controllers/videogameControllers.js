const axios = require('axios');
const { getVideogamesFromDB } = require('./videogamesControllers');
require('dotenv').config();

const { API_KEY } = process.env;

async function getVideogameByID(req, res, next) {
  const { idVideogame } = req.params
  if (idVideogame) {
    try {
      let videogamesDB = await getVideogamesFromDB()
      let videogame = await videogamesDB.filter(v => v.id === idVideogame)
      if (!videogame.length) {
        let urlApiID = `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}` 
        let videogameApi = (await axios(urlApiID)).data
        if (!videogameApi) return res.status(404).send('Juego no encontrado')
        videogame = [
          {
            id: videogameApi.id, 
            background_image: videogameApi.background_image, 
            name: videogameApi.name, 
            genres: videogameApi.genres.map(g => g)
          }
        ]
      }
      res.json(videogame)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  getVideogameByID,
}