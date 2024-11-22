import { useState, useRef } from 'react'
import './App.css'
import { Button } from '@mui/material'
import ExcalidrawComponent from './components/Excalidraw'
import { exportToSvg } from "@excalidraw/excalidraw";

import axios from 'axios';


function App() {
  const [shape, setShape] = useState('anything'); // default shape: circle
  const [uploadedImage, setUploadedImage] = useState("");
  const fileInputRef = useRef(null);
  const excalidrawAPIRef = useRef(null);
  const [drawnImage, setDrawnImage] = useState();
  const clearButton = useRef(null);
  const [score, setScore] = useState();

  function clearDrawing() {
    document.getElementById("footer").style.display = "none";
    document.getElementById("excalidraw").style.pointerEvents = "auto";
    if (excalidrawAPIRef.current) {
      if (shape == "your drawing") {
        excalidrawAPIRef.current.updateScene({ elements: [excalidrawAPIRef.current.getSceneElements()[0]] });
      } else {
        excalidrawAPIRef.current.updateScene({ elements: [] });
      }
    }
  }

  const handleCustomDrawing = async () => {
    setShape("anything");
    clearDrawing();
  };

  const checkForCustomDrawing = async () => {
    if (shape == "anything") {
      setShape("your drawing")
      // document.getElementById("createButton").innerHTML = "Draw your own!"

      const element = excalidrawAPIRef.current.getSceneElements()[0];
      // console.log(element);
      setDrawnImage(element);
    }
    // console.log(drawnImage);
  }

  function calculateSimilarity(element1, element2) {
    // Define the properties to compare and their weights
    const propertiesToCompare = {
        width: 0.3,             // 20% weight for width
        height: 0.3,            // 20% weight for height
        x: 0.2,                 // 10% weight for x position
        y: 0.2                  // 10% weight for y position
        // Add more properties as needed
    };

    let totalWeight = 0;
    let similarityScore = 0;

    for (const [property, weight] of Object.entries(propertiesToCompare)) {
        totalWeight += weight;

        if (property in element1 && property in element2) {
            if (typeof element1[property] === 'number') {
                // Normalize numerical properties
                const maxValue = Math.max(element1[property], element2[property]) || 1;
                const diff = Math.abs(element1[property] - element2[property]);
                similarityScore += weight * (1 - diff / maxValue);
            } else if (element1[property] === element2[property]) {
                // Exact match for non-numerical properties
                similarityScore += weight;
            }
        }
    }

    // Convert to percentage
    return (similarityScore / totalWeight) * 100;
}

  return (
    <div id='display'>
      <div id='top'>
        <div id='left'>
          <h1>ZotTracer</h1>
          <h3>Draw {shape}. :D <br/> How accurate can you retrace it?</h3>
          <div id='shapes'>
         
            <Button
              class='shapeButton'
              id='createButton'
              sx={{
                backgroundImage: `url(${uploadedImage})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "15vh",
                marginTop: "1vh"
              }}
              onClick={() => 
                {
                  handleCustomDrawing();
                  excalidrawAPIRef.current.updateScene({ elements: [] });
                }
              }
              
            >
              Make a new masterpiece!
            </Button>
          </div>
        </div>

        <div id='drawing_area'>
          <div id="canvas" >
            <div id="excalidraw"
              onPointerUp={() => {
                // Handle pointer (mouse) updates
                // console.log(drawnImage);
                if (shape == "anything") {
                  const elements = [excalidrawAPIRef.current.getSceneElements()[0]];
                  elements[0].strokeColor = "#969696";
                  excalidrawAPIRef.current.updateScene({ elements: elements });
                }
                else {
                  document.getElementById("excalidraw").style.pointerEvents = "none";
                  document.getElementById("footer").style.display = "flex";
                }

                if (shape == "your drawing") {
                  const elements = excalidrawAPIRef.current.getSceneElements();
                  const points = calculateSimilarity(elements[0], elements[1]);
                  setScore(points)
                }

                checkForCustomDrawing();
              }}>
              <ExcalidrawComponent onAPIReady={(api) => {
                excalidrawAPIRef.current = api; // Store API in a ref
              }} />
            </div>
          </div>
        </div>
      </div>
      <div id='top2ah'>
        <div id='footer'>
          <Button id='canvasClearButton' class='clearButton' ref={clearButton} style={{ display: "inline" }} onClick={clearDrawing} >Clear drawing</Button>
          <p style={{ display: "inline", paddingLeft: "1.5vw" }}>Score: {score.toFixed(2)}</p>
        </div>
        <div id='spacer'></div>
      </div>
    </div>
  )
}

export default App
