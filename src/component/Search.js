import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";

//CSS import
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/Search.css";

//Own component
import InfoCard from "./InfoCard";
import TwitchAPI from "./TwitchAPI";

function Search(props) {
  const [streamList, setStreamList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [startSearch, setStartSearch] = useState(false);

  return (
    <div>
      {/* Input search bar */}
      <InputGroup size="lg" className="input">
        <FormControl
          placeholder="Search your favorite"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              TwitchAPI.getStream(searchInput).then((res) => {
                setStreamList(res.data.data);
                setStartSearch(true);
              });
            }
          }}
        />
        <Button
          variant="outline-secondary"
          onClick={(e) => {
            TwitchAPI.getStream(searchInput).then((res) => {
              setStreamList(res.data.data);
              setStartSearch(true);
            });
          }}
        >
          Search
        </Button>
      </InputGroup>

      {/* alter message & InfoCard display */}
      {startSearch === false ? (
        <p></p>
      ) : streamList.length === 0 ? (
        <p className="warning">Please try other keywords !</p>
      ) : (
        streamList.map((element) => <InfoCard key={element.id} data={element} />)
      )}
    </div>
  );
}

export default Search;
