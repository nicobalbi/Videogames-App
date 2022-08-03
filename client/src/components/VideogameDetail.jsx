import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {getVideogameDetail} from '../redux/actions'

function VideogameDetail(props) {

  const dispatch = useDispatch()
  // const idVideogame = props.match?.params.id

  // useEffect(() => dispatch(getVideogameDetail(idVideogame)),[dispatch])
  useEffect(() => dispatch(getVideogameDetail(props.match.params.id)),[dispatch])

  const videogame = useSelector(state => state.videogameDetail)
  console.log(videogame)
  
  return (
    <div>
      {
        videogame.length > 0 ?
        <div>
          <h1>{videogame[0].name}</h1>
          <img src={videogame[0].background_image} alt={videogame[0].name} width='200px' height='250px'/>
          <p>
          {
            videogame[0].genres.map(g => {
              return (  
                <span>{`${g.name} | `}</span>
                )
              })
            }
            </p>
            {/* <p>{videogame[0].description}</p>
          <p>{`Released date: ${videogame[0].released}`}</p>
          <p>{`Rating: ${videogame[0].rating}`}</p>
          <p>
            {
              videogame[0].platforms.map(p => {
                return (
                  <span>{`${p.platform.name} | `}</span>
                  )
                })
              }
            </p> */}
        </div> : 
        <p>Loading...</p>
      }
      <Link to='/home'>
        <button>Volver</button>
      </Link>
    </div>
  )
}
  
export default VideogameDetail
