import React from "react";
import "./App.css";

const SearchInput = ({ onSearch }) => {
  //   console.log(onSearch);
  const pressEnter = e => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    
      <input
      className="SearchInput"
        placeholder="고양이를 검색해보세요!"
        onKeyDown={pressEnter}
      />
   
  );
};

export default SearchInput;
