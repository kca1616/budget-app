import './App.css';
import { useState, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Register from "./components/Register";
import NewRecord from './components/NewRecord';
import Records from './components/Records';
import { getAllRecords } from './services';
function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <Nav user={user} setUser={setUser} />
      <Switch>
        <main>
          <Route path="/register">
            <Register setUser={setUser} />
          </Route>
          <Route path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route path="/new">
            <NewRecord />
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
