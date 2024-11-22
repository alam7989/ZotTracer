import { useState, useRef } from 'react'
import './App.css'
import { Button } from '@mui/material'
import ExcalidrawComponent from './components/Excalidraw'


function App() {
  const [shape, setShape] = useState('a circle'); // default shape: circle
  const [uploadedImage, setUploadedImage] = useState("");
  const fileInputRef = useRef(null);

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
        <h1>ZotTracer</h1>
        <div id='top'>
          <div id='left'>
            <h3>Choose your shape!</h3>
            <div id='shapes'>
              <Button class='shapeButton' onClick={() => setShape("a circle")}/>
              <Button class='shapeButton' onClick={() => setShape("a triangle")}/>
         
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
