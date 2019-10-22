import React from 'react';
import logo from './logo.svg';
import Button from './components/Menu'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{ "-webkit-app-region": "drag" }}>
        <img src={logo} className="App-logo" alt="logo" />

        <p
          className="App-link"
        >
          工具
        </p>
      </header>
      <Button />
      <footer className="App-footer">{`${new Date().getDate()}`}</footer>
    </div>
  );
}

export default App;
