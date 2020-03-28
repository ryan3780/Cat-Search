import React, { useEffect } from "react";
import "./App.css";

import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import ImageInfo from "./ImageInfo";
import LoadingIndicator from "./LoadingIndicator";

function App() {
  const DS =
    "https://api.thecatapi.com/v1/images/search?limit=30&page=1&order=DESC";
  // 처음에 로딩에 true가 아니면 로딩 중 표시가 계속 뜨기 때문에 처음 state가 true
  const [loading, setLoading] = React.useState(true);
  const [images, setImages] = React.useState([]);
  const [target, setTarget] = React.useState(null);
  // console.log(images);

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
    progress()
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
        setLoading(false)
        setImages(filteredCats);
        
      })
      .catch(error => console.error(error));
  };
  // console.log(data);

  const onClickImage = selected => {
    setTarget(selected);
  };

  const getRandomCats = () => {
    progress()
    fetch(`${DS}`)
      .then(response => response.json())
      .then(data => {
        setLoading(false)
        setImages(data);
      })
      .catch(error => console.error(error));
  };
//  console.log(loading)
  // 1초 동안 로딩 중을 보여주는 함수를 멈추게 하는 기능
  useEffect(()=>{
   clearTimeout(progress)
  },[loading])
  
  // 1초 동안 loading에 true를 줘서 로딩을 하는 것처럼 보이게 하는 기능
  const progress = () =>{
    setTimeout(()=>{
      setLoading(true)
    }, 1000)
  }

  return (
    <div id="App">
      <SearchInput onSearch={onSearch} />
      <button className="RandomBtn" onClick={getRandomCats}>
        Random Cats
      </button>
      <div className="SearchResult">
        {loading ? <SearchResult images={images} clickImage={onClickImage} /> : <LoadingIndicator />}
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
