import React, { useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import './Excalidraw.css'

const ExcalidrawComponent = ({ onAPIReady }) => {

  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  const clearCanvas = () => {
    console.log(excalidrawAPI);
    if (excalidrawAPI) {
      excalidrawAPI.updateScene({
        elements: [], // Clears all elements
      });
      // excalidrawAPI.setActiveTool({
      //   type: "freedraw"
      // })
    }
  };

  return (
    <div id="excalidraw" 
      onPointerUp={() => {
        // Handle pointer (mouse) updates
          console.log("SVG DATA STUFF");
          document.getElementById("excalidraw").style.pointerEvents = "none";
          document.getElementById("footer").style.display = "flex";

      }}>
        <Excalidraw id="excalidrawComp" excalidrawAPI={
          (api) => {
            console.log("Excalidraw API:", api);
            setExcalidrawAPI(api);
            onAPIReady(api); // Pass the API to the parent
          }
        }
        // ref={excalidrawRef}
        // onChange={(elements) => {
        //     // Handle changes to the elements
        //     console.log(elements);
        // }}
        
        initialData={{ 
            appState: {
                viewBackgroundColor: 'transparent',
                zenModeEnabled: true,
                activeTool: {
                  type: "freedraw", // Start with the free-draw tool
                },
        } }}
      />
    </div>
  );
};

export default ExcalidrawComponent;