const axios = require('axios');
const { Videogame, Genre } = require('../db');
require('dotenv').config();

const { API_KEY } = process.env;

async function getVideogamesFromApi() {
  let videogamesApi = (await axios(`https://api.rawg.io/api/games?key=${API_KEY}`)).data.results
    .map(v => {
      return {
        id: v.id, 
        background_image: v.background_image, 
        name: v.name, 
        genres: v.genres.map(g => g)
      }
    })
  return videogamesApi
}

async function getVideogamesFromDB() {
  let videogamesDB = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })
  return videogamesDB
}

async function getAllVideogames() {
  let vgApi = await getVideogamesFromApi()
  let vgDB = await getVideogamesFromDB()
  return vgApi.concat(vgDB)
}

// GET VIDEOGAMES /videogames | /videogames?name='...'
async function getVideogames(req, res, next) {
  const { name } = req.query
  try {
    let videogames = await getAllVideogames()
    if (name) videogames = videogames.filter(v => v.name.toLowerCase().includes(name.toLowerCase()))
    if (!videogames.length) return res.send('Ningun juego encontrado')
    res.send(videogames)
  } catch (error) {
    next(error)
  } 
}

// POST VIDEOGAMES /videogames
async function postVideogame(req, res, next) {
  const { name, description, released, rating, genres, platforms, createdInDb } = req.body
  try {
    let videogame = { name, description, released, rating, platforms, createdInDb }
    let videogameCreated = await Videogame.create(videogame)
    let genreDb = await Genre.findAll({
      where: {
        name: genres
      }
    })
    videogameCreated.addGenre(genreDb)
    res.send('Videogame generado con exito')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllVideogames,
  getVideogames,
  postVideogame
}