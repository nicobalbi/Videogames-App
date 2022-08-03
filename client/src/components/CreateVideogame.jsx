import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {postVideogame, getGenres} from '../redux/actions'

function validate(input) {
  let errors = {}
  if (!input.name) {
    errors.name = 'Se requiere un nombre'
  } else if (!input.description) {
    errors.description = 'Se requiere una descripcion'
  }
  return errors
} 

function CreateVideogame() {
  
  const dispatch = useDispatch()
  const history = useHistory()
  const genres = useSelector(state => state.genres)
  const [errors, setErrors] = useState({})

  const [input, setInput] = useState({
    name: '',
    description: '',
    release: '',
    rating: '',
    genres:[],
    platforms:''
  })

  useEffect(() => dispatch(getGenres()),[dispatch])

  const handleInputChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  const handleSelect = e => {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value]
    })
  }

  const handleDelete = name => {
    setInput({
      ...input,
      genres: input.genres.filter(g => g !== name) 
    })
  }

   const handleSubmit = e => {
      e.preventDefault()
      dispatch(postVideogame(input))
      alert('Videojuego creado!')
      setInput({
        name: '',
        description: '',
        release: '',
        rating: '',
        genres:[],
        platforms:[]
      })
      history.push('/home')
  }

  return (
    <div>
      <Link to='/home'><button>Volver</button></Link>
      <h1>Crea tu videojuego!</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>Name: </label>
          <input type='text' value={input.name} name='name' onChange={e => handleInputChange(e)} />
          {errors.name && (
            <p className='error'>{errors.name}</p>
          )}
        </div>
        <div>
          <label>Description: </label>
          <textarea type='text' value={input.description} name='description' onChange={e => handleInputChange(e)} />
        </div>
        <div>
          <label>Release: </label>
          <input type='text' value={input.release} name='release' onChange={e => handleInputChange(e)} />
        </div>
        <div>
          <label>Rating: </label>
          <input type='text' value={input.rating} name='rating' onChange={e => handleInputChange(e)} />
        </div>
        <select onChange={e => handleSelect(e)}>
          {
            genres.map(g => {
              return (
                <option value={g.name}>{g.name}</option>
              )
            })
          }
        </select>
        {/* <ul><li>{input.genres.map(g => `${g} ,`)}</li></ul> */}
        <br/>
        <div>
          <button type='submit'>Create Videogame</button>
        </div>
      </form>
      {input.genres.map(g => {
        return (
          <div className='divGenre'>
            <p>{g}</p>
            <button className='botonX' onClick={() => handleDelete(g)}>X</button> 
          </div>
        )
      })}
    </div>
  )
}
  
export default CreateVideogame
