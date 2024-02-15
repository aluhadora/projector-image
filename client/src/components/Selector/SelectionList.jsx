import './Selector.css';
import React from "react";
import SelectionItem from './SelectionItem';

function SelectionList({header, items, onClickItem, selectedPredicate, speed, overrideImage, overrideText}) {
    if (!items) return <div/>;

    items.forEach((item) => {
        item.alt = item.alt || item.className;
        if (overrideImage) item.smallsrc = overrideImage;
        if (overrideText) item.alt = overrideText;
    });

  return (
    <ul className="Selection noselect">
        <li key={-1}><div className='Selection-header'>{header}</div></li>
        {items.map(item => (
            <li key={item.id} data={item.id} onClick={() => onClickItem(item)}>
            <SelectionItem image={item} selected={selectedPredicate(item)} speed={speed ? speed(item) : "stop"}/></li>
        ))}
    </ul>
  );
}

export default SelectionList;
