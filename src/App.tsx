
import React, { Suspense, useMemo, useState } from "react";
import './App.css';

// Lazy load the Grid component on demand
const LazyGrid = React.lazy(() => import("./Grid"));

export const App = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  
  
  const [showGrid, setShowGrid] = useState(false);

  return (
    <div style={containerStyle}>
      <div className="test-container">
        <div className="test-header">
          <button onClick={() => setShowGrid(true)}>
            Load the Grid
          </button>
        </div>

        <div style={containerStyle} className="ag-theme-alpine">
          {showGrid ?
            <Suspense fallback={<div>Loading...</div>}>
              <LazyGrid />
            </Suspense>
            : null}
        </div>
      </div>
    </div>
  );
};

