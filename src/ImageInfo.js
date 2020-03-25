import React from "react";
import "./App.css";

const ImageInfo = ({escPress, toggleVisible, visible, target, data}) => {

const pushXButton = () =>{
  toggleVisible()
}

const pressEscButton = (e)=>{
  // console.log(e.keyCode)
  escPress(e.keyCode)
}

  if(visible){
    window.addEventListener('keydown',pressEscButton)

    return(
    <div className="ImageInfo" onKeyDown={pressEscButton} >
      <div className="content-wrapper">
        <div className="title">
          <span>{target.alt}</span>
            <div className="close" onClick={pushXButton} >x</div>
              </div>
            <img src={target.src} alt={target.alt}/>        
          <div className="description">
        <div>성격: </div>
      <div>태생: </div>
    </div>
  </div>
</div>
)
  }else{

    return null
  }
};

export default ImageInfo;
