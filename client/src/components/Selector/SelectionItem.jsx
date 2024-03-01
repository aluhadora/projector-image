import './Selector.css';
import React from "react";
import RotatingImage from '../RotatingImage';

function SelectionItem({item, selected}) {
  if (!item) return <div/>;

  return (
    <div className={"Selection-item " + (selected ? "selected" : "")}>
        <span> 
            <RotatingImage image={item} size="small" classNames={["small", item.className]}/>
            <span>{item.display}</span>
        </span>
    </div>
  );
}

export default SelectionItem;
