import React, {useState, useEffect } from "react";
import SearchBox from "./SearchBox";
// import Maps from "./Maps";
import MapBox from "./../src/components/Map.js"
import './styles.css';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, InfoWindow,DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

import chargingIcon from './asset/img/charge-icon.png';
import diningIcon from './asset/img/main-icon.png'; // Add your dining icon
import livelocation from './asset/img/placeholder.png'; // Add your dining icon



import { RxCross1 } from "react-icons/rx";
import { CiMenuBurger } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import { FaChargingStation } from "react-icons/fa6";
import { FaCarAlt } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { RiSettings4Fill } from "react-icons/ri";
import Login from "./components/Login.js"
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdOutlineFeedback } from "react-icons/md";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";

import { MdLocalDining } from "react-icons/md";
import { LiaRestroomSolid } from "react-icons/lia";
import { FaShoppingBag } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import { MdPark } from "react-icons/md";
import { MdLocalGroceryStore } from "react-icons/md";
import { IoWifi } from "react-icons/io5";
import { PiCarFill } from "react-icons/pi";
import { FaPersonHiking } from "react-icons/fa6";
import { FaCampground } from "react-icons/fa6";
import { FiBatteryCharging } from "react-icons/fi";
import { FaMinusCircle } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { LuMenu } from "react-icons/lu";

import { TbLocationShare } from "react-icons/tb";
import { CiSaveDown2 } from "react-icons/ci";
import { FaClock } from "react-icons/fa";



const Home = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isMenuVisible, setMenuVisible] = useState(false);


    const [selected3, setSelected3] = useState('');
    const [selected4, setSelected4] = useState('');
    const [selected5, setSelected5] = useState('');

    const [isModalOpen, setModalOpen] = useState(false);
    const [isMenuVisible2, setIsMenuVisible2] = useState(false);
    const [directions, setDirections] = useState(null);

    const handleLoginClick = () => {
        setModalOpen(true);
        setIsMenuVisible2(false); // Hide the menu when Login is clicked
    }


  const handleSelect3 = (item) => {
    setSelected3(item);
  };
  const handleSelect4 = (item) => {
    setSelected4(item);
  };
  const handleSelect5 = (item) => {
    setSelected5(item);
  };


  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible); // Toggle visibility
  };


  const [showPlus, setShowPlus] = useState(false);

  const handleClick = () => {
      setShowPlus((prev) => !prev); // Toggle the visibility of the plus icon
  };

  const [showPlus2, setShowPlus2] = useState(false);

  const handleClick2 = () => {
      setShowPlus2((prev) => !prev); // Toggle the visibility of the plus icon
  };

  const [showPlus3, setShowPlus3] = useState(false);

  const handleClick3 = () => {
      setShowPlus3((prev) => !prev); // Toggle the visibility of the plus icon
  };

  const [showPlus4, setShowPlus4] = useState(false);

  const handleClick4 = () => {
      setShowPlus4((prev) => !prev); // Toggle the visibility of the plus icon
  };

  const [showPlus5, setShowPlus5] = useState(false);

  const handleClick5 = () => {
      setShowPlus5((prev) => !prev); // Toggle the visibility of the plus icon
  };


  const [buttonStates, setButtonStates] = useState({
    accessible: false,
    pullThrough: false,
    pullIn: false,
    trailerFriendly: false,
});

const toggleButton = (button) => {
    setButtonStates((prev) => ({
        ...prev,
        [button]: !prev[button],
    }));
};

const [value, setValue] = useState(3); // Initial value

const handleSliderChange = (event) => {
  setValue(event.target.value);
};


// const [countryCoords, setCountryCoords] = useState(null);
// const [diningPlaces, setDiningPlaces] = useState([]);



const [sliderOneValue, setSliderOneValue] = useState(30);
const [sliderTwoValue, setSliderTwoValue] = useState(70);
const minGap = 0; // Minimum gap between sliders
const maxSliderValue = 100; // Maximum value for the slider

useEffect(() => {
  fillColor();
}, [sliderOneValue, sliderTwoValue]);

const handleSliderOneChange = (e) => {
  const value = Math.min(e.target.value, sliderTwoValue - minGap);
  setSliderOneValue(value);
};

const handleSliderTwoChange = (e) => {
  const value = Math.max(e.target.value, sliderOneValue + minGap);
  setSliderTwoValue(value);
};

