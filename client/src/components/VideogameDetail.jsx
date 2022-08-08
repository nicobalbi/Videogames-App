import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {getVideogameDetail} from '../redux/actions'
import Parser from 'html-react-parser'

function VideogameDetail(props) {

  const dispatch = useDispatch()

  useEffect(() => dispatch(getVideogameDetail(props.match.params.id)),[dispatch, props.match.params.id])

  const videogameDetail = useSelector(state => state.videogameDetail)
  
  return (
    <div>
      {
        videogameDetail.length > 0 && videogameDetail[0].id.toString() === props.match.params.id ?
        <div>
          <h1>{videogameDetail[0].name}</h1>
          <img src={videogameDetail[0].background_image} alt={videogameDetail[0].name} width='300px' height='250px'/>
          {Parser(videogameDetail[0].description)}
          <p>{`Released date: ${videogameDetail[0].released}`}</p>
          <p>{`Rating: ${videogameDetail[0].rating}`}</p>
          <p>
            {
              videogameDetail[0].genres.map(g => {
                return (  
                  <span key={g.name}>{`${g.name} | `}</span>
                  )
                }
              )
            }
          </p>
          <p>
            {
              videogameDetail[0].platforms.split(',').map(p => {
                return (
                  <span key={p}>{`${p} | `}</span>
                  )
                }
              )
            }
          </p>
        </div> : 
        <p>Loading...</p>
      }
      <Link to='/home'>
        <button>Back to home</button>
      </Link>
    </div>
  )
}
  
export default VideogameDetail
