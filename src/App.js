import React, { useEffect } from "react";
import "./App.css";

import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import ImageInfo from "./ImageInfo";

function App() {
  const DS =
    "https://api.thecatapi.com/v1/images/search?limit=10&page=1&order=DESC";
  const [loading, setLoading] = React.useState(false);
  const [images, setData] = React.useState([]);
  const [target, setTarget] = React.useState(null);
  // console.log(data);

  const shrinkImage = () => {
    setTarget(null);
  };

  const escPress = target => {
    if (target.code === "Escape") {
      shrinkImage();
    }
  };

  const onSearch = word => {
    // word = 검색어, 검색어가 없으면 fetch를 막기 위한 경고창 띄우기
    if (word === "") {
      return alert("검색어를 입력해주세요");
    }
    fetch(`${DS}`)
      .then(response => response.json())
      .then(data => {
        // 검색을 한 후 카테고리가 있는 사진만 따로 모아서 보여주기 위한 .map() 코드
        const filteredCats = [];
        data.map(ele => {
          if (ele.categories) {
            if (ele.categories[0].name.indexOf(word) !== -1) {
              filteredCats.push(ele);
            }
            return filteredCats;
          } else {
            return null;
          }
        });
        setData(filteredCats);
      })
      .catch(error => console.error(error));
  };
  // console.log(data);

  const onClickImage = selected => {
    setTarget(selected);
  };

  const getRandomCats = () => {
    fetch(`${DS}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => console.error(error));
  };

  return (
    <div id="App">
      <SearchInput onSearch={onSearch} />
      <button className="RandomBtn" onClick={getRandomCats}>
        Random Cats
      </button>
      <div className="SearchResult">
        <SearchResult images={images} clickImage={onClickImage} />
      </div>
      <ImageInfo
        escPress={escPress}
        target={target}
        shrinkImage={shrinkImage}
      />
    </div>
  );
}

export default App;
