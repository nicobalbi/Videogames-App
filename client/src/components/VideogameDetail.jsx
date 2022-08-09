import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {getVideogameDetail, setVideogameDetail} from '../redux/actions'
import Parser from 'html-react-parser'
import imgNotFound from '../images/ghost.webp'
import gifLoading from '../images/pacman.gif'

function VideogameDetail(props) {

  const dispatch = useDispatch()

  useEffect(() => loadVideogameDetail(),[dispatch])      // eslint-disable-line react-hooks/exhaustive-deps

  const loadVideogameDetail = () => {
    dispatch(setVideogameDetail([]))
    dispatch(getVideogameDetail(props.match.params.id))
  }

  const videogameDetail = useSelector(state => state.videogameDetail)
  
  return (
    <div>
      {
        typeof videogameDetail === 'string' ? 
        
        <div>
          <h2>Oh no! It looks like this videogame's link doesn't exist</h2>
          <img src={imgNotFound} alt='Not found'/> 
        </div> :

        videogameDetail.length === 0 || videogameDetail[0].id.toString() !== props.match.params.id ?

        <div>
          <span>Loading</span>
          <img src={gifLoading} alt='Loading'/> 
        </div> :

        <div>
          <h1>{videogameDetail[0].name}</h1>
          <img src={videogameDetail[0].image} alt={videogameDetail[0].name} width='300px' height='250px'/>
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
          <Link to='/home'>
            <button>Back to home</button>
          </Link>
        </div>
      }
    </div>
  )
}
  
export default VideogameDetail
