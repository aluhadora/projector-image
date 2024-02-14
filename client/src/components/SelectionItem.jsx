import '../App.css';
import React from "react";

function SelectionItem({image, selected}) {
  return (
    <div className={"Selection-item " + (selected ? "selected" : "")} style={{color: "white", display: "flex", alignItems: "center", padding: "5px"}} >
        <span style={{color: "white", display: "flex", alignItems: "center"}}> 
            <img src={image.src} height="40px" />
            <span style={{paddingLeft: "5px"}}>{image.alt}</span>
        </span>
    </div>
  );
}

export default SelectionItem;