const fillColor = () => {
  const percent1 = (sliderOneValue / maxSliderValue) * 100;
  const percent2 = (sliderTwoValue / maxSliderValue) * 100;
  return `linear-gradient(to right, #dadae5 ${percent1}%, #3264fe ${percent1}%, #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
};

const [isSidebarVisible, setSidebarVisible] = useState(false); // Initialize sidebar visibility

const toggleSidebar = () => {
  setSidebarVisible(prev => !prev); // Toggle the sidebar visibility
};



const [dropdowns, setDropdowns] = useState({
  legend: false,
  filters: false,
  addStation: false,
  tripPlanner: false,
  getApp: false,
});

const [selectedFilters, setSelectedFilters] = useState({
  legend: '',
  filters: '',
  addStation: '',
  tripPlanner: '',
  getApp: '',
});

const toggleDropdown = (key) => {
  setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
};

const handleSelect = (key, item) => {
  setSelectedFilters((prev) => ({ ...prev, [key]: item }));
  setDropdowns((prev) => ({ ...prev, [key]: false }));
};

// const latitude = 16.8525; // Example latitude
// const longitude = 74.5815; // Example longitude



// ----------------------------------------------map --------------------------------------------


const [countryCoords, setCountryCoords] = useState(null);
const [chargingStations, setChargingStations] = useState([]);
const [diningPlaces, setDiningPlaces] = useState([]);
const [popupVisible, setPopupVisible] = useState(false);
const [hasShownPopup, setHasShownPopup] = useState(false);
const [selectedStation, setSelectedStation] = useState(null);
const [shoppingPlaces, setShoppingPlaces] = useState([]);
const [restroomPlaces, setRestroomPlaces] = useState([]);
const [lodgingPlaces, setLodgingPlaces] = useState([]);
const [parkPlaces, setParkPlaces] = useState([]);
const [groceryStores, setGroceryStores] = useState([]); 
const [wifiLocations, setWifiLocations] = useState([]);
const [valetParking, setValetParking] = useState([]);
const [hikingPlaces, setHikingPlaces] = useState([]);
const [campingPlaces, setCampingPlaces] = useState([]);
const [freeChargingStations, setFreeChargingStations] = useState([]);
const [userLocation, setUserLocation] = useState(null);
const [parkingLocations, setParkingLocations] = useState([]);
const [parkingLocations2, setParkingLocations2] = useState([]);
const [parkingLocations3, setParkingLocations3] = useState([]);
const [loadingProgress, setLoadingProgress] = useState(0);


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
  if (chargingStations) {
    getDirections();
  }
}, [chargingStations]);


const fetchDiningPlaces = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=restaurant&key=AIzaSyBersaeDEX1FoAovB3DXTgVzMS3eBC_GLY`
    );

    console.log("Dining Places Response:", response.data);

    if (response.data.results.length > 0) {
      setDiningPlaces(response.data.results);
      setShoppingPlaces([])
      // setDiningPlaces([])
      setRestroomPlaces([])
      setLodgingPlaces([])
      setParkPlaces([])
      setGroceryStores([])
      setWifiLocations([])
      setValetParking([])
      setHikingPlaces([])
      setCampingPlaces([])
      setParkingLocations([])
    } else {
      console.warn('No dining places found in the area.');
      setDiningPlaces([]);
    }
  } catch (error) {
    console.error('Error fetching dining places:', error);
  }
};

const fetchShoppingPlaces = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=store&key=AIzaSyBersaeDEX1FoAovB3DXTgVzMS3eBC_GLY`
    );

    console.log("Shopping Places Response:", response.data);

    if (response.data.results.length > 0) {
      setShoppingPlaces(response.data.results);
      setDiningPlaces([])
      setRestroomPlaces([])
      setLodgingPlaces([])
      setParkPlaces([])
      setGroceryStores([])
      setWifiLocations([])
      setValetParking([])
      setHikingPlaces([])
      setCampingPlaces([])
      setParkingLocations([])
    } else {
      console.warn('No shopping places found in the area.');
      setShoppingPlaces([]);
    }
  } catch (error) {
    console.error('Error fetching shopping places:', error);
  }
};

const fetchRestroomPlaces = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=establishment&keyword=restroom&key=AIzaSyBersaeDEX1FoAovB3DXTgVzMS3eBC_GLY`
    );

    console.log("Restroom Places Response:", response.data);

    if (response.data.results.length > 0) {
      setRestroomPlaces(response.data.results);
      setShoppingPlaces([])
      setDiningPlaces([])
      setLodgingPlaces([])
      setParkPlaces([])
      setGroceryStores([])
      setWifiLocations([])
      setValetParking([])
      setHikingPlaces([])
      setCampingPlaces([])
      setParkingLocations([])
    } else {
      console.warn('No restroom places found in the area.');
      setRestroomPlaces([]);
    }
  } catch (error) {
    console.error('Error fetching restroom places:', error);
  }
};

const fetchLodgingPlaces = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=lodging&key=AIzaSyBersaeDEX1FoAovB3DXTgVzMS3eBC_GLY`
    );

    console.log("Lodging Places Response:", response.data);

    if (response.data.results.length > 0) {
      setLodgingPlaces(response.data.results);
      setShoppingPlaces([])
      setDiningPlaces([])
      setRestroomPlaces([])
      setParkPlaces([])
      setGroceryStores([])
      setWifiLocations([])
      setValetParking([])
      setHikingPlaces([])
      setCampingPlaces([])
      setParkingLocations([])
    } else {
      console.warn('No lodging places found in the area.');
      setLodgingPlaces([]);
    }
  } catch (error) {
    console.error('Error fetching lodging places:', error);
  }
};

const fetchGroceryStores = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=grocery_or_supermarket&key=AIzaSyBersaeDEX1FoAovB3DXTgVzMS3eBC_GLY`
    );

    if (response.data.results.length > 0) {
      setGroceryStores(response.data.results);
      setShoppingPlaces([])
      setDiningPlaces([])
      setRestroomPlaces([])
      setLodgingPlaces([])
      setParkPlaces([])
      setWifiLocations([])
      setValetParking([])
      setHikingPlaces([])
      setCampingPlaces([])
      setParkingLocations([])
    } else {
      console.warn('No grocery stores found in the area.');
      setGroceryStores([]);
    }
  } catch (error) {
    console.error('Error fetching grocery stores:', error);
  }
};

