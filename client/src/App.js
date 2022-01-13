import './App.css';
import { useState, useEffect } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Register from "./components/Register";
import NewRecord from './screens/NewRecord';
import EditRecord from './screens/EditRecord';
import Records from './components/Records';
import Home from './screens/Home';
import Wishlist from './screens/Wishlist';
import Marketplace from './components/Marketplace';
import Listing from "./components/Listing";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setUser(foundUser);
    }
  }, []);
  return (
    <div className="App">
      <h1><Link to="/" className="navItem">First Press</Link></h1>
      <Nav user={user} setUser={setUser} />
      <Switch>
        <main>
          <Route exact path="/">
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
          <Route path="/wishlist">
            <Wishlist user={user} />
          </Route>
          <Route path='/edit'>
            <EditRecord />
          </Route>
          <Route path="/records">
            <Records user={user} />
          </Route>
          <Route path="/listing">
            <Listing />
          </Route>
          <Route path="/marketplace">
            <Marketplace user={user} />
          </Route>
        </main>
      </Switch>

    </div>
  );
}

export default App;
