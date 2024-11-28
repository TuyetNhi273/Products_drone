import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  CircleMarker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";
import axios from "axios";

// Cấu hình lại biểu tượng marker của Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Component xử lý sự kiện click trên bản đồ
function MapClickHandler({ setMarker, isSearching }) {
  useMapEvents({
    click: async (e) => {
      if (isSearching) return; // Không xử lý click nếu đang trong chế độ tìm kiếm

      const { lat, lng } = e.latlng;

      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const address = response.data.display_name || "No address found";
        console.log(`Address: ${address}`);

        // Cập nhật marker
        setMarker({ lat, lng, address });
      } catch (error) {
        console.error("Error fetching address:", error);
        setMarker({ lat, lng, address: "Error fetching address" });
      }
    },
  });

  return null;
}

// Component tìm kiếm địa chỉ
function SearchControl({ setMarker, setIsSearching }) {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchInput = L.DomUtil.create("input", "search-input");
    searchInput.placeholder = "Type address and press Enter...";
    searchInput.style.position = "absolute";
    searchInput.style.top = "10px";
    searchInput.style.left = "10px";
    searchInput.style.zIndex = "1000";
    searchInput.style.padding = "5px";
    searchInput.style.background = "white";
    searchInput.style.border = "1px solid #ccc";
    searchInput.style.borderRadius = "4px";

    map.getContainer().appendChild(searchInput);

    // Khi focus vào ô tìm kiếm, bật chế độ tìm kiếm
    searchInput.addEventListener("focus", () => {
      setIsSearching(true);
    });

    // Khi blur khỏi ô tìm kiếm, tắt chế độ tìm kiếm
    searchInput.addEventListener("blur", () => {
      setIsSearching(false);
    });

    searchInput.addEventListener("keypress", async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const query = e.target.value;

        const results = await provider.search({ query });

        if (results.length > 0) {
          const { x: lon, y: lat, label: address } = results[0];
          console.log(`Address: ${address}, Latitude: ${lat}, Longitude: ${lon}`);

          // Cập nhật marker và chuyển tâm bản đồ
          map.setView([lat, lon], 13);
          setMarker({ lat, lng: lon, address });

          searchInput.value = ""; // Dọn sạch hộp tìm kiếm
        } else {
          console.log("No results found");
        }
      }
    });

    return () => {
      map.getContainer().removeChild(searchInput);
    };
  }, [map, setMarker, setIsSearching]);

  return null;
}

const MapSearch = () => {
  const [location, setLocation] = useState(null); // Vị trí hiện tại
  const [marker, setMarker] = useState(null); // Marker hiện tại
  const [isSearching, setIsSearching] = useState(false); // Trạng thái tìm kiếm

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          setLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <MapContainer
      center={location || [10.8006708, 106.7961592]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {location && (
        <>
          <Circle
            center={location}
            radius={30}
            pathOptions={{
              color: "blue",
              fillOpacity: 0.2,
              weight: 0,
            }}
          />
          <CircleMarker
            center={location}
            radius={5}
            pathOptions={{
              color: "blue",
              fillColor: "blue",
              fillOpacity: 1,
            }}
          >
            <Popup>Your Current Location</Popup>
          </CircleMarker>
        </>
      )}

      {marker && (
        <Marker position={[marker.lat, marker.lng]}>
          <Popup>
            <strong>Coordinates:</strong> Latitude {marker.lat}, Longitude {marker.lng}
            <br />
            <strong>Address:</strong> {marker.address}
          </Popup>
        </Marker>
      )}

      <MapClickHandler setMarker={setMarker} isSearching={isSearching} />
      <SearchControl setMarker={setMarker} setIsSearching={setIsSearching} />
    </MapContainer>
  );
};

export default MapSearch;