const fetchWifiLocations = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=wifi&key=AIzaSyBersaeDEX1FoAovB3DXTgVzMS3eBC_GLY`
    );

    if (response.data.results.length > 0) {
      setWifiLocations(response.data.results);
      setShoppingPlaces([])
      setDiningPlaces([])
      setRestroomPlaces([])
      setLodgingPlaces([])
      setParkPlaces([])
      setGroceryStores([])
      setValetParking([])
      setHikingPlaces([])
      setCampingPlaces([])
      setParkingLocations([])
    } else {
      console.warn('No Wi-Fi locations found in the area.');
      setWifiLocations([]);
    }
  } catch (error) {
    console.error('Error fetching Wi-Fi locations:', error);
  }
};

const fetchValetParking = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&keyword=valet parking&key=AIzaSyBersaeDEX1FoAovB3DXTgVzMS3eBC_GLY`
    );

    if (response.data.results.length > 0) {
      setValetParking(response.data.results);
      setShoppingPlaces([])
      setDiningPlaces([])
      setRestroomPlaces([])
      setLodgingPlaces([])
      setParkPlaces([])
      setGroceryStores([])
      setWifiLocations([])
      setHikingPlaces([])
      setCampingPlaces([])
      setParkingLocations([])
    } else {
      console.warn('No valet parking locations found in the area.');
      setValetParking([]);
    }
  } catch (error) {
    console.error('Error fetching valet parking locations:', error);
  }
};

const fetchHikingPlaces = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&keyword=hiking&key=AIzaSyBersaeDEX1FoAovB3DXTgVzMS3eBC_GLY`
    );

    if (response.data.results.length > 0) {
      setHikingPlaces(response.data.results);
      setShoppingPlaces([])
      setDiningPlaces([])
      setRestroomPlaces([])
      setLodgingPlaces([])
      setParkPlaces([])
      setGroceryStores([])
      setWifiLocations([])
      setValetParking([])
      setCampingPlaces([])
      setParkingLocations([])
    } else {
      console.warn('No hiking locations found in the area.');
      setHikingPlaces([]);
    }
  } catch (error) {
    console.error('Error fetching hiking locations:', error);
  }
};


const fetchCampingPlaces = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&keyword=camping&key=AIzaSyBersaeDEX1FoAovB3DXTgVzMS3eBC_GLY`
    );

    if (response.data.results.length > 0) {
      setCampingPlaces(response.data.results);
      setShoppingPlaces([])
      setDiningPlaces([])
      setRestroomPlaces([])
      setLodgingPlaces([])
      setParkPlaces([])
      setGroceryStores([])
      setWifiLocations([])
      setValetParking([])
      setHikingPlaces([])
      setParkingLocations([])
    } else {
      console.warn('No camping locations found in the area.');
      setCampingPlaces([]);
    }
  } catch (error) {
    console.error('Error fetching camping locations:', error);
  }
};

const fetchParkPlaces = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=park&key=AIzaSyBersaeDEX1FoAovB3DXTgVzMS3eBC_GLY`
    );
    if (response.data.results.length > 0) {
      setParkPlaces(response.data.results);
      setShoppingPlaces([])
      setDiningPlaces([])
      setRestroomPlaces([])
      setLodgingPlaces([])
      setGroceryStores([])
      setWifiLocations([])
      setValetParking([])
      setHikingPlaces([])
      setCampingPlaces([])
      setParkingLocations([])
    } else {
      console.warn('No parks found in the area.');
      setParkPlaces([]);
    }
  } catch (error) {
    console.error('Error fetching park places:', error);
  }
};

const fetchLoadingChargingStations = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=charging_station&key=YOUR_API_KEY`
    );

    console.log("Charging Stations Response:", response.data);
    const stations = response.data.results;

    // Update the progress as stations are added
    for (let i = 0; i < Math.min(stations.length, 6); i++) {
      setLoadingProgress((prev) => prev + 1);
      setChargingStations((prev) => [...prev, stations[i]]);
    }
  } catch (error) {
    console.error('Error fetching charging stations:', error);
  }
};

// ---------------------near station 
const fetchParkingLocations = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=100&type=charging_station&key=AIzaSyBersaeDEX1FoAovB3DXTgVzMS3eBC_GLY`
    );

    setParkingLocations(response.data.results);
    setShoppingPlaces([])
    setDiningPlaces([])
    setRestroomPlaces([])
    setLodgingPlaces([])
    setParkPlaces([])
    setGroceryStores([])
    setWifiLocations([])
    setValetParking([])
    setHikingPlaces([])
    setCampingPlaces([])
  } catch (error) {
    console.error('Error fetching parking locations:', error);
  }
};

const fetchParkingLocations2 = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=charging_station&key=AIzaSyBersaeDEX1FoAovB3DXTgVzMS3eBC_GLY`
    );

    console.log("Parking Locations Response:", response.data);
    setParkingLocations2(response.data.results);
  } catch (error) {
    console.error('Error fetching parking locations:', error);
  }
};

const fetchParkingLocations3 = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=2000&type=charging_station&key=AIzaSyBersaeDEX1FoAovB3DXTgVzMS3eBC_GLY`
    );

    console.log("Parking Locations Response:", response.data);
    setParkingLocations3(response.data.results);
  } catch (error) {
    console.error('Error fetching parking locations:', error);
  }
};

const handleShowNearbyParking = () => {
  if (userLocation) {
    fetchParkingLocations(userLocation.lat, userLocation.lng);
  } else {
    alert('Please get your live location first.');
  }
};

const getLiveLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCountryCoords({ lat: latitude, lng: longitude });
      setUserLocation({ lat: latitude, lng: longitude });

         // Store latitude and longitude in local storage
         localStorage.setItem('userLatitude', latitude);
         localStorage.setItem('userLongitude', longitude);
      fetchChargingStations(latitude, longitude);
      setPopupVisible(false);
    }, (error) => {
      console.error('Error getting live location:', error);
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
};


const fetchFreeChargingStations = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&keyword=free%20charging&key=AIzaSyBersaeDEX1FoAovB3DXTgVzMS3eBC_GLY`
    );

    console.log("Free Charging Stations Response:", response.data);

    if (response.data.results.length > 0) {
      setFreeChargingStations(response.data.results);
    } else {
      console.warn('No free charging stations found in the area.');
      setFreeChargingStations([]);
    }
  } catch (error) {
    console.error('Error fetching free charging stations:', error);
  }
};

