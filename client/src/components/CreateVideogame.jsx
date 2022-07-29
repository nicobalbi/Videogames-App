import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createVideogame} from '../redux/actions'

function CreateVideogame() {

  const [input, setInput] = useState({
    name: '',
    description: '',
    release: '',
    rating: ''
  })

  const handleInputChange = function(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const dispatch = useDispatch()

   const handleSubmit = function(e) {
      e.preventDefault()
      dispatch(createVideogame(input))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name: </label>
      <input name='name' onChange={handleInputChange} />
      <label>Description: </label>
      <textarea name='description' onChange={handleInputChange} />
      <label>Release: </label>
      <input name='release' onChange={handleInputChange} />
      <label>Rating: </label>
      <input name='rating' onChange={handleInputChange} />
      <button type='submit'>Create Videogame</button>
    </form>
  )
}
  
export default CreateVideogame
