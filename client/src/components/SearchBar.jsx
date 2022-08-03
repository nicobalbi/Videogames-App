import React from "react"
import {useDispatch} from 'react-redux'
import {getVideogamesByName} from '../redux/actions'


function SearchBar({name, named, paginate}) {

  const dispatch = useDispatch()
  
  const handleInputChange = e => {
    e.preventDefault()
    named(e.target.value)
    console.log(name)
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(getVideogamesByName(name))
    paginate(1)
  }

  return (
    <div>
      <input type='text' placeholder='Buscar...' value={name} onChange={e => handleInputChange(e)} />
      <button type='submit' onClick={e => handleSubmit(e)}>Buscar</button>
    </div>
  )
}

export default SearchBar