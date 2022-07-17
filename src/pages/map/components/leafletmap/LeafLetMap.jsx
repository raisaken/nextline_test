import React, { useEffect, useMemo, useRef, useState } from "react";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import {
  Marker,
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const defaultCenterPosition = [27.71, 85.32];

//Search component
const Search = (props) => {
  const map = useMap(); // Access to leaflet map

  const { provider } = props;
  useEffect(() => {
    const searchControl = GeoSearchControl({
      provider,
    });
    map.addControl(searchControl); // Add a control in vanilla leaflet
    return () => {
      map.removeControl(searchControl);
    };
  }, [props]);

  return null;
};

//Marker component
function DraggableMarker({ position, setPosition, onDragEnd }) {
  const markerRef = useRef(null);

  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      onDragEnd?.(e.latlng);
    },
    locationerror() {
      setPosition(defaultCenterPosition);
    },
    click(e) {
      setPosition(e.latlng);
      onDragEnd?.(e.latlng);
    },
  });
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        console.log(marker, "marker");

        if (marker != null) {
          setPosition(marker.getLatLng());
          onDragEnd?.(marker.getLatLng());
        }
      },
    }),
    []
  );

  return Boolean(position) ? (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    ></Marker>
  ) : null;
}

//Map component
function LeafletMap({ onMarkerDragEnd }) {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(defaultCenterPosition);

  // Auto adjust size of map tile on resize of map container

  return (
    <div>
      <MapContainer
        center={position}
        zoom={12}
        minZoom={0}
        maxZoom={22}
        scrollWheelZoom={false}
        whenCreated={setMap}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Search provider={new OpenStreetMapProvider()} />
        {onMarkerDragEnd ? (
          <DraggableMarker
            position={position}
            setPosition={setPosition}
            onDragEnd={onMarkerDragEnd}
          />
        ) : null}
      </MapContainer>
    </div>
  );
}

export default React.memo(LeafletMap);
