import React from "react";
import "./App.css";

const ImageInfo = ({ escPress, shrinkImage, target }) => {
  if (target != null) {
    window.addEventListener("keydown", escPress);

    return (
      <div className="ImageInfo" onKeyDown={escPress}>
        <div className="content-wrapper">
          <div className="title">
            <span>{target.alt}</span>
            <div className="close" onClick={shrinkImage}>
              x
            </div>
          </div>
          <img src={target.src} alt={target.alt} />
          <div className="description">
            <div>성격: </div>
            <div>태생: </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default ImageInfo;
