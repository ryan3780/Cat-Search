import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const SearchInput = ({ onSearch }) => {
  // input 검색을 위한 state 여기에 있는 것이 좋을까, App.js에서 관리를 해야 하는게 좋을까?
  const [catFilterText, setCatFilterText] = React.useState("");
  const [isEditing, setEditing] = useState(false);
  // 최근 검색한 검색어를 저장하는 배열
  const [recentSearchedText, setRecentSearchedText] = React.useState([])
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
      // Enter를 친 후에 검색어를 배열에 저장하는 기능
      if(e.target.value !== ""){
        recentSearchedText.push(catFilterText)
        // 배열의 길이가 5개 이상이면 맨 앞 요소를 날리는 기능
        if(recentSearchedText.length > 5){
           recentSearchedText.shift()
        }
      }
      // 값을 입력한 후 'Enter'치고 나서, input box를 비워준다
      setCatFilterText("");
    }
  };
  // console.log(recentSearchedText)

  // 최근 검색어로 고양이 이미지를 서칭한다
  const clickSearchedText =(e)=>{
    onSearch(e.target.value)
  }

  // 
  const view = recentSearchedText.map((ele, idx) =>{  
    return (<div key={idx}><button onClick={clickSearchedText} value={ele}>{ele}</button></div> )
  })
  return (
    <>
    <input
      ref={inputRef}
      className="SearchInput"
      placeholder="고양이를 검색해보세요!"
      onKeyUp={pressEnter}
      onChange={pressEnter}
      value={catFilterText}
    />
      {view}
    </>
  );
};

export default SearchInput;
