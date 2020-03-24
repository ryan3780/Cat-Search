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
    <div>
      <input
        type="text"
        name="searchingCat"
        placeholder="고양이를 검색해보세요!"
        onKeyDown={pressEnter}
      />
    </div>
  );
};

export default SearchInput;
