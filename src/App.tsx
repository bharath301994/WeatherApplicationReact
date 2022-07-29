import React from 'react';
import logo from './logo.svg';
import './App.css';
import CountryComponent from './Components/Country/country';

function App() {
  return (
    <div style={{ minWidth: '100vw', minHeight: '100vh' }} className='App'>
      <CountryComponent/>
    </div>
  );
}

export default App;
