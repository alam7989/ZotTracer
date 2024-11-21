import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id='display'>
          <div id='left'>
            <h1>Choose your shape!</h1>
            <Button variant="contained"/>
            <p>test option 2</p>
          </div>
          <div id='drawing_area'>
            <p>Score:</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
