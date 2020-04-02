import React, { useEffect } from "react";
import "./App.css";
import { Container, Button, Row } from "react-bootstrap";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import ImageInfo from "./ImageInfo";
import LoadingIndicator from "./LoadingIndicator";
import NoResult from './NoResult'
const initialScreenSize = { width: undefined };
function App() {
  
  const DS =
    "https://api.thecatapi.com/v1/images/search?limit=20&page=0&order=DESC";
  // 처음에 로딩에 true가 아니면 로딩 중 표시가 계속 뜨기 때문에 처음 state가 true
  const [loading, setLoading] = React.useState(true);
  const [images, setImages] = React.useState([]);
  const [target, setTarget] = React.useState(null);
  const [reload, setReload] = React.useState(false);
  const [moreImages, setMoreImages] = React.useState([]);
  const [endScroll, setEndScroll] = React.useState(true)
  const [screenSize, setScreenSize] = React.useState(initialScreenSize);
  //dark mode랑 기본 mode를 위한 state
  const [test, setTest] = React.useState(false);

  const changeMode = () =>{
    setTest(!test)
    if(test === true){
      document.documentElement.style.background = `#fff`
      document.documentElement.style.color = `#000`
    }else{
      document.documentElement.style.background = `#000`
      document.documentElement.style.color = `#fff`
    }
  }
  
  // 현재 스크린 사이즈를 state에 넣는 함수
  function updateScreenSize() {
    return setScreenSize({ width: window.innerWidth });
  }

  // 스크린 사이즈를 계속 확인 하는 useEffect
  useEffect(() => {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);
  
  //페이지의 크기에 따라서 보여지는 사진의 가로의 수가 변하는 조건문
  if(screenSize.width < 992){
    document.getElementsByClassName('SearchResult')[0].style.gridTemplateColumns=`repeat(3, minmax(250px, 1fr))`;
  }
  if(screenSize.width < 768){
    document.getElementsByClassName('SearchResult')[0].style.gridTemplateColumns=`repeat(2, minmax(250px, 1fr))`;
  }
  if(screenSize.width < 576){
    document.getElementsByClassName('SearchResult')[0].style.gridTemplateColumns=`repeat(1, minmax(250px, 1fr))`;
  }
  if(screenSize.width > 992){
    document.getElementsByClassName('SearchResult')[0].style.gridTemplateColumns=`repeat(4, minmax(250px, 1fr))`;
  }
  

  // 스크롤이 맨 밑이라는 것이 확인 되면, 데이터를 새로운 state에 넣어주는 기능
 window.onscroll = () => {
   //endScroll 값이 처음에는 true라서 더 많은 이미지를 보여 주지만, 다시 스크롤이 맨 밑으로 가면 endScroll false이므로 실행 x
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && endScroll !== false) {
        fetch(`${DS}`)
        .then(response => response.json())
        .then(data => {
          setMoreImages(data)
          setEndScroll(false)
        })
        .catch(error => console.error(error));
    }
  };


  // 스크롤이 맨 밑으로 가면 새로운 데이터를 보여주는 코드
  const loadMoreImg = [];
  moreImages &&
    moreImages.forEach((ele, idx) => {
      loadMoreImg.push(
        <div className="item" key={idx} onClick={e => onClickImage(e.target)}>
          <img src={ele.url} alt={ele.id} />
        </div>
      );
    });

  // 1초 동안 로딩 중을 보여주는 함수를 멈추게 하는 기능
  useEffect(() => {
    clearTimeout(progress);
    setMoreImages([]);
  }, [loading]);

  // 1초 동안 loading에 true를 줘서 로딩을 하는 것처럼 보이게 하는 기능
  const progress = () => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };

  //새로 고침 되면 가장 최근 검색어로 데이터를 수집하는 기능
  window.onload = () => {
    onSearch(localStorage.getItem("recent"));
    setReload(false);
  };

  useEffect(() => {
    setReload(true);
  }, [reload]);

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
    } else {
      // console.log(word);
      progress();
      request();
    }
  };

  const callAPI = url => {
    return fetch(url)
      .then(response => response.json())
      .then(data => data)
      .catch(err => console.log(err));
  };

  const request = async url => {
    url = DS;
    try {
      const result = await callAPI(url);
      // 검색을 한 후 카테고리가 있는 사진만 따로 모아서 보여주기 위한 .map() 코드
      const filteredCats = [];
      result.map(ele => {
        if (ele.categories) {
          if (
            ele.categories[0].name.indexOf(localStorage.getItem(`recent`)) !==
            -1
          ) {
            filteredCats.push(ele);
          }
          return filteredCats;
        } else {
          return null;
        }
      });
      setLoading(false);
      setImages(filteredCats);
      // console.log(result);
      return result;
    } catch (e) {
      console.warn(e);
    }
  };
  // console.log(images);

  const onClickImage = selected => {
    setTarget(selected);
  };

  const getRandomCats = () => {
    setEndScroll(true)
    progress();
    fetch(`${DS}`)
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setImages(data);
      })
      .catch(error => console.error(error));
  };
// console.log(loading)

//localstorage에 있는 데이터 클리어 및 화면에서 최근 검색어 안보이게 하는 기능
const removeSearchedText = () => {
    localStorage.clear()
    document.getElementById('BtnGroup').style.display='none'
}

const style={background : test ? '#000' : `#fff`, color : test ? `#fff` : `#000`}

  return (
    <div id="App" style={style}>
      <Container fluid>
        <Button onClick={changeMode} style={{marginBottom : `20px`, marginTop : `20px`}}>{test ?  `White Mode`:`Dark Mode` }</Button>
        <SearchInput onSearch={onSearch} />
        <Button
          variant="outline-warning"
          size="lg"
          className="RandomBtn"
          onClick={getRandomCats}
        >
          Random Cats
        </Button>
        <Button 
          variant="outline-danger"
          size="lg"
          className="RandomBtn"
          onClick={removeSearchedText}
          >
            최근 검색어 지우기
        </Button>
        <Row className="SearchResult">
        {loading ? <SearchResult images={images} clickImage={onClickImage} /> :  <LoadingIndicator />}
        {loadMoreImg}
        </Row>
        {loading && images.length === 0 ? <NoResult /> : null}
        <ImageInfo
          test={test}
          escPress={escPress}
          target={target}
          shrinkImage={shrinkImage}
        />
      </Container>
    </div>
  );
}

export default App;
