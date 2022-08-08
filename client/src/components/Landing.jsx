import React from "react"
import {Link} from 'react-router-dom'
import '../styles/Landing.css'
 
function Landing() {
  return (
    <div className="background">
      <div>
        <h1>Welcome!</h1>
        <Link to='/home'>
          <button>Enter</button>
        </Link>
      </div>
    </div>
  )
}
  
export default Landing
