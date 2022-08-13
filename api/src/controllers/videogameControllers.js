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
        videogame = [
          {
            id: videogameApi.id, 
            name: videogameApi.name,
            image: videogameApi.background_image, 
            description: videogameApi.description,
            released: videogameApi.released,
            rating: videogameApi.ratings.length > 0 ? videogameApi.rating : 'Not rated',
            genres: videogameApi.genres.map(g => g),
            platforms: videogameApi.platforms.map(p => p.platform.name).join()
          }
        ]
      }
      res.json(videogame)
    } catch (error) {
      res.send(`Videogame id ${idVideogame} not found`)
    }
  }
}

module.exports = {
  getVideogameByID,
}