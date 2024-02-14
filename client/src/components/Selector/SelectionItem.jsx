import './Selector.css';
import React from "react";
import RotatingImage from '../RotatingImage';

function SelectionItem({image, selected, speed}) {
  return (
    <div className={"Selection-item " + (selected ? "selected" : "")}>
        <span> 
            <RotatingImage image={image} size="small" speed={speed || "stop"}/>
            <span>{image.alt}</span>
        </span>
    </div>
  );
}

export default SelectionItem;
