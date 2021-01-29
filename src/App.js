import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Auth from './Components/Auth';
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Mynavbar';
import Products from './Components/Products';
import Details from './Components/Details';
import Users from './Components/Users';
import Buys from './Components/Buys';
import Status from './Components/Status';


function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Route exact strict path="/">
            <Auth/>
          </Route>
          <Route exact path="/dashboard">
            <Navbar/>
            <Dashboard/>
          </Route>
          <Route exact path="/products">
            <Navbar/>
            <Products/>
          </Route>
          <Route exact path="/details/:id">
            <Navbar/>
            <Details/>
          </Route>
          <Route exact path="/users">
            <Navbar/>
            <Users/>
          </Route>
          <Route exact path="/transactions">
            <Navbar/>
            <Buys/>
          </Route>
          <Route exact path="/status/:id">
            <Navbar/>
            <Status/>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
