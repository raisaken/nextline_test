import React, { useState, useRef } from "react";
import LeafLetMap from "../leafletmap/LeafLetMap";

function MapLayout({ onMarkerDragEnd }) {
  const mapWrapperRef = useRef();

  const mapMinHeight = 300;
  const mapMaxHeight = 600;
  const [mapState, setMapState] = useState({
    width: "100%",
    height: mapMinHeight,
  });
  const { width, height } = mapState;

  return (
    <div>
      <div
        ref={mapWrapperRef}
        style={{
          height: height,
          marginBottom: "20px",
          zIndex: "-1",
        }}
      >
        <LeafLetMap mapState={mapState} onMarkerDragEnd={onMarkerDragEnd} />
      </div>
    </div>
  );
}
export default MapLayout;
