import './App.css';
import {Route, Switch} from 'react-router-dom'
// import NavBar from './components/NavBar'
import Landing from './components/Landing'
import Home from './components/Home'
import VideogameDetail from './components/VideogameDetail'
import CreateVideogame from './components/CreateVideogame'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/home' component={Home} />
        <Route path='/videogame' component={CreateVideogame} />
        <Route path='/home/:id' component={VideogameDetail} />
      </Switch>
    </div>
  );
}

export default App;
