import React from "react"
import imgDeadLink from '../images/among.jpg'

function DeadLink() {
  return (
    <div>
      <h2>Oh no! It looks like you found a dead link</h2>
      <img src={imgDeadLink} alt='Dead link'/> 
    </div>
  )
}
  
export default DeadLink