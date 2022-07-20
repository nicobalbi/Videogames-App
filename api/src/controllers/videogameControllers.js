const axios = require('axios');
const { Videogame } = require('../db');
require('dotenv').config();

const { API_KEY } = process.env;

// GET VIDEOGAMES /videogames | /videogames?name='...'
async function getVideogames(req, res, next) {
  const { name } = req.query
  try {
    let videogames = (await axios(`https://api.rawg.io/api/games?key=${API_KEY}`)).data.results
    .map(v => ({background_image: v.background_image, name: v.name, genres: v.genres}))
    if (name) videogames = videogames.filter(v => v.name.includes(name))
    if (videogames.length === 0) return res.send('Ningun juego encontrado')
    res.send(videogames)
  } catch (error) {
    next(error)
  }
}

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

// POST VIDEOGAMES /videogames
async function postVideogame(req, res, next) {
  const { name, description, released, rating, genres, platforms } = req.body
  try {
    let videogame = { name, description, released, rating, platforms }
    await Videogame.create(videogame)
    res.send(videogame)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getVideogames,
  getVideogameByID,
  postVideogame
}