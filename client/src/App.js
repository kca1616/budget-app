import './App.css';
import { useState, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Register from "./components/Register";
import NewRecord from './screens/NewRecord';
import EditRecord from './screens/EditRecord';
import Records from './components/Records';
import Home from './screens/Home';

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <Nav user={user} setUser={setUser} />
      <Switch>
        <main>
          <Route exact path = "/">
            <Home />
          </Route>
          <Route path="/register">
            <Register setUser={setUser} />
          </Route>
          <Route path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route path="/new">
            <NewRecord />
          </Route>
          <Route path = '/edit'>
            <EditRecord />
          </Route>  
          <Route path="/records">
            <Records user={user} />
          </Route>
        </main>
        </Switch>
      
    </div>
  );
}

export default App;
