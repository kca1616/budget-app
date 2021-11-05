import logo from './logo.svg';
import './App.css';
import Login from "./components/Login";
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <Login setUser={setUser} />
    </div>
  );
}

export default App;
