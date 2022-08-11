import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {getVideogameDetail} from '../redux/actions'
import Parser from 'html-react-parser'
import imgNotFound from '../images/ghost.png'
import gifLoading from '../images/pacman.gif'
import '../styles/VideogameDetail.css'

function VideogameDetail(props) {

  const dispatch = useDispatch()

  const videogameDetail = useSelector(state => state.videogameDetail)
  
  useEffect(() => loadVideogameDetail(),[dispatch])      // eslint-disable-line react-hooks/exhaustive-deps

  const loadVideogameDetail = () => {
    if (videogameDetail.length === 0 || typeof videogameDetail === 'string' || videogameDetail[0].id.toString() !== props.match.params.id) dispatch(getVideogameDetail(props.match.params.id))
  }
  
  return (
    
    <div className='detailContainer'>
          
      {
        videogameDetail.length === 0 || (typeof videogameDetail !== 'string' && videogameDetail[0].id.toString() !== props.match.params.id) ?

        <div className='loadingDetail'>
          <img className='gifLoadingDetail' src={gifLoading} alt='Loading'/> 
        </div> :

        <div>

          <Link to='/home'>
            <div className='btnHome'>Back to home</div>
          </Link>

          {
            typeof videogameDetail === 'string' ? 
            
            <div className='deadLink'>
              <h1 className='deadLinkTitle'>Oh no! It looks like this<br></br>videogame's link doesn't exist</h1>
              <img className='deadLinkImage' src={imgNotFound} alt='Not found'/> 
            </div> :

            <div>

              <h1 className='titleDetail'>{videogameDetail[0].name}</h1>
              
              <div className='dataContainer'>

                <div className='imgDetailContainer'>
                  <img className='imgDetail' src={videogameDetail[0].image} alt={videogameDetail[0].name} width='300px' height='250px'/>
                </div>
                
                <div className='descriptionContainer'>
                  <h3 className='descriptionTitle'>Description</h3>
                  <div className='description'>{Parser(videogameDetail[0].description)}</div>
                </div>

              </div>

              <div className='otherDetails'>
                
                <div>
                  <h3 className='dataTitle'>Released date</h3>
                  <div className='data'>{videogameDetail[0].released}</div>
                </div>
                
                <div>
                  <h3 className='dataTitle'>Rating</h3>
                  <div className='data'>{videogameDetail[0].rating}</div>
                </div>

                <div>
                  <h3 className='dataTitle'>Genres</h3>
                  <div>
                    {
                      videogameDetail[0].genres.map(g => {
                        return (  
                          <span className='groups' key={g.name}>{g.name}</span>
                          )
                        }
                        )
                      }
                  </div>
                </div>
                
                <div>
                  <h3 className='dataTitle'>Platforms</h3>
                  <div>
                    {
                      videogameDetail[0].platforms.split(',').map(p => {
                        return (
                          <span className='groups' key={p}>{p}</span>
                          )
                        }
                        )
                      }
                  </div>
                </div>

              </div>

            </div>
          }

        </div>
      }
    </div>
  )
}

export default VideogameDetail
