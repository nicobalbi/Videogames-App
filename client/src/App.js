import './App.css';
import {Route, Switch} from 'react-router-dom'
import Landing from './components/Landing'
import Home from './components/Home'
import VideogameDetail from './components/VideogameDetail'
import CreateVideogame from './components/CreateVideogame'
import DeadLink from './components/DeadLink'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/home' component={Home} />
        <Route path='/create' component={CreateVideogame} />
        <Route path='/home/:id' component={VideogameDetail} />
        <Route component={DeadLink} />
      </Switch>
    </div>
  );
}

export default App;
