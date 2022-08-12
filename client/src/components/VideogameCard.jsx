import React from "react"
import { Link } from 'react-router-dom';
import imgDefault from '../images/mushroom.jpg'
import '../styles/VideogameCard.css'

function VideogameCard({id, name, image, rating, genres, platforms}) {
  
  return (
    <div className='card' key={id}>
      <Link to={`/home/${id}`}>
        <div className="cardNameContainer">
          <span className="cardName">{name}</span>
        </div>
        {/* <div className="cardImageContainer"> */}
          {image ? <img className="cardImage" src={image} alt={name} /> : <img className="cardImage" src={imgDefault} alt={name} width='300px' height='250px'/>}
        {/* </div> */}
        <div className="rating">{rating}</div>
        <div className="genreContainer">
          {
            genres.map((g, i) => {
              return (
                <span className='genre' key={g.name}>{g.name}</span>
                )
              })
            }
        </div>
      </Link>
    </div>
  )
}

export default VideogameCard