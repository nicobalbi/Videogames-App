import React from "react"
import { Link } from 'react-router-dom';

function VideogameCard({id, name, image, genres}) {
  
  return (
    <div key={id}>
      <Link to={`/home/${id}`}>
        <h2>{name}</h2>
      </Link>
      <img src={image} alt={name} width='200px' height='250px'/>
      <p>
        {
          genres.map(g => {
            return (
              <span>{`${g.name} | `}</span>
              )
            })
        }
      </p>
    </div>
  )
}

export default VideogameCard