import { 
  GET_VIDEOGAMES,
  GET_VIDEOGAME_DETAIL,
  CREATE_VIDEOGAME
} from "./actions";

const initialState = {
  videogames: [],
  videogameDetail: {},
  genres: []
}

function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: payload
      }
    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        videogameDetail: payload
      }
    case CREATE_VIDEOGAME:
      return {
        ...state,
        videogames: [...state.videogames, payload]
      }
    default: return state
  }
}

export default reducer;