import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllVideogames} from '../redux/actions'

function Home() {
  
  const dispatch = useDispatch()
  const videogames = useSelector(state => state.videogames)

  useEffect(() => {
    dispatch(getAllVideogames())
  },[dispatch])

  return (
    <div>
      {
        videogames && videogames.map(e => {
          return (
            <div key={e.id}>
              <h1>{e.name}</h1>
              <img src={e.background_image} alt={e.name} />
            </div>
        )
        })
      }
    </div>
  )
}

export default Home