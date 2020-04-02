import React from "react";

import "./App.css";



const SearchResult = ({ images, clickImage }) => {
  // console.log(clickCatImg)
  const mouseLeftClick = e => {
    clickImage(e.target);
  };

  // event delegation이 된건가??
  const resultViews = [];
  if (images.length !== 0) {
    images.forEach((ele, idx) => {
      resultViews.push(
        <div className="item" key={idx} onClick={mouseLeftClick}>
          <img src={ele.url} alt={ele.id} />
        </div>
      );
    });
    return resultViews;
  } else {
    // console.log(catData);
    return null
  }
};

export default SearchResult;
