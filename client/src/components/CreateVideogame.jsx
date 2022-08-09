import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {postVideogame, getGenres, setVideogamesAll} from '../redux/actions'


function CreateVideogame() {
  
  const dispatch = useDispatch()
  const history = useHistory()
  const initialMount = useRef(true)
  const genres = useSelector(state => state.genres)
  const [errors, setErrors] = useState({})
  const [enabled, setEnabled] = useState(false)
  
  const [input, setInput] = useState({
    name: '',
    description: '',
    image: '',
    released: '',
    rating: '',
    genres: [],
    platforms: ''
  })
  
  useEffect(() => loadCreateData(), [dispatch])     // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => validateInput(), [input])         // eslint-disable-line react-hooks/exhaustive-deps

  const loadCreateData = () => {
    if (genres.length === 0) dispatch(getGenres())
  }
  
  function validateInput() {
    if (initialMount.current) return initialMount.current = false
    let newErrors = {}
    if (!input.name) newErrors.name = 'Please add a name to your videogame'
    if (!input.description) newErrors.description = 'Please add a description to your videogame'
    let valReleased = isValidDate(input.released)
    if (valReleased !== true) newErrors.released = valReleased
    if (input.rating < 0 || input.rating > 5) newErrors.rating = 'Rating must be a number between 0 and 5'
    if (input.genres.length === 0) newErrors.genres = 'Please add at least one genre to your videogame'
    if (!input.platforms) newErrors.platforms = 'Please add at least one platform to your videogame'
    if (Object.keys(newErrors).length === 0) setEnabled(true)
    else setEnabled(false)
    setErrors(newErrors)
  } 

  function isValidDate(dateString) {
    if (dateString !== '') {
      var regEx = /^\d{4}-\d{2}-\d{2}$/
      if(!dateString.match(regEx)) return 'Released date must be in format yyyy-mm-dd'
      var d = new Date(dateString)
      var dNum = d.getTime()
      if(!dNum && dNum !== 0) return 'Please add a valid date'
    }
    return true
  }

  const handleInputChange = e => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const handleSelectGenre = e => {
    if (e.target.value !== 'none') setInput({...input, genres: [...input.genres, e.target.value]}) 
  }

  const handleSelectPlatform = e => {
    if (e.target.value !== 'none') setInput({...input, platforms: input.platforms.length > 0 ? input.platforms.concat(`,${e.target.value}`) : e.target.value})
  }

  const handleDeleteGenre = name => {
    setInput({...input, genres: input.genres.filter(g => g !== name)})
  }

  const handleDeletePlatform = name => {
    setInput({...input, platforms: input.platforms.split(',').filter(p => p !== name).join()})
  }

   const handleSubmit = e => {
      e.preventDefault()
      if (!enabled) {
        if (Object.keys(errors).length === 0) {
          return alert(`Please complete the form first with your videogame data`)
        } else {
          for (const err in errors) {
            return alert(errors[err])
          }
        }
      }
      dispatch(postVideogame(input))
      dispatch(setVideogamesAll([]))
      alert(`Videogame ${input.name} created!`)
      setInput({
        name: '',
        description: '',
        image: '',
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

      <form onSubmit={handleSubmit}>

        <div>
          <label>Name: </label>
          <input type='text' value={input.name} name='name' onChange={handleInputChange} />
          {errors.name && <p className='error'>{errors.name}</p>}
        </div>

        <div>
          <label>Description: </label>
          <textarea type='text' value={input.description} name='description' onChange={handleInputChange} />
          {errors.description && <p className='error'>{errors.description}</p>}
        </div>

        <div>
          <label>Image URL: </label>
          <input type='text' value={input.image} name='image' onChange={handleInputChange} />
        </div>

        <div>
          <label>Released date: </label>
          <input type='text' value={input.released} name='released' onChange={handleInputChange} />
          {errors.released && <p className='error'>{errors.released}</p>}
        </div>

        <div>
          <label>Rating: </label>
          <input type='text' value={input.rating} name='rating' onChange={handleInputChange} />
          {errors.rating && <p className='error'>{errors.rating}</p>}
        </div>

        <select onChange={handleSelectGenre}>
          <option value='none'>Select genres</option>
          {
            genres.map(g => {
              return (
                <option value={g.name} key={g.name}>{g.name}</option>
                )
              })
            }
        </select>
        {errors.genres && <p className='error'>{errors.genres}</p>}

        <select onChange={handleSelectPlatform}>
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
        {errors.platforms && <p className='error'>{errors.platforms}</p>}

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
