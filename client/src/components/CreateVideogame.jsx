import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {postVideogame, getGenres} from '../redux/actions'


function CreateVideogame() {
  
  const dispatch = useDispatch()
  const history = useHistory()
  const genres = useSelector(state => state.genres)
  const [errors, setErrors] = useState({})
  
  const [input, setInput] = useState({
    name: '',
    description: '',
    released: '',
    rating: '',
    genres: [],
    platforms: ''
  })
  
  useEffect(() => loadCreateData(), [dispatch])     // eslint-disable-line react-hooks/exhaustive-deps

  const loadCreateData = () => {
    if (genres.length === 0) dispatch(getGenres())
  }
  
  function validate(input) {
    let errors = {}
    if (!input.name) errors.name = 'Se requiere un nombre'
    else if (!input.description) errors.description = 'Se requiere una descripcion'
    return errors
  } 

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

  const handleSelectGenre = e => {
    if (e.target.value !== 'none') {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value]
      })
    }
  }

  const handleSelectPlatform = e => {
    if (e.target.value !== 'none') {
      setInput({
        ...input,
        platforms: input.platforms.length > 0 ? input.platforms.concat(`,${e.target.value}`) : e.target.value
      })
    }
  }

  const handleDeleteGenre = name => {
    setInput({
      ...input,
      genres: input.genres.filter(g => g !== name) 
    })
  }

  const handleDeletePlatform = name => {
    setInput({
      ...input,
      platforms: input.platforms.split(',').filter(p => p !== name).join() 
    })
  }

   const handleSubmit = e => {
      e.preventDefault()
      dispatch(postVideogame(input))
      alert(`Videogame ${input.name} created!`)
      setInput({
        name: '',
        description: '',
        released: '',
        rating: '',
        genres:[],
        platforms:''
      })
      history.push('/home')
  }

  return (
    <div>

      <Link to='/home'><button>Back to home</button></Link>

      <h1>Create your videogame!</h1>

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
          <label>Released date: </label>
          <input type='text' value={input.released} name='released' onChange={e => handleInputChange(e)} />
        </div>

        <div>
          <label>Rating: </label>
          <input type='text' value={input.rating} name='rating' onChange={e => handleInputChange(e)} />
        </div>

        <select onChange={e => handleSelectGenre(e)}>
          <option value='none'>Select genres</option>
          {
            genres.map(g => {
              return (
                <option value={g.name} key={g.name}>{g.name}</option>
              )
            })
          }
        </select>

        <select onChange={e => handleSelectPlatform(e)}>
          <option value='none'>Select platforms</option>
          <option value='Android'>Android</option>
          <option value='Game Boy'>Game Boy</option>
          <option value='GameCube'>GameCube</option>
          <option value='iOS'>iOS</option>
          <option value='macOS'>macOS</option>
          <option value='Nintendo 64'>Nintendo 64</option>
          <option value='Nintendo DS'>Nintendo DS</option>
          <option value='Nintendo Switch'>Nintendo Switch</option>
          <option value='PC'>PC</option>
          <option value='PlayStation'>PlayStation</option>
          <option value='PlayStation 2'>PlayStation 2</option>
          <option value='PlayStation 3'>PlayStation 3</option>
          <option value='PlayStation 4'>PlayStation 4</option>
          <option value='PlayStation 5'>PlayStation 5</option>
          <option value='PSP'>PSP</option>
          <option value='SEGA Saturn'>SEGA Saturn</option>
          <option value='Wii'>Wii</option>
          <option value='Xbox 360'>Xbox 360</option>
          <option value='Xbox One'>Xbox One</option>
        </select>

        <br/>

        <div>
          <button type='submit'>Create Videogame</button>
        </div>

      </form>
      
      <div>
        <h4>Selected genres</h4>
        {input.genres.map(g => {
          return (
            <div className='divGenre' key={g}>
              <p>{g}</p>
              <button className='botonX' onClick={() => handleDeleteGenre(g)}>X</button> 
            </div>
          )
        })}
      </div>

      <div>
        <h4>Selected platforms</h4>
        {input.platforms && input.platforms.split(',').map(p => {
          return (
            <div className='divPlatform' key={p}>
              <p>{p}</p>
              <button className='botonX' onClick={() => handleDeletePlatform(p)}>X</button> 
            </div>
          )
        })}
      </div>

    </div>
  )
}
  
export default CreateVideogame
