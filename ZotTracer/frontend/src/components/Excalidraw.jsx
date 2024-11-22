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
    <div style={{ width: "100%", height: "400px", border: "1px solid #ccc"}} 
      onPointerUp={() => {
        // Handle pointer (mouse) updates
          console.log("SVG DATA STUFF");
      }}>
      <Excalidraw 
        // ref={excalidrawRef}
        // onChange={(elements) => {
        //     // Handle changes to the elements
        //     console.log(elements);
        // }}
        // onPointerDown
        
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