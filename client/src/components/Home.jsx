import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllVideogames, filterVideogames, sortVideogames, getGenres} from '../redux/actions'
import {Link} from 'react-router-dom'
import VideogameCard from './VideogameCard'
// import vgImage from '../images/videogames.jpg'
import Paginate from './Paginate'
import SearchBar from './SearchBar'

function Home() {
  
  const dispatch = useDispatch()
  const videogames = useSelector(state => state.videogames)
  const genres = useSelector(state => state.genres)

  const [orden, setOrden] = useState('')
  const [name, setName] = useState('')
  const [filters, setFilters] = useState({genre: 'All', created: 'All'})

  const [currentPage, setCurrentPage] = useState(1)
  const [videogamesPerPage, setVideogamesPerPage] = useState(15)
  const positionOfLastVideogame = currentPage * videogamesPerPage
  const indexOfFirstVideogame = positionOfLastVideogame - videogamesPerPage
  const currentVideogames = videogames.slice(indexOfFirstVideogame, positionOfLastVideogame)

  const paginate = pageNumber => {
    setCurrentPage(pageNumber)
  }

  const named = name => {
    setName(name)
  }

  useEffect(() => dispatch(getAllVideogames()),[dispatch])
  useEffect(() => dispatch(getGenres()),[dispatch])
  useEffect(() => dispatch(filterVideogames(filters)),[filters])

  const handleReload = e => {
    e.preventDefault()
    setCurrentPage(1)
    document.getElementById("filterGenre").value = "All"
    document.getElementById("filterCreated").value = "All"
    setName('')
  }

  const handleFilterGenre = e => {
    e.preventDefault()
    setFilters({...filters, genre: e.target.value})
    setCurrentPage(1)
  }
  
  const handleFilterCreated = e => {
    e.preventDefault()
    setFilters({...filters, created: e.target.value})
    setCurrentPage(1)
  }

  const handleSort = e => {
    e.preventDefault()
    dispatch(sortVideogames(e.target.value))
    setCurrentPage(1)
    setOrden(e.target.value)
  }

  return (
    <div>

      <Link to='/videogame'>Crear Videojuego</Link>

      <h1>Videogames App</h1>

      <button onClick={e => {handleReload(e)}}>Volver a cargar todos los videojuegos</button>

      <div>

        <select onChange={e => {handleSort(e)}}>
          <option value='Ascendente'>Ascendente</option>
          <option value='Descendente'>Descendente</option>
        </select>

        <select onChange={e => handleFilterGenre(e)} id='filterGenre'>
        <option value='All'>All</option>
          {
            genres.map(g => {
              return (
                <option value={g.name}>{g.name}</option>
              )
            })
          }
        </select>

        <select onChange={e => {handleFilterCreated(e)}} id='filterCreated'>
          <option value='All'>All</option>
          <option value='Creados'>Creados</option>
          <option value='Api'>Api</option>
        </select> 

        <Paginate videogamesPerPage={videogamesPerPage} videogamesCount={videogames.length} paginate={paginate} />

        <SearchBar name={name} named={named} paginate={paginate} />

      </div>

      {
        currentVideogames?.map(e => {
          return (
            <VideogameCard id={e.id} name={e.name} image={e.background_image} genres={e.genres} />
          )
        })
      }

    </div>
  )
}

export default Home