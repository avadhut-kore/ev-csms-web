import React, { useState } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { FaSearch } from "react-icons/fa"; // Import the search icon
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

// const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export default function SearchBox(props) {
  const { setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  const handleSearch = () => {
    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setListPlace(result);
      })
      .catch((err) => console.log("err: ", err));
  };

  return (
    <div style={{marginBottom: "-16px"}}>
      {/* height: "463px", overflow:"scroll" */}
      <div style={{ display: "flex", alignItems: "center", position: "relative",width: '100%' }}>
        <OutlinedInput
          style={{ flex: 1, paddingRight: "40px",height: "40px" }} // Add padding for the icon
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
          placeholder="Search for EV chargers..."
        />
        <div
          onClick={handleSearch}
          style={{
            cursor: "pointer",
            position: "absolute",
            right: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaSearch size={20} color="#738677" />
        </div>
      </div>
      <div>
        <List component="nav" aria-label="main mailbox folders">
          {listPlace.map((item) => (
            <div key={item?.place_id}>
              <ListItem
                button
                onClick={() => {
                  setSelectPosition(item);
                }}
              >
                <ListItemIcon>
                  <img
                    src="./placeholder.png"
                    alt="Placeholder"
                    style={{ width: 38, height: 38 }}
                  />
                </ListItemIcon>
                <ListItemText primary={item?.display_name} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    </div>
  );
}