useEffect(() => {
  if (!hasShownPopup) {
    // setPopupVisible(true);
    setHasShownPopup(true);
  }
  handleSearch();
  const storedLatitude = localStorage.getItem('userLatitude');
  const storedLongitude = localStorage.getItem('userLongitude');

  if (storedLatitude && storedLongitude) {
    setCountryCoords({ lat: parseFloat(storedLatitude), lng: parseFloat(storedLongitude) });
    // setUserLocation({ lat: parseFloat(storedLatitude), lng: parseFloat(storedLongitude) });

    const lat = parseFloat(storedLatitude);
      const lng = parseFloat(storedLongitude);
      setCountryCoords({ lat, lng });
      // setUserLocation({ lat, lng });
      // fetchChargingStations(lat, lng);

    setPopupVisible(false); // Hide the popup if coordinates are found
  } else {
    setPopupVisible(true); // Show the popup if no coordinates are found
  }

}, [searchTerm, hasShownPopup]);



const containerStyle = {
  width: '100%',
  height: '93vh',
};
// ------------------------------------ map code end -------------------------------------------



// --------------------------------- style css ----------------------------------

const linkStyle = {
    color: "white",
    margin: "0 10px",
    textDecoration: "none",
    padding: "12px  10px",
    borderRadius: "4px",
    transition: "background-color 0.3s",
    cursor: 'pointer'
  };

  const hoveredStyle = {
    backgroundColor: "#45a049", // Change this to your desired hover color
  };
  // -------------------------------- css end -----------------------------------------

    return (
      <div>
      
      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      
      
        {/* ------------------------------------------------------ Top Navbar ------------------------------------------------------------ */}
  
        <div style={{ 
          backgroundColor: "#738677",
          padding: "10px", 
          color: "white", 
          width: "100%", 
          height: "45px",
          display: "flex", 
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <p style={{ margin: 0 ,fontSize:"24px"}}>EV Charger Locator</p>
          <div>
            {/* <a 
              onClick={openBusinessInNewTab}
              style={{ ...linkStyle, ...(hoveredLink === 'business' ? hoveredStyle : {}) }}
              onMouseEnter={() => setHoveredLink('business')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              EV Charger for Business
            </a> */}
            <a 
             
              style={{ ...linkStyle, ...(hoveredLink === 'login' ? hoveredStyle : {}) }}
              onMouseEnter={() => setHoveredLink('login')}
              onMouseLeave={() => setHoveredLink(null)}
              onClick={() => handleLoginClick(true)}
            >
              Login
            </a>
            <a 
          
              style={{ ...linkStyle, ...(hoveredLink === 'register' ? hoveredStyle : {}) }}
              onMouseEnter={() => setHoveredLink('register')}
              onMouseLeave={() => setHoveredLink(null)}
              onClick={() => handleLoginClick(true)}
            >
              Register
            </a>
          </div>
        </div>

  {/* ------------------------------------------------------ Top Navbar ------------------------------------------------------------ */}
  

  
 <div style={{ position: "relative", height: "100vh" }}>
 
 <div
  className="side-navbar"
  style={{
    width: isSidebarVisible ? "200px" : "50px", // Adjust width based on visibility
    backgroundColor: "#f4f4f4",
    padding: "10px",
    borderRight: "1px solid #ccc",
    transition: "width 0.3s", // Smooth transition for width change
    overflow: "hidden", // Prevent content overflow
    zIndex: 99999, // Ensure it appears above other elements
    position: "absolute", // Position it correctly
    left: "0", // Align to the left
    top: "0", // Align to the top
    height: "93vh", // Full height
  }}
>
  {/* Show button to open sidebar when it's closed */}
  {!isSidebarVisible && (
    <button
      onClick={toggleSidebar}
      style={{
        backgroundColor: "rgb(244 244 244)", // Button color
        border: "none",
        padding: "0px",
        cursor: "pointer",
        marginTop: "18px",
        fontSize: "25px",
        marginBottom:"12px"
      }}
    >
      <LuMenu style={{ color: 'black' }} />
    </button>
  )}

  {/* Header section with Menu and close button */}
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    {isSidebarVisible ? (
      <h2 style={{ margin: '0px 76px 6px 3px' }}>Menu</h2>
    ) : (
      <div style={{ display: 'grid', alignItems: 'center', justifyContent: 'center', height: '100%',   gridTemplateColumns: 'repeat(1, auto)', margin:'2px 0px 0px 1px',
    gap: '21px' }}>
        <FaLocationDot style={{ color: '#738677', fontSize: '20px' }} /> 
        <TbLocationShare style={{ color: '#738677', fontSize: '20px' }} /> 
        <CiSaveDown2 style={{ color: '#738677', fontSize: '20px' }} /> 
        <FaClock style={{ color: '#738677', fontSize: '20px' }} /> 
        {/* <FaCarAlt style={{ color: '#738677', fontSize: '20px' }} /> 
        <RiSettings4Fill style={{ color: '#738677', fontSize: '20px' }} /> 
        <IoIosHelpCircleOutline style={{ color: '#738677', fontSize: '20px' }} /> 
        <MdOutlineFeedback style={{ color: '#738677', fontSize: '20px' }} /> 
        <MdOutlineLocalGroceryStore style={{ color: '#738677', fontSize: '20px' }} /> 
        <IoMdDownload style={{ color: '#738677', fontSize: '20px' }} />  */}
      </div>
    )}

    {/* Close button shown only when sidebar is open */}
    {isSidebarVisible && (
      <button
        onClick={toggleSidebar}
        style={{
          backgroundColor: "rgb(244 244 244)", // Close button color
          border: "none",
          padding: "2px",
          cursor: "pointer",
          marginRight: "10px", // Space between button and text
          fontSize: "25px",
        }}
      >
        <RxCross1 style={{ color: 'black' }} />
      </button>
    )}
  </div>

  {/* Menu items */}
  <ul style={{ opacity: isSidebarVisible ? 1 : 0, transition: "opacity 0.3s", marginTop: '19px' }}>
  <li><FaLocationDot style={{ color: '#738677', fontSize: '20px', margin: '0px 15px -4px 0px' }} /><a href="#addStation">Legend </a></li>
  <li><TbLocationShare style={{ color: '#738677', fontSize: '20px', margin: '0px 15px -4px 0px' }} /><a href="#tripPlanner">Share Location</a></li>
  <li><CiSaveDown2 style={{ color: '#738677', fontSize: '20px', margin: '0px 15px -4px 0px' }} /><a href="#recentActivity"> Saved</a></li>
  <li><FaClock style={{ color: '#738677', fontSize: '20px', margin: '0px 15px -4px 0px' }} /><a href="#recentActivity">Recents </a></li>
  {/* <li><FaFilter style={{ color: '#738677', fontSize: '20px', margin: '0px 15px -4px 0px' }} /><a href="#tripPlanner">Trip Planner</a></li>

  <li><RiSettings4Fill style={{ color: '#738677', fontSize: '20px', margin: '0px 15px -4px 0px' }} /><a href="#settings">Settings</a></li>
  <li><IoIosHelpCircleOutline style={{ color: '#738677', fontSize: '20px', margin: '0px 15px -4px 0px' }} /><a href="#help">Help</a></li>
  <li><MdOutlineFeedback style={{ color: '#738677', fontSize: '20px',margin: '0px 15px -4px 0px' }} /><a href="#feedback">Submit Feedback</a></li>
  <li><MdOutlineLocalGroceryStore style={{ color: '#738677', fontSize: '20px', margin: '0px 15px -4px 0px' }} /><a href="#store">PlugShare Store</a></li>
  <li><IoMdDownload style={{ color: '#738677', fontSize: '20px', margin: '0px 15px -4px 0px' }} /><a href="#getApp">Get the App</a></li> */}
  </ul>
</div>

            {/* --------------------------part of search bar---------------------------------------------------------- */}
       {/* input back side Toggle Button  */}
    <div style={{ position: "absolute", top: "24px", left: "53px", zIndex: 9999, backgroundColor: "white", width: "25%" }}>
      <div >
        <button
          onClick={toggleMenu}
          style={{
            float: 'left',
            width: '40px',
            height: '40px',
            backgroundColor: 'transparent', // Remove background color
            border: '1px solid #c4c4c4', // Set a light border
            cursor: 'pointer', // Change cursor to pointer
            padding: 0 // Remove padding
          }}
        >
          {isMenuVisible ? (
            <RxCross1 style={{ color: 'black' }} /> // Show close icon when menu is open
          ) : (
            <CiMenuBurger style={{ color: 'black' }} /> // Show menu icon when menu is closed
          )}
        </button>
  
        {/* SearchBox */}
        <div style={{ overflow: 'hidden' }}>
          <input
        type="text"
        placeholder="Enter country name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{marginTop:'1px', width: '100%',height:'39px' }}
      />
        </div>
        </div>
  
        {isMenuVisible && (
          <>
  
  {/* ------------------------------------Main-Dropdown------------------------------------ */}
  <div className="over-flow">
  <ul>
  {/* ----------------------------------------Legend--------------------------------------- */}
     <li>
                <div className="dropdown">
                    <div className="select" onClick={() => toggleDropdown('legend')}>
                        <FaLocationDot style={{ marginRight: '8px', color: '#738677' }} />
                        <span className="selected">Legend</span>
                        <div className={`caret ${dropdowns.legend ? 'open' : ''}`}></div>
                    </div>
                    {dropdowns.legend && (
                          <ul className="menu">
                          <li> <div className="color" title="All stations are public">
                                <FaLocationDot style={{ color: '#46af61', marginRight: '5px' }} />
                                <span className="label">Public</span>
                              </div></li>
                          <li>   <div className="color" title="Has one or more high powered stations">
                                <FaLocationDot style={{ color: '#f19a40', marginRight: '5px' }} />
                                <span className="label">High Power</span>
                              </div></li>
                          <li>  <div className="color" title="All stations are restricted">
                                <FaLocationDot style={{ color: '#a9784c', marginRight: '5px' }} />
                                <span className="label">Restricted</span>
                              </div></li>
                          <li> 
                              <div className="color" title="All stations are currently in use">
                                <FaLocationDot style={{ color: '#ababab', marginRight: '5px' }} />
                                <span className="label">In Use</span>
                              </div>
                              </li>
                        </ul>
                    )}
                </div>
            </li>
        {/* ----------------------------------------Filters--------------------------------------- */}
     <li>
      <div className="dropdown">
        <div className="select"  onClick={() => toggleDropdown('filters')}>
          <FaFilter  style={{ marginRight: '8px',color: '#738677' }} />
          <span className="selected">Filters</span>
          <div className={`caret ${dropdowns.filters ? 'open' : ''}`}></div>
        </div>
        {dropdowns.filters && (
   
<div >

    {/* -------------------------------------Station Count----------------------------------------------- */}
    {/* <div className="filter-sub-title">
<p >Station Count</p>
<div className="multi-button">
<button className="cont-button count-button-start ">Any</button>
<button className="cont-button"    >2+</button>
<button className="cont-button"   >4+</button>
  <button className="cont-button count-button-end "   >6+</button>
</div>
</div> */}

<div className="filter-sub-title">
<p >Amenities</p>

<div className="amenity-filters">
<div className="filter-label" onClick={() => countryCoords && fetchDiningPlaces(countryCoords.lat, countryCoords.lng)}>
   < MdLocalDining /> 
   <p>Dining</p>
</div>

<div className="filter-label"   onClick={() => countryCoords && fetchRestroomPlaces(countryCoords.lat, countryCoords.lng)}>
   < LiaRestroomSolid /> 
   <p>Restrooms</p>
</div>
<div className="filter-label"    onClick={() => countryCoords && fetchShoppingPlaces(countryCoords.lat, countryCoords.lng)}>
   < FaShoppingBag /> 
   <p>Shopping</p>
</div>

<div className="filter-label"  onClick={() => countryCoords && fetchLodgingPlaces(countryCoords.lat, countryCoords.lng)}>
   < IoIosBed /> 
   <p>Lodging</p>
</div>
<div className="filter-label"  onClick={() => countryCoords && fetchParkPlaces(countryCoords.lat, countryCoords.lng)}>
   < MdPark /> 
   <p>Park</p>
</div>
<div className="filter-label"  onClick={() => countryCoords && fetchGroceryStores(countryCoords.lat, countryCoords.lng)}>
   < MdLocalGroceryStore /> 
   <p>Grocery</p>
</div>
<div className="filter-label"  onClick={() => countryCoords && fetchWifiLocations(countryCoords.lat, countryCoords.lng)}>
   < IoWifi /> 
   <p>WIFI</p>
</div>
<div className="filter-label"  onClick={() => countryCoords && fetchValetParking(countryCoords.lat, countryCoords.lng)}>
   < PiCarFill /> 
   <p>Valet Parking</p>
</div>
<div className="filter-label"  onClick={() => countryCoords && fetchHikingPlaces(countryCoords.lat, countryCoords.lng)}>
   < FaPersonHiking /> 
   <p>Hiking</p>
</div>
<div className="filter-label"  onClick={() => countryCoords && fetchFreeChargingStations(countryCoords.lat, countryCoords.lng)}>
   < FiBatteryCharging /> 
   <p>Free Charging</p>
</div>
<div className="filter-label"  onClick={() => countryCoords && fetchCampingPlaces(countryCoords.lat, countryCoords.lng)}>
   < FaCampground /> 
   <p>Camping</p>
</div>
</div>



<div className="filter-sub-title">
<p >Coming Soon</p>

<div className="coming-soon-radio">
  <div className="radio">
    <input id="radio-1" name="radio" type="radio" defaultChecked />
    <label htmlFor="radio-1" className="radio-label">Include Coming Soon</label>
  </div>

  <div className="radio">
    <input id="radio-2" name="radio" type="radio" />
    <label htmlFor="radio-2" className="radio-label">Show Only Coming Soon</label>
  </div>

  <div className="radio">
    <input id="radio-3" name="radio" type="radio" />
    <label htmlFor="radio-3" className="radio-label">Hide Coming Soon</label>
  </div>

</div>

</div>

{/* -------------------------------------Additional Filters----------------------------------------------- */}

<div className="filter-sub-title">
<p >Additional Filters (0 of 5)</p>
<div className="parking-button">
<a onClick={handleClick} className="add-filter-label" >
                Hide Dealerships 
                <span style={{ margin: '0 8px -4px', color: '#e47a1a' ,width:'0px' }}>
                    {showPlus ? <FaMinusCircle /> : ''}
                </span>
            </a>
            <a onClick={handleClick3} className="add-filter-label" >
            Hide Restricted Access 
                <span style={{ margin: '0 8px -4px', color: '#e47a1a' ,width:'0px' }}>
                    {showPlus3 ? <FaMinusCircle /> : ''}
                </span>
            </a>
            <a onClick={handleClick2} className="add-filter-label" >
            Show Private Homes
                <span style={{ margin: '0 8px -4px', color: '#4ab1cc' ,width:'0px'}}>
                    {showPlus2 ? <FaCirclePlus /> : ''}
                </span>
            </a>
            <a onClick={handleClick4} className="add-filter-label ,width:'0px'" >
            Available Now
                <span style={{ margin: '0 8px -4px', color: '#37a956' ,width:'0px' }}>
                    {showPlus4 ? <IoIosCheckmarkCircle /> : ''}
                </span>
            </a>
            <a onClick={handleClick5} className="add-filter-label">
            Hide Tesla Only Locations
                <span style={{ margin: '0 8px -4px', color: '#e47a1a' ,width:'0px' }}>
                    {showPlus5 ? <FaMinusCircle /> : ''}
                </span>
            </a>
            

</div>
</div>

{/* --------------------------------Parking----------------------------------------- */}
<div className="filter-sub-title">
<p >Parking (0 of 4)</p>
<div className="parking-button">
            <a onClick={() => toggleButton('accessible')} className="add-filter-label">
                Accessible 
                <span style={{ margin: '0 8px -4px', color: '#37a956' ,width:'0px' }}>
                    {buttonStates.accessible ? <IoIosCheckmarkCircle /> : ''}
                </span>
            </a>
            <a onClick={() => toggleButton('pullThrough')} className="add-filter-label">
                Pull through 
                <span style={{ margin: '0 8px -4px', color: '#37a956' ,width:'0px' }}>
                    {buttonStates.pullThrough ? <IoIosCheckmarkCircle /> : ''}
                </span>
            </a>
            <a onClick={() => toggleButton('pullIn')} className="add-filter-label">
                Pull in
                <span style={{ margin: '0 8px -4px', color: '#37a956' ,width:'0px' }}>
                    {buttonStates.pullIn ? <IoIosCheckmarkCircle /> : ''}
                </span>
            </a>
            <a onClick={() => toggleButton('trailerFriendly')} className="add-filter-label">
                Trailer friendly
                <span style={{ margin: '0 8px -4px', color: '#37a956' ,width:'0px' }}>
                    {buttonStates.trailerFriendly ? <IoIosCheckmarkCircle /> : ''}
                </span>
            </a>
        </div>
</div>


 {/* ----------------------------------PlugScore--------------------------------- */}
{/* <div className="filter-sub-title">
<p >PlugScore</p>


<div className="slider-container">
      <div className="countDisplay"  >
        {value}
      </div>
      <input
        type="range"
        min="0"
        max="10"
        value={value}
        step="1"
        onChange={handleSliderChange}
        className="slider"
        aria-label="rating"
      />
    </div>

    <div className="wrapper">
      <div className="values">
        <span id="range1">{sliderOneValue}</span>
        <span> &dash; </span>
        <span id="range2">{sliderTwoValue}</span>
      </div>
      <div className="container">
        <div className="slider-track" style={{ background: fillColor() }}></div>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderOneValue}
          id="slider-1"
          onChange={handleSliderOneChange}
          className="slider"
        />
        <input
          type="range"
          min="0"
          max="100"
          value={sliderTwoValue}
          id="slider-2"
          onChange={handleSliderTwoChange}
          className="slider"
        />
      </div>
    </div>

</div> */}

</div>

</div>
        )}
      </div>
    </li>
      {/* ----------------------------------------Add Station--------------------------------------- */}
   <li>
      <div className="dropdown">
        <div className="select"  onClick={() => toggleDropdown('addStation')}>
          <FaChargingStation  style={{ marginRight: '8px',color: '#738677' }} />
          <span className="selected">Add Station</span>
          <div className={`caret ${dropdowns.addStation ? 'open' : ''}`}></div>
        </div>
        {dropdowns.addStation && (
          <ul className="menu">
            <li onClick={() => handleSelect3('Station Type 1')}>Add Public Location</li>
            <li onClick={() => handleSelect3('Station Type 2')}>Share Home Charger</li>
          </ul>
        )}
      </div>
      </li>
        {/* ----------------------------------------Trip Planer--------------------------------------- */}
   <li>
   <div className="dropdown">
        <div className="select" onClick={() => toggleDropdown('tripPlanner')}>
          <FaCarAlt style={{ marginRight: '8px',color: '#738677' }} />
          <span className="selected">Trip Planer</span>
          <div className={`caret ${dropdowns.tripPlanner ? 'open' : ''}`}></div>
        </div>
        {dropdowns.tripPlanner && (
          <ul className="menu">
            <li onClick={() => handleSelect4('Station Type 1')}>Plan a New Trip</li>
         
          </ul>
        )}
      </div>
      </li>
       {/*------------------------------------- Recent Activitey--------------------- */}
       <li>
       <div className="dropdown">
        <div className="select" >
          <FaRedo   style={{ marginRight: '8px',color: '#738677' }} />
          <span className="selected">Recent Activitey</span>
        </div>
      </div>
      </li>
    {/* ----------------------------------------Setting--------------------------------------- */}
     <li>
       <div className="dropdown">
        <div className="select" >
          <RiSettings4Fill  style={{ marginRight: '8px',color: '#738677' }} />
          <span className="selected">Setting</span>
        </div>
      </div>
      </li>
        {/* ----------------------------------------Help--------------------------------------- */}
      <li>
       <div className="dropdown">
        <div className="select" >
          <IoIosHelpCircleOutline  style={{ marginRight: '8px',color: '#738677' }} />
          <span className="selected">Help</span>
        </div>
      </div>
      </li>
        {/* ----------------------------------------Submit Feedback--------------------------------------- */}
      <li>
       <div className="dropdown">
        <div className="select" >
          <MdOutlineFeedback  style={{ marginRight: '8px',color: '#738677' }} />
          <span className="selected">Submit Feedback</span>
        </div>
      </div>
      </li>
        {/* ----------------------------------------PlugShare Store--------------------------------------- */}
      <li>
       <div className="dropdown">
        <div className="select" >
          <MdOutlineLocalGroceryStore  style={{ marginRight: '8px',color: '#738677' }} />
          <span className="selected">PlugShare Store</span>
        </div>
      </div>
      </li>
  {/* ----------------------------------------Get the App--------------------------------------- */}
      <li>
   <div className="dropdown">
        <div className="select" onClick={() => toggleDropdown('getApp')}>
          <IoMdDownload style={{ marginRight: '8px',color: '#738677' }} />
          <span className="selected">Get the App</span>
          <div className={`caret ${dropdowns.getApp ? 'open' : ''}`}></div>
        </div>
        {dropdowns.getApp && (
          <ul className="menu">
            <li onClick={() => handleSelect5('Station Type 1')}> Apple App Store</li>
            <li onClick={() => handleSelect5('Station Type 2')}> Google Play Store</li>
          </ul>
        )}
      </div>
      </li>
      </ul>
      </div>
        </>
        )}
      </div>

      {/*--------------------------------------------- Map-------------------------------- */}
    <div style={{ width: "100%", height: "100%" }}>
      {/* <Maps selectPosition={selectPosition} style={{ width: "100%", height: "100%" }} /> */}
     
      {/* <MapBox longitude={longitude} latitude={latitude} /> */}

      <LoadScript googleMapsApiKey="AIzaSyBersaeDEX1FoAovB3DXTgVzMS3eBC_GLY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={countryCoords || { lat: 20.5937, lng: 78.9629 }}
          zoom={12}
        >
            {userLocation && (
            <Marker 
            position={userLocation}
            icon={{
              url: livelocation, // Use the dining icon
              scaledSize: new window.google.maps.Size(30, 30),
            }}
             />
          )}
          {chargingStations.map((station) => (
            <Marker
              key={station.place_id}
              position={{
                lat: station.geometry.location.lat,
                lng: station.geometry.location.lng,
              }}
              icon={{
                url: chargingIcon,
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              onClick={() => {
                setSelectedStation(station);
                getDirections(station.geometry.location); // Get directions on marker click
              }} 
            />
          ))}

{userLocation && <Marker position={userLocation} />}
          {chargingStations && <Marker position={chargingStations} label="Charging Station" />}

          {directions && (
            <DirectionsRenderer directions={directions} />
          )}

          {diningPlaces.map((place) => (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
              icon={{
                url: diningIcon, // Use the dining icon
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              onClick={() => setSelectedStation(place)} // Show info for dining places too
            />
          ))}


{shoppingPlaces.map((place) => (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
              icon={{
                url: diningIcon, // Use the dining icon
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              onClick={() => setSelectedStation(place)} // Show info for dining places too
            />
          ))}

{restroomPlaces.map((place) => (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
              icon={{
                url: diningIcon, // Use the dining icon
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              onClick={() => setSelectedStation(place)} // Show info for dining places too
            />
          ))}

{lodgingPlaces.map((place) => (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
              icon={{
                url: diningIcon, // Use the dining icon
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              onClick={() => setSelectedStation(place)} // Show info for dining places too
            />
          ))}

{parkPlaces.map((place) => (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
              icon={{
                url: diningIcon, // Use the dining icon
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              onClick={() => setSelectedStation(place)} // Show info for dining places too
            />
          ))}

{parkingLocations2.map((place) => (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
              icon={{
                url: diningIcon, // Use the dining icon
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              onClick={() => setSelectedStation(place)} // Show info for dining places too
            />
          ))}

{parkingLocations3.map((place) => (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
              icon={{
                url: diningIcon, // Use the dining icon
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              onClick={() => setSelectedStation(place)} // Show info for dining places too
            />
          ))}


{groceryStores.map((place) => (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
              icon={{
                url: diningIcon, // Use the dining icon
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              onClick={() => setSelectedStation(place)} // Show info for dining places too
            />
          ))}


{wifiLocations.map((place) => (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
              icon={{
                url: diningIcon, // Use the dining icon
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              onClick={() => setSelectedStation(place)} // Show info for dining places too
            />
          ))}

{parkingLocations.map((place) => (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
              icon={{
                url: diningIcon, // Use the dining icon
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              onClick={() => setSelectedStation(place)} // Show info for dining places too
            />
          ))}

{valetParking.map((place) => (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
              icon={{
                url: diningIcon, // Use the dining icon
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              onClick={() => setSelectedStation(place)} // Show info for dining places too
            />
          ))}


{hikingPlaces.map((place) => (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
              icon={{
                url: diningIcon, // Use the dining icon
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              onClick={() => setSelectedStation(place)} // Show info for dining places too
            />
          ))}

{campingPlaces.map((place) => (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
              icon={{
                url: diningIcon, // Use the dining icon
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              onClick={() => setSelectedStation(place)} // Show info for dining places too
            />
          ))}

          {selectedStation && (
            <InfoWindow
              position={{
                lat: selectedStation.geometry.location.lat,
                lng: selectedStation.geometry.location.lng,
              }}
              onCloseClick={() => setSelectedStation(null)}
            >
              <div>
                <h3>{selectedStation.name}</h3>
                <img src={selectedStation.icon} alt={selectedStation.name} style={{ width: '50px', height: '50px' }} />
                <p>{selectedStation.vicinity || 'No address available'}</p>
              </div>
            </InfoWindow>
          )}

          
        </GoogleMap>
      </LoadScript>

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
      

      {/* <MapBox searchTerm={searchTerm} style={{ width: "100%", height: "100%" }} /> */}
    </div>
  </div>
  



      </div>
  
      <div >
      {/* style={{ padding: '20px' }} */}
      {/* <h2>Welcome</h2>
      <button onClick={() => setModalOpen(true)}>Open Login Modal</button> */}

      <Login 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </div>
      </div>
  
  
    );
}

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

const diningButtonStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '150px', // Adjust to prevent overlap with the live location button
  padding: '10px 15px',
  background: '#28a745', // Green for dining
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};



export default Home


