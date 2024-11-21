import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@mui/material'
// import { Excalidraw } from "@excalidraw/excalidraw";
// import ExcalidrawComponent from './components/Excalidraw'
// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     ochre: {
//       main: '#E3D026',
//       light: '#E9DB5D',
//       dark: '#A29415',
//       contrastText: '#242105',
//     },
//   },
// });

function App() {
  const [count, setCount] = useState(0)

  const buttonStyle = {
    "backgroundColor": "pink",
    "&:hover": {
      backgroundColor: "red"
    },
    "&:active": {
      backgroundColor: "blue"
    }
  };

  return (
      <div id='display'>
        <h1>ZotTracer</h1>
        <div id='top'>
          <div id='left'>
            <h3>Choose your shape!</h3>
            <div id='shapes'>
              <Button class='shapeButton' sx={{buttonStyle}}/>
              <Button class='shapeButton' variant="outlined"/>
              <Button class='shapeButton' variant="contained"/>
            </div>
          </div>
          <div id='drawing_area'>
            <p>Drawing here:</p>
            <>
            {/* <h1 style={{ textAlign: "center"}}>Excalidraw Example</h1>
            <div style={{ height: "100",backgroundColor:"powderblue" }}>
              <Excalidraw />
            </div> */}
            </>
            {/* <ExcalidrawComponent /> */}
            {/* <Excalidraw ref={excalidrawRef} style={{ zIndex: '-100' }}/> */}
          </div>
        </div>
        <div id='footer'>
          <p>Score:</p>
        </div>
      </div>
  )
}

export default App
