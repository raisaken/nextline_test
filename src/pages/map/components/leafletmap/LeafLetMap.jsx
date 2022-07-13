import React, { useEffect, useMemo, useRef, useState } from "react";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import {
  Marker,
  Popup,
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
// import "./leaflet.css";  

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
function DraggableMarker({ defaultPosition, onDragEnd, shouldLocate }) {
  const [position, setPosition] = useState(null);

  const markerRef = useRef(null);

  const map = useMapEvents({
    locationfound(e) {
      localStorage.setItem("currentLocation", JSON.stringify(e.latlng));
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      onDragEnd?.(e.latlng);
    },
    locationerror() {
      setPosition(defaultPosition || defaultCenterPosition);
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
        if (marker != null) {
          setPosition(marker.getLatLng());
          onDragEnd?.(marker.getLatLng());
        }
      },
    }),
    []
  );

  useEffect(() => {
    if (shouldLocate) {
      const currentLocation = localStorage.getItem("currentLocation");
      if (currentLocation) {
        const currentLocationObj = JSON.parse(currentLocation);
        setPosition(currentLocationObj);
        map.flyTo(currentLocationObj, map.getZoom());
        onDragEnd?.(currentLocationObj);
      } else {
        map.locate({ enableHighAccuracy: true });
      }
    }
  }, [shouldLocate]);

  return Boolean(position) ? (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span>Drag the marker to the exact location </span>
      </Popup>
    </Marker>
  ) : null;
}

//Map component
function LeafletMap({ mapState, markers, onMarkerDragEnd, shouldLocate }) {
  const [map, setMap] = useState(null);
  // Auto adjust size of map tile on resize of map container
  useEffect(() => {
    if (map && markers && markers.length > 0) {
      const cleanMarkers = markers?.map((marker) => marker?.position);
      var bounds = new L.LatLngBounds(cleanMarkers);
      map.fitBounds(bounds, { maxZoom: 10 });
    }
    map?.invalidateSize();
  }, [JSON.stringify(mapState), map]);

  return (
    <MapContainer
      center={defaultCenterPosition}
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
      {markers?.map((each, idx) => (
        <Marker key={`marker-${idx}`} position={each.position}>
          <Popup>{each.popup}</Popup>
        </Marker>
      ))}
      {onMarkerDragEnd ? (
        <DraggableMarker
          onDragEnd={onMarkerDragEnd}
          shouldLocate={shouldLocate}
        />
      ) : null}
    </MapContainer>
  );
}

export default React.memo(LeafletMap);
