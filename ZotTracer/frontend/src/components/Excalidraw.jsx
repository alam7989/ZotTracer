import React, { useRef } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";

const ExcalidrawComponent = () => {
  const excalidrawRef = useRef(null);
  const excalidrawAPI = excalidrawRef.current;

//   useEffect(() => {
//     // Once the component is mounted, set the tool and hide the toolbar
//     
//     if (excalidrawAPI) {
//       // Start with free-draw tool
//       
//       // Hide the toolbar
//       excalidrawAPI.setState({
//         appState: {
//           isToolBarVisible: false,
//         },
//       });
//     }
//   }, []); // Only run once after mount

  return (
    <div style={{ width: "100%", height: "400px", border: "1px solid #ccc"}}>
      <Excalidraw 
        ref={excalidrawRef}
        // onChange={(elements) => {
        //     // Handle changes to the elements
        //     console.log(elements);
        // }}
        //   onPointerUpdate={(pointerData) => {
        //     // Handle pointer (mouse) updates
        //     console.log(pointerData);
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