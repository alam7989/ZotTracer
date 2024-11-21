import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@mui/material'
import ExcalidrawComponent from './components/Excalidraw'


function App() {
  const [count, setCount] = useState(0)
  const [shape, setShape] = useState('circle');

  return (
      <div id='display'>
        <h1>ZotTracer</h1>
        <div id='top'>
          <div id='left'>
            <h3>Choose your shape!</h3>
            <div id='shapes'>
              <Button class='shapeButton' onClick={() => setShape("circle")}/>
              <Button class='shapeButton' variant="outlined" onClick={() => setShape("triangle")}/>
              <Button class='shapeButton' variant="contained" onClick={() => setShape("square")}/>
            </div>
          </div>
          <div id='drawing_area'>
            <p>Draw a {shape}</p>
            <div id="canvas" >
            <ExcalidrawComponent />
            </div>
          </div>
        </div>
        <div id='footer'>
          <p>Score:</p>
        </div>
      </div>
  )
}

export default App
