const axios = require('axios')
require('dotenv').config();

const { API_KEY } = process.env;

// GET VIDEOGAMES
async function getAllVideogames(req, res, next) {
  try {
    let videogames = (await axios(`https://api.rawg.io/api/games?key=${API_KEY}`)).data.results
    res.send(videogames)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllVideogames
}