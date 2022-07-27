import './App.css';
import {Route, Switch} from 'react-router-dom'
import NavBar from './components/NavBar'
import Landing from './components/Landing'
import Home from './components/Home'
import VideogameDetail from './components/VideogameDetail'
import CreateVideogame from './components/CreateVideogame'

function App() {
  return (
    <div className="App">
      <Route path='/' component={NavBar} />
      <Route exact path='/' component={Landing} />
      <Route exact path='/videogames' component={Home} />
      <Route exact path='/videogame/:id' component={VideogameDetail} />
      <Route exact path='/videogames/create' component={CreateVideogame} />
    </div>
  );
}

export default App;
