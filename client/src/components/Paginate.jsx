import React from "react"
import {useDispatch, useSelector} from 'react-redux'
import '../styles/Paginate.css'
import {setPageNumber} from '../redux/actions'

function Paginate() {
  
  const videogamesRendered = useSelector(state => state.videogamesRendered)
  const videogamesPerPage = useSelector(state => state.videogamesPerPage)

  const dispatch = useDispatch()

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(videogamesRendered.length/videogamesPerPage); i++) {
    pageNumbers.push(i)
  }

  const handlePaginate = num => {
    dispatch(setPageNumber(num))
  }

  return (
    <nav>
      <ul className="paginate">
        { pageNumbers?.map(num => {
          return (
            <li className="num" key={num} onClick={() => handlePaginate(num)}>
              <span>{num}</span>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Paginate