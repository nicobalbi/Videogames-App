import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getVideogameDetail} from '../redux/actions'

function VideogameDetail(props) {

  // const idVideogame = props.match?.params.id
  // const videogame = useSelector(state => state.videogameDetail)
  // const dispatch = useDispatch()

  // useEffect(() => {
  //     dispatch(getVideogameDetail(idVideogame))
  // })

  return (
    <div>
      <p>Detail</p>
      {/* <p>{videogame.name}</p>
      <img src={videogame.background_image} alt={videogame.name} /> */}
      {/* <p>
        {
        videogame.genres.map(g => {
            return (
              <span>{`${g.name} | `}</span>
            )
          })
        }
      </p> */}
      {/* <p>{videogame.description}</p>
      <p>{`Released date: ${videogame.released}`}</p>
      <p>{`Rating: ${videogame.rating}`}</p> */}
      {/* <p>
        {
        videogame.platforms.map(p => {
            return (
              <span>{`${p.platform.name} | `}</span>
            )
          })
        }
      </p> */}
    </div>
  )
}
  
export default VideogameDetail
