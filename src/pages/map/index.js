import React, { useState } from "react";
import { getStreetAddresss } from "../api/urls/methods";
import MapLayout from "./components/map_layout/MapLayout";

function Map() {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");

  const handleJobLocation = (latLan) => {
    let streetAddress = null;
    getStreetAddresss(latLan?.lat, latLan?.lng)
      .then((res) => {
        streetAddress = {
          country: {
            value: res?.data?.address?.country_code?.toUpperCase(),
            name: res?.data?.address?.country,
          },
          city:
            res?.data?.address?.municipality ||
            res?.data?.address?.county ||
            "",
          state: res?.data?.address?.region || res?.data?.address?.state || "",
        };
      })
      .finally(() => {
        if (streetAddress) {
          setAddress(streetAddress);
          setCity(streetAddress?.city);
        }
        setLocation(JSON.stringify(latLan));
      });
  };

  return (
    <div>
      map location{" "}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ zIndex: "1", margin: "50px" }}
      />
      <MapLayout onMarkerDragEnd={handleJobLocation} />
    </div>
  );
}

export default Map;
