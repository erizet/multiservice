import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  
  const [text, setText] = useState("< No data loaded yet! >");

  const download = () => {
    fetch('https://localhost:5000/weatherforecast')
    .then(response => response.json())
    .then(json => setText(JSON.stringify(json)))
    .catch(e => setText(e));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Ändra <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <p>
          {text}
          </p>
          <button onClick={download}>Fetch data</button>
        </div>
      </header>
    </div>
  );
}

export default App;


