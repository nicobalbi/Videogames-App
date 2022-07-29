import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllVideogames} from '../redux/actions'
import VideogameCard from './VideogameCard'
import vgImage from '../images/videogames.jpg'

function Home() {
  
  const dispatch = useDispatch()
  const videogames = useSelector(state => state.videogames)

  useEffect(() => {
    dispatch(getAllVideogames())
  },[dispatch])

  return (
    <div>
      <h1>Videogames App</h1>
      {/* <img src={vgImage} alt='vg-img' /> */}
      {
        videogames && videogames.map(e => {
          return (
            <VideogameCard id={e.id} name={e.name} image={e.background_image} genres={e.genres} />
          )
        })
      }
    </div>
  )
}

export default Home