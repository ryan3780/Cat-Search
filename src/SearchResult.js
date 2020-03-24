import React from "react";
import "./App.css";

const SearchResult = ({ catData }) => {
  const resultViews = [];
  if (catData !== null) {
    catData.forEach((ele, idx) => {
      resultViews.push(
        <div className="item" key={idx}>
          <img src={ele.url} alt={ele.id} />
        </div>
      );
    });

    return resultViews;
  } else {
    return <div className="item">No Result...</div>;
  }
};

export default SearchResult;
