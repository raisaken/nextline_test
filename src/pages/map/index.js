import React, { useState } from "react";
import MapLayout from "./components/map_layout/MapLayout";

function Map() {
  const [jobData, setJobData] = useState();
  const [address, setAddress] = useState();
  console.log(window, "window");

  const handleJobLocation = (latLan) => {
    let streetAddress = null;
    // getStreetAddresss(latLan?.lat, latLan?.lng)
    //   .then((res) => {
    //     streetAddr ess = {
    //       country: {
    //         value: res?.data?.address?.country_code?.toUpperCase(),
    //         name: res?.data?.address?.country,
    //       },
    //       city:
    //         res?.data?.address?.municipality ||
    //         res?.data?.address?.county ||
    //         "",
    //       state: res?.data?.address?.region || res?.data?.address?.state || "",
    //     };
    //   })
    //   .finally(() => {
    //     if (streetAddress) {
    //       setAddress(streetAddress);
    //       // Object.keys(streetAddress).forEach(
    //       //   (key) =>
    //       //     // @ts-ignore

    //       //     setValue()
    //       //   key,
    //       //   key === "country" ? streetAddress[key]?.name : streetAddress[key]
    //       // );
    //     }
    //     // setValue("latLan", JSON.stringify(latLan));
    //     console.log(latLan, "latLan");
    //     setJobData((prev) => ({
    //       ...prev,
    //       latLan: JSON.stringify(latLan),
    //       country: streetAddress?.country?.name,
    //       city: streetAddress?.city,
    //       state: streetAddress?.state,
    //     }));
    //   });
  };
  return (
    <div>
      <MapLayout onMarkerDragEnd={handleJobLocation} /> 
    </div>
  );
}

export default Map;
