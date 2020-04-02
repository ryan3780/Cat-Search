import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { Row, Col, Button } from "react-bootstrap";

const SearchInput = ({ onSearch }) => {
  // input 검색을 위한 state 여기에 있는 것이 좋을까, App.js에서 관리를 해야 하는게 좋을까?
  const [catFilterText, setCatFilterText] = React.useState("");
  const [isEditing, setEditing] = useState(false);
  // 최근 검색한 검색어를 저장하는 배열
  const [recentSearchedText, setRecentSearchedText] = React.useState([]);
  const inputRef = useRef(null);

  // input에 focus주는 기능
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
      if (e.target.value !== "") {
        recentSearchedText.push(catFilterText);
        // console.log(recentSearchedText);
        //반복문으로 각각의 key:value로 검색어를 저장하는 기능
        for (let ele in recentSearchedText) {
          localStorage.setItem(`list${ele}`, recentSearchedText[ele]);
          localStorage.setItem(`recent`, recentSearchedText[ele]);
        }
        // 배열의 길이가 5개 이상이면 맨 앞 요소를 날리는 기능
        if (recentSearchedText.length > 4) {
          recentSearchedText.shift();
        }
      }
      //최근 검색어가 사용자가 입력한 것 혹은 버튼 중 하나일 수도 있기에 따로 로컬스토리지에 저장 및 동기화 기능

      // 값을 입력한 후 'Enter'치고 나서, input box를 비워준다
      setCatFilterText("");
    }
    setRecentSearchedText([...recentSearchedText]);
  };

  // 최근 검색어로 고양이 이미지를 서칭한다
  const clickSearchedText = e => {
    onSearch(e.target.value);
    localStorage.setItem("recent", e.target.value);
  };

  // 최신 검색어가 화면에서 맨 왼쪽으로 오게 하기 위해서 만든 객체
  let forViews = {
    5: localStorage.getItem(`list0`),
    4: localStorage.getItem(`list1`),
    3: localStorage.getItem(`list2`),
    2: localStorage.getItem(`list3`),
    1: localStorage.getItem(`list4`)
  };
//화면에 최근 검색 결과를 버튼으로 보여주는 기능
  const views = Object.values(forViews).map((ele, idx) => {
    if (ele === null) {
      return null;
    } else {
      return (
        <Col md={1} key={idx} className="recentText">
          <Button
            variant="outline-info"
            onClick={clickSearchedText}
            value={ele}
          >
            {ele}
          </Button>
        </Col>
      );
    }
  });

  return (
    <>
      <Row>
        <Col md={12}>
        <input
          type='text'
          ref={inputRef}
          className="SearchInput"
          placeholder="고양이를 검색해보세요!"
          onKeyPress={pressEnter}
          onChange={pressEnter}
          value={catFilterText}
        />
        </Col>
        </Row>
        <Row id='BtnGroup'>
        {views}
      </Row>
    </>
  );
};

export default SearchInput;
