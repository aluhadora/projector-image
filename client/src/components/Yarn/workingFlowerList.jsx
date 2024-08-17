import { useState } from "react";
import FlowerDisplay from "./flowerDisplay";
import "./Yarn.css"

function FlowerLine({flower, removeFlower, replaceFlower}) {
    return <FlowerDisplay flower={flower} removeFlower={removeFlower} replaceFlower={replaceFlower} />
}

function FlowerLines({flowers, removeFlower, replaceFlower}) {
    return flowers.map(c => <FlowerLine flower={c} removeFlower={removeFlower} replaceFlower={replaceFlower}/>);
}

export default function WorkingFlowerList({title, defaultShow, flowers, removeFlower, replaceFlower}) {
    const [show, setShow] = useState(defaultShow);
    if (!flowers) return null;

    return (
        <div className="section">
            <h1 onClick={() => setShow(!show)}>{title}</h1>
            {/* <p>{flowers.length}</p> */}
            {show && <div className="detailSection">
                <FlowerLines flowers={flowers} removeFlower={removeFlower} replaceFlower={replaceFlower}/>
            </div>}
            
        </div>
    );
}