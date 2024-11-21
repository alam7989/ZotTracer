import React, { useRef } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";

const ExcalidrawComponent = () => {
  const excalidrawRef = useRef(null);

  return (
    <div style={{ width: "100%", height: "400px", border: "1px solid #ccc", zIndex:-100}}>
      <Excalidraw 
        ref={excalidrawRef} 
        initialData={{ 
            appState: {viewBackgroundColor: 'transparent'

        } }}
      />
    </div>
  );
};

export default ExcalidrawComponent;