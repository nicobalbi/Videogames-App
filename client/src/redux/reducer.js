import { 
  GET_VIDEOGAMES,
  GET_VIDEOGAMES_STATE,
  FILTER_VIDEOGAMES,
  SORT_VIDEOGAMES,
  GET_VIDEOGAMES_NAME,
  GET_GENRES,
  CREATE_VIDEOGAME,
  GET_VIDEOGAME_DETAIL
} from "./actions";

const initialState = {
  videogames: [],
  videogamesAll: [],
  videogameDetail: [],
  genres: [],
}

function reducer(state = initialState, {type, payload}) {

  switch (type) {

    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: payload,
        videogamesAll: payload
      }

    case GET_VIDEOGAMES_STATE:
      return {
        ...state,
        videogames: state.videogamesAll,
      }

    case FILTER_VIDEOGAMES:
      let videogamesFiltered = state.videogamesAll
      if (payload.genre !== 'All') videogamesFiltered = videogamesFiltered.filter(v => v.genres.filter(g => g.name === payload.genre).length > 0)
      if (payload.created === 'Creados') videogamesFiltered = videogamesFiltered.filter(v => v.hasOwnProperty('createdInDb'))
      if (payload.created === 'Api') videogamesFiltered = videogamesFiltered.filter(v => !v.hasOwnProperty('createdInDb'))
      return {
        ...state,
        videogames: videogamesFiltered
      }
      
    case SORT_VIDEOGAMES:
      const videogamesSorted = (
        payload === 'Ascendente' ? state.videogames.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0) :
        state.videogames.sort((a, b) => a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
      )
      return {
        ...state,
        videogames: videogamesSorted
      }

    case GET_VIDEOGAMES_NAME:
      return {
        ...state,
        videogames: payload,
      }

    case GET_GENRES:
      return {
        ...state,
        genres: payload,
      }

    case CREATE_VIDEOGAME:
      return {
        ...state
      }

    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        videogameDetail: payload
      }

    default: return state

  }
}

export default reducer;