import React from "react"
import {Link} from 'react-router-dom'
import '../styles/Landing.css'
 
function Landing() {
  return (
    <div className="background">
      <div>
        <h1>Bienvenidos!</h1>
        <Link to='/home'>
          <button>Ingresar</button>
        </Link>
      </div>
    </div>
  )
}
  
export default Landing
