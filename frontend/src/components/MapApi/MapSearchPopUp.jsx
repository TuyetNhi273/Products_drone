import React, { useEffect, useState } from "react";
import "./Popup.css"; // Create this file for styles
import MapSearch from "./MapSearch";
const MapSearchPopUp = ({ show, onClose, callback_marker }) => {
  const [marker, setMarker] = useState(null);
  const handleMarkerUpdate = (marker) => {
    setMarker(marker);
  };

  useEffect(() => {
    if (marker) {
      callback_marker(marker);
    }
  }, [marker, callback_marker]);

  if (!show) return null;

  return (
    <div className="overlay">
      <div className="MapSearchPopUp">
        <button onClick={onClose}>Close</button>
        <MapSearch callback_marker={handleMarkerUpdate} />
      </div>
    </div>
  );
};

export default MapSearchPopUp;
