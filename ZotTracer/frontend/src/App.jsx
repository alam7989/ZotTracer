import { useState, useRef } from 'react'
import './App.css'
import { Button } from '@mui/material'
import ExcalidrawComponent from './components/Excalidraw'


function App() {
  const [shape, setShape] = useState('a circle'); // default shape: circle
  const [uploadedImage, setUploadedImage] = useState("");
  const fileInputRef = useRef(null);
  const excalidrawAPIRef = useRef(null);


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const blobURL = URL.createObjectURL(file);
      setUploadedImage(blobURL);
      setShape("your uploaded image");
    }
  };

  return (
    <div id='display'>
      <h1 class='pageheader'>ZotTracer</h1>
      <div id='top'>
        <div id='left'>
          <h3>Choose your shape!</h3>
          <div id='shapes'>
            <Button class='shapeButton' onClick={() => setShape("a circle")} />
            <Button class='shapeButton' onClick={() => setShape("a triangle")} />

            <input
              id="file-upload"
              type="file"
              accept=".svg"
              ref={fileInputRef}
              onChange={handleFileUpload}
              style={{ marginBottom: "10px" }}
            />
            <Button
              class='shapeButton'
              sx={{
                backgroundImage: `url(${uploadedImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "15vh",
                marginTop: "1vh"
              }}
              onClick={() => fileInputRef.current.click()}
            >
              {!uploadedImage && "Upload Image (svg only)"}
            </Button>

          </div>
        </div>

        <div id='drawing_area'>
          <p>Draw {shape} :D</p>
          <div id="canvas" >
            <ExcalidrawComponent onAPIReady={(api) => {
              excalidrawAPIRef.current = api; // Store API in a ref
            }} />
          </div>
        </div>
      </div>
      <div id='top2ah'>
        <div id='footer'>
          <Button id='canvasClearButton' class='clearButton' style={{display: "inline"}} onClick={() => {
            document.getElementById("footer").style.display = "none";
            if (excalidrawAPIRef.current) {
              excalidrawAPIRef.current.updateScene({ elements: [] });
            }
            document.getElementById("excalidraw").style.pointerEvents = "auto";
          }} >Clear drawing</Button>
          <p style={{display: "inline", paddingLeft: "1.5vw"}}>Score:</p>
        </div>
        <div id='spacer'>vhgh</div>
      </div>
    </div>
  )
}

export default App
