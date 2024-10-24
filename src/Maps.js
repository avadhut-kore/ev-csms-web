


import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "./placeholder.png",
  iconSize: [38, 38],
});

// Sample data for EV charger stations from various locations around the world
const chargerStations = [
  { id: 1, name: "Charger A", lat: 51.505, lon: -0.09 }, // London
  { id: 2, name: "Charger B", lat: 34.0522, lon: -118.2437 }, // Los Angeles
  { id: 3, name: "Charger C", lat: 35.6762, lon: 139.6503 }, // Tokyo
  { id: 4, name: "Charger D", lat: -33.8688, lon: 151.2093 }, // Sydney
  { id: 5, name: "Charger E", lat: 48.8566, lon: 2.3522 }, // Paris
  // Add more stations with diverse global coordinates
];

const initialPosition = [20, 0]; // Center of the world
const initialZoom = 2; // Zoom level to show a wide area

function ResetCenterView(props) {
  const { selectPosition } = props;
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition.lat, selectPosition.lon),
        map.getZoom(),
        {
          animate: true
        }
      );
    }
  }, [selectPosition]);

  return null;
}

export default function Maps(props) {
  const { selectPosition } = props;

  return (
    <MapContainer
      center={initialPosition}
      zoom={initialZoom}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=kQJDFpaeYEDmgiHWbqfJ"
      />
      
      {/* Render markers for each EV charger station */}
      {chargerStations.map(station => (
        <Marker key={station.id} position={[station.lat, station.lon]} icon={icon}>
          <Popup>
            {station.name}
          </Popup>
        </Marker>
      ))}
      
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
}
