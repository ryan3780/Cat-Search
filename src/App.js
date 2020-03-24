import React from "react";
import "./App.css";

import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";

function App() {
  const DS =
    "https://api.thecatapi.com/v1/images/search?limit=3&page=100&order=DESC";

  const [data, setData] = React.useState(null);

  const onSearch = () => {
    fetch(`${DS}`)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        // console.log(data[0].id); // Prints result from `response.json()` in getRequest
        setData(data);
      })
      .catch(error => console.error(error));
  };
  // console.log(data);

  return (
    <div id="App">
      <SearchInput onSearch={onSearch} />
      <div className="SearchResult">
        <SearchResult catData={data} />
      </div>
    </div>
  );
}

export default App;
