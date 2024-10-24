import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';
import axios from 'axios';
import chargingIcon from './../asset/img/map-loc-icon.jpg';
import livelocation from './../asset/img/placeholder.png';

const containerStyle = {
  width: '100%',
  height: '93vh',
};

const Map = ({ searchTerm }) => {
  const [countryCoords, setCountryCoords] = useState(null);
  const [chargingStations, setChargingStations] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [directions, setDirections] = useState(null); // State for directions

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchTerm)}&key=AIzaSyBersaeDEX1FoAovB3DXTgVzMS3eBC_GLY`
      );

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        setCountryCoords({ lat, lng });
        fetchChargingStations(lat, lng);
      } else {
        console.error('No results found for the country.');
      }
    } catch (error) {
      console.error('Error fetching country coordinates:', error);
    }
  };

  const fetchChargingStations = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=charging_station&key=AIzaSyBersaeDEX1FoAovB3DXTgVzMS3eBC_GLY`
      );

      console.log("Charging Stations Response:", response.data);
  
      if (response.data.results.length > 0) {
        setChargingStations(response.data.results);
      } else {
        console.warn('No charging stations found in the area.');
        setChargingStations([]);
      }
    } catch (error) {
      console.error('Error fetching charging stations:', error);
    }
  };

  const getLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCountryCoords({ lat: latitude, lng: longitude });
        setUserLocation({ lat: latitude, lng: longitude });
        fetchChargingStations(latitude, longitude);
        setPopupVisible(false);
      }, (error) => {
        console.error('Error getting live location:', error);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const getDirections = async (destination) => {
    if (!userLocation) return;

    const directionsService = new window.google.maps.DirectionsService();
    
    directionsService.route(
      {
        origin: userLocation,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error('Error fetching directions:', result);
        }
      }
    );
  };

  useEffect(() => {
    if (!hasShownPopup) {
      setPopupVisible(true);
      setHasShownPopup(true);
    }
    handleSearch();
  }, [searchTerm, hasShownPopup]);

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyBersaeDEX1FoAovB3DXTgVzMS3eBC_GLY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={countryCoords || { lat: 20.5937, lng: 78.9629 }} // Default to India
          zoom={10}
        >
          {/* User location marker */}
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                url: livelocation,
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          )}

          {/* Charging stations markers */}
          {chargingStations.map((station) => (
            <Marker
              key={station.place_id}
              position={{
                lat: station.geometry.location.lat,
                lng: station.geometry.location.lng,
              }}
              icon={{
                url: chargingIcon,
                scaledSize: new window.google.maps.Size(30, 30),
              }}
              onClick={() => {
                setSelectedStation(station);
                getDirections(station.geometry.location); // Get directions on marker click
              }} 
            />
          ))}

          {/* InfoWindow for selected station */}
          {selectedStation && (
            <InfoWindow
              position={{
                lat: selectedStation.geometry.location.lat,
                lng: selectedStation.geometry.location.lng,
              }}
              onCloseClick={() => {
                setSelectedStation(null);
                setDirections(null); // Clear directions when closing InfoWindow
              }}
            >
              <div>
                <h3>{selectedStation.name}</h3>
                <img src={selectedStation.icon} alt={selectedStation.name} style={{ width: '50px', height: '50px' }} />
                <p>{selectedStation.vicinity || 'No address available'}</p>
              </div>
            </InfoWindow>
          )}

          {/* Render directions if available */}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>

      {/* Popup for live location */}
      {popupVisible && (
        <div style={popupStyle}>
          <p style={{ marginBottom: '20px' }}>Would you like to get your live location?</p>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <button style={{ borderRadius: '8px' }} onClick={getLiveLocation}>Yes, get my location</button>
            <button style={{ borderRadius: '8px' }} onClick={() => setPopupVisible(false)}>Cancel</button>
          </div>
        </div>
      )}
      <button style={buttonStyle} onClick={() => setPopupVisible(true)}>Get Live Location</button>
    </>
  );
};

const popupStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '16px',
  background: 'white',
  border: '1px solid #ccc',
  zIndex: 1000,
  borderRadius: '8px',
};

const buttonStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  padding: '10px 15px',
  background: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Map;
