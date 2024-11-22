import React, { useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";

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
        }
      }}
    />
  );
};

export default ExcalidrawComponent;