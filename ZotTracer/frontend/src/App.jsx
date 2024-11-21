import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@mui/material'
import ExcalidrawComponent from './components/Excalidraw'


function App() {
  const [count, setCount] = useState(0)
  const [shape, setShape] = useState('circle'); // default shape: circle
  const [file, setFile] = useState();// useState("./assets/StarOutline.png");

  function uploadFile(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  // var uploadedSvg = (
  //   <Icon>
  //     <img src={file}/>
  //   </Icon>
  // )

  return (
      <div id='display'>
        <h1>ZotTracer</h1>
        <div id='top'>
          <div id='left'>
            <h3>Choose your shape!</h3>
            <div id='shapes'>
              <Button class='shapeButton' onClick={() => setShape("circle")}/>
              <Button class='shapeButton' variant="outlined" onClick={() => setShape("triangle")}/>
              {/* <Button class='shapeButton' startIcon={<Icon><img src={file}/></Icon>}></Button> */}
              <label for="file-upload" class="upload-label">Upload your own svg image!</label>
              <input type="file" accept=".svg" id='file-upload' onChange={uploadFile}/>
            </div>
          </div>
          <div id='drawing_area'>
            <p>Draw a {shape} :D</p>
            <div id="canvas" >
            <ExcalidrawComponent />
            </div>
          </div>
        </div>
        <div id='footer'>
          <p>Score:</p>
          <img src={file} />
        </div>
      </div>
  )
}

export default App
