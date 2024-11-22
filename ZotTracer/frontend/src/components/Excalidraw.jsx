import React, { useRef, useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";

const ExcalidrawComponent = ({ onAPIReady }) => {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  const samplePath = (pathElement, numSamples = 100) => {
    const pathLength = pathElement.getTotalLength();
    const points = [];
    for (let i = 0; i <= numSamples; i++) {
      const point = pathElement.getPointAtLength((i / numSamples) * pathLength);
      points.push({ x: point.x, y: point.y });
    }
    return points;
  };

  const computePointsInMinimumDistanceProportion = (pointSet1, pointSet2) => {
    const distance = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    let numPointsInThreshold = 0;
    const THRESHOLD = 0.5; // units??
    
    for (let i = 0; i < pointSet1.length; i++) {
      let minimumSpace = 100000;
      for (let j = 0; j < pointSet2.length; j++) {
        let space = distance(pointSet1[i], pointSet2[j]);
        if (space < THRESHOLD) { minimumSpace = space; }
      }
      if (minimumSpace < THRESHOLD) { numPointsInThreshold++; }
    }
    return numPointsInThreshold;
  };

  const handleComparePaths = () => {
    const targetPath = document.getElementById("target-path");
    const userPath = document.getElementById("user-path");

    if (targetPath && userPath) {
      const targetPoints = samplePath(targetPath);
      const userPoints = samplePath(userPath);

      const numPointsInThreshold = computePointsInMinimumDistanceProportion(targetPoints, userPoints);

      let finalPct = (numPointsInThreshold / targetPoints.length) * (Math.min(targetPath.getTotalLength(), userPath.getTotalLength()) / Math.max(targetPath.getTotalLength(), userPath.getTotalLength()));
      finalPct *= 100;

      setSimilarity(finalPct.toFixed(2));
    }
  };

  
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
      ref={excalidrawRef}
      onPointerUp={(elements) => {
          // Handle changes to the elements
          console.log(elements);
      }}

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
  )
};

export default ExcalidrawComponent;