import axios from 'axios'

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'
export const GET_VIDEOGAMES_STATE = 'GET_VIDEOGAMES_STATE'
export const FILTER_VIDEOGAMES = 'FILTER_VIDEOGAMES'
export const SORT_VIDEOGAMES = 'SORT_VIDEOGAMES'
export const GET_VIDEOGAMES_NAME = 'GET_VIDEOGAMES_NAME'
export const GET_GENRES = 'GET_GENRES'
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME'
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL'

export function getAllVideogames() {
  return (dispatch) => {
    return axios('http://localhost:3001/videogames')
    .then(res => dispatch({type: GET_VIDEOGAMES, payload: res.data}))
    .catch(error => console.log(error))
  }
}

export function createVideogame(values) {
  return {
    type: CREATE_VIDEOGAME,
    payload: values
  }
}

export function filterVideogames(filters) {
  return {
    type: FILTER_VIDEOGAMES,
    payload: filters
  }
}

export function sortVideogames(sort) {
  return {
    type: SORT_VIDEOGAMES,
    payload: sort
  }
}

export function getVideogamesByName(name) {
  return async (dispatch) => {
    try {   
      let videogames = await axios(`http://localhost:3001/videogames?name=${name}`)
      return dispatch({type: GET_VIDEOGAMES_NAME, payload: videogames.data})
    } catch (error) {
      console.log(error)
    }
  }
} 

export function getGenres() {
  return (dispatch) => {
    return axios('http://localhost:3001/genres')
    .then(res => dispatch({type: GET_GENRES, payload: res.data}))
    .catch(error => console.log(error))
  }
}

export function postVideogame(values) {
  return (dispatch) => {
    return axios.post('http://localhost:3001/videogames', values)
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }
}

export function getVideogameDetail(id) {
  return (dispatch) => {
    return axios(`http://localhost:3001/videogame/${id}`)
    .then(res => dispatch({type: GET_VIDEOGAME_DETAIL, payload: res.data}))
    .catch(error => console.log(error))
  }
}