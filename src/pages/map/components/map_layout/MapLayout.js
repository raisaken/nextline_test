import React, { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import LeafLetMap from "../leafletmap/LeafLetMap";

const renderBottomHandle = () => <div className="bottom-handle"></div>;

function MapLayout({ children, onMarkerDragEnd, markers, sx, large }) {
  const mapWrapperRef = useRef();
  const mapMinHeight = 300;
  const mapMaxHeight = 600;
  const [mapState, setMapState] = useState({
    width: "100%",
    height: mapMinHeight,
  });
  const { width, height } = mapState;

  const handleResizeStop = (e, direction, ref, delta, position) => {
    setMapState({
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (mapWrapperRef?.current) {
        setMapState({
          ...mapState,
          width: mapWrapperRef.current.offsetWidth,
        });
      }
    };

    // window.addEventListener("resize", handleResize);

    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };
  }, []);

  return (
    <div id="map-layout__wrapper">
      {/* {large ? <h6>Search Location</h6> : null} */}

      <div
        id="map-layout__map-wrapper"
        ref={mapWrapperRef}
        style={{
          height: height,
          position: "relative",
          marginBottom: "20px",
        }}
      >
        <Rnd
          size={{
            width,
            height,
          }}
          position={{ x: 20 }}
          enableResizing={{
            top: false,
            right: false,
            left: false,
            bottom: !!large,
            topLeft: false,
            topRight: false,
            bottomRight: false,
          }}
          resizeHandleComponent={{ bottom: renderBottomHandle() }}
          onResizeStop={handleResizeStop}
          disableDragging={true}
          style={{
            border: "solid 1px #ccc",
            minHeight: `${mapMinHeight}px!important`,
            maxHeight: `${mapMaxHeight}px!important`,
          }}
        >
          <LeafLetMap
            mapState={mapState}
            markers={markers}
            onMarkerDragEnd={onMarkerDragEnd}
          />
        </Rnd>
      </div>

      <div>{children}</div>
    </div>
  );
}
export default MapLayout;
