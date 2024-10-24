

import './styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login.js"
import Home from "./Home.js";
import Business from './components/Business.js';
import Map from './Maps.js'


function App() {



  return (
 


<Router>
   
      <Routes>
        <Route path="/login" element={ <Login/> }></Route>
        {/* <Route path="/" element={ <Home/> }></Route> */}
        <Route path="/" element={ <Home/> }></Route>
        <Route path="/Map" element={ <Map /> }></Route>
      </Routes>
  </Router>

    
  );
}

export default App;








