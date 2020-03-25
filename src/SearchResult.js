import React from "react";
import "./App.css";


const SearchResult = ({ catData, clickCatImg}) => {
  // console.log(clickCatImg)
  const mouseLeftClick = (e) => {
    console.log(catData)
    clickCatImg(e.target)
  }
  const resultViews = [];
  if (catData !== null) {
    catData.forEach((ele, idx) => {
      resultViews.push(
        <div className="item" key={idx} onClick={mouseLeftClick}>
          <img src={ele.url} alt={ele.id} />
        </div>
      );
    });

    return resultViews;
  } else {
    return ;
  }
};

export default SearchResult;
