import axios from 'axios'

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL'
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME'

export function getAllVideogames() {
  return (dispatch) => {
    return axios('http://localhost:3001/videogames/')
    .then(res => dispatch({type: GET_VIDEOGAMES, payload: res.data}))
  }
}

export function getVideogameDetail(id) {
  return (dispatch) => {
    return axios(`http://localhost:3001/videogame/${id}`)
    .then(res => dispatch({type: GET_VIDEOGAME_DETAIL, payload: res.data}))
  }
}

export function createVideogame(values) {
  return {
    type: CREATE_VIDEOGAME,
    payload: values
  }
}