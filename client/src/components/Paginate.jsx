import React from "react"

function Paginate({videogamesPerPage, videogamesCount, paginate}) {
  
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(videogamesCount/videogamesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul>
        { pageNumbers?.map(num => {
          return (
            <li className="num" key={num}>
              <a onClick={() => paginate(num)}>{num}</a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Paginate