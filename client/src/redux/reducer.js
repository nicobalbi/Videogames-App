const initialState = {
  videogames: [],
  genres: []
}

function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case 'GET_VIDEOGAMES':
      return {
        ...state,
        videogames: payload
      }
    default: return state
  }
}

export default reducer;