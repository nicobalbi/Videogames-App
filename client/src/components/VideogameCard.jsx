import React from "react"
import { Link } from 'react-router-dom';
import imgDefault from '../images/mushroom.jpg'

function VideogameCard({id, name, image, rating, genres, platforms}) {
  
  return (
    <div key={id}>
      <Link to={`/home/${id}`}>
        <h2>{name}</h2>
      </Link>
      {image ? <img src={image} alt={name} width='300px' height='250px'/> : <img src={imgDefault} alt={name} width='300px' height='250px'/>}
      <div>{rating}</div>
      <div>
        {
          genres.map(g => {
            return (
              <span key={g.name}>{`${g.name} | `}</span>
              )
            })
        }
      </div>
      <div>
        {
          platforms.split(',').map(p => {
            return (
              <span key={p}>{`${p} | `}</span>
              )
            })
        }
      </div>
    </div>
  )
}

export default VideogameCard