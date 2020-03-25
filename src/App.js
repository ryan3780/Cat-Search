import React from "react";
import "./App.css";

import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import ImageInfo from "./ImageInfo"

function App() {
  const DS =
    "https://api.thecatapi.com/v1/images/search?limit=3&page=100&order=DESC";

  const [data, setData] = React.useState(null);
  const [visible, setVisible] = React.useState(false)
  const [target, setTarget] = React.useState(null)

  
  
  const toggleVisible = () => {
    setVisible(!visible)
  }
  
  const escPress = (target) =>{
    if(target === 27){
      setVisible(!visible)
    }
  }

  const onSearch = () => {
    fetch(`${DS}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        
      })
      .catch(error => console.error(error));
  };
  // console.log(data);


  const onClick =(selected)=>{
    setTarget(selected)
    setVisible(true)
  }

  if(data===null){
    return (
     <div id="App">
      <SearchInput onSearch={onSearch} />
    <div className="SearchResult"></div>
    No Results...
    <div className="ImageInfo" style={{display:'none'}}></div>
    </div>)
  }

  return (
    <div id="App">
      <SearchInput onSearch={onSearch} />
      <div className="SearchResult">
      <SearchResult catData={data} clickCatImg={onClick} visible={visible}/>
      </div>
      <ImageInfo visible={visible} data={data} target={target} toggleVisible={toggleVisible} escPress={escPress}/>
    </div>
  );
}

export default App;
