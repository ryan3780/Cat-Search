import React from "react";
import "./App.css";

const ImageInfo = ({ escPress, shrinkImage, target, test }) => {
  
  const style={background : test ? '#000' : `#fff`, color : test ? `#fff` : `#000`}

  if (target != null) {
    window.addEventListener("keydown", escPress);

    return (
      <div className="ImageInfo" onKeyDown={escPress} >
        <div className="content-wrapper" style={style}>
          <div className="title">
            <span>{target.alt}</span>
            <div className="close" onClick={shrinkImage} style={style}>
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
