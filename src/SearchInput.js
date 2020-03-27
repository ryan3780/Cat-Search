import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const SearchInput = ({ onSearch }) => {
  // input 검색을 위한 state 여기에 있는 것이 좋을까, App.js에서 관리를 해야 하는게 좋을까?
  const [catFilterText, setCatFilterText] = React.useState("");
  const [isEditing, setEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setEditing(true);
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const pressEnter = e => {
    //input value에 사용자가 입력한 값을 넣기 위한 setState
    setCatFilterText(e.target.value);
    if (e.key === "Enter") {
      // input value를 App.js에 있는 onSearch()함수에 파라미터로 넘겨준다
      onSearch(e.target.value);
      // 값을 입력한 후 'Enter'치고 나서, input box를 비워준다
      setCatFilterText("");
    }
  };

  return (
    <input
      ref={inputRef}
      className="SearchInput"
      placeholder="고양이를 검색해보세요!"
      onKeyDown={pressEnter}
      onChange={pressEnter}
      value={catFilterText}
    />
  );
};

export default SearchInput;
