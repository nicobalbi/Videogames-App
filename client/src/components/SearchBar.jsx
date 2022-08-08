import React from "react"
import {useDispatch, useSelector} from 'react-redux'
import {getVideogamesSearched, setSearchValue, setPageNumber, setVideogamesSearched, setLastSearch} from '../redux/actions'


function SearchBar() {

  const searchValue = useSelector(state => state.searchValue)
  
  const dispatch = useDispatch()
  
  const handleInputChange = e => {
    e.preventDefault()
    dispatch(setSearchValue(e.target.value))
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(setVideogamesSearched([]))
    dispatch(getVideogamesSearched(searchValue))
    dispatch(setPageNumber(1))
    dispatch(setLastSearch(searchValue))
    dispatch(setSearchValue(''))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Buscar...' value={searchValue} onChange={handleInputChange} />
        <button type='submit'>Buscar</button>
      </form>
    </div>
  )
}

export default SearchBar