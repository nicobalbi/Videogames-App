const axios = require('axios');
const { Videogame, Genre } = require('../db');
require('dotenv').config();

const { API_KEY } = process.env;

async function getVideogamesFromApi(name) {

  let urlApi = `https://api.rawg.io/api/games?key=${API_KEY}`
  let urlApiSearch = `${urlApi}&search=${name}`

  let videogamesApi = []
  if (!name) {
    for (let i = 1; i <= 5; i++) {
      let videogamesEndpoint = (await axios(urlApi)).data
      videogamesApi = [...videogamesApi, ...videogamesEndpoint.results]
      urlApi = videogamesEndpoint.next
    }
  } else {
    videogamesApi = (await axios(urlApiSearch)).data.results
  }

  let videogamesApiMapped = videogamesApi.map(v => {
      return {
        id: v.id, 
        background_image: v.background_image, 
        name: v.name, 
        genres: v.genres.map(g => g)
      }
    })

  return videogamesApiMapped
  
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

async function getAllVideogames(name) {
  let vgApi = await getVideogamesFromApi(name)
  let vgDB = await getVideogamesFromDB()
  return vgApi.concat(vgDB)
}

async function getVideogames(req, res, next) {
  const { name } = req.query
  try {
    let videogames = await getAllVideogames(name)
    if (name) videogames = videogames.filter(v => v.name.toLowerCase().includes(name.toLowerCase()))
    if (!videogames.length) return res.send('Ningun juego encontrado')
    res.send(videogames)
  } catch (error) {
    next(error)
  } 
}

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
    res.send(`Videogame ${name} generado con exito`)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getVideogamesFromDB,
  getVideogames,
  postVideogame
}