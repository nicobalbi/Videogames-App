import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllVideogames} from '../redux/actions'
import {Link} from 'react-router-dom'
import VideogameCard from './VideogameCard'
// import vgImage from '../images/videogames.jpg'
import Paginate from './Paginate'

function Home() {
  
  const dispatch = useDispatch()
  const videogames = useSelector(state => state.videogames)
  const [currentPage, setCurrentPage] = useState(1)
  const [videogamesPerPage, setVideogamesPerPage] = useState(15)
  const positionOfLastVideogame = currentPage * videogamesPerPage
  const indexOfFirstVideogame = positionOfLastVideogame - videogamesPerPage
  const currentVideogames = videogames.slice(indexOfFirstVideogame, positionOfLastVideogame)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getAllVideogames())
  },[dispatch])

  function handleClick(e) {
    e.preventDefault()
    dispatch(getAllVideogames())
  }

  return (
    <div>
      <Link to='/videogame'>Crear Videojuego</Link>
      <h1>Videogames App</h1>
      <button onClick={e => {handleClick(e)}}>Volver a cargar todos los videojuegos</button>
      {/* <img src={vgImage} alt='vg-img' /> */}
      <div>
        <select>
          <option value='asc'>Ascendente</option>
          <option value='desc'>Descendente</option>
        </select>
        <select>
          <option value='Todos'>Todos</option>
          <option value='Creados'>Creados</option>
          <option value='Api'>Api</option>
        </select> 
        <Paginate
          videogamesPerPage={videogamesPerPage}
          videogamesCount={videogames.length}
          paginate={paginate}
        />
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