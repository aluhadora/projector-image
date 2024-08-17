import { useState } from "react";

function FlowerLine({flower, removeFlower}) {
    return <div style={{backgroundColor: "#333", borderRadius: "10px", margin: "10px", padding: "10px"}} onClick={() => removeFlower(flower)}><span style={{display: "inline-block"}}>{flower.petalColor}:{flower.middleColor}</span></div>
}

function FlowerLines({flowers, removeFlower}) {
    console.log("FlowerLines", flowers);
    return flowers.map(c => <FlowerLine flower={c} removeFlower={removeFlower}/>);
}


export default function WorkingFlowerList({flowers, removeFlower}) {
    if (!flowers) return null;

    console.log("WorkingFlowerList", flowers);

    return (
        <div style={{backgroundColor: "#111", padding: "10px", width: "550px", margin: "10px", borderRadius: "10px", color: "white"}}>
            <h1>Working List</h1>
            <div style={{backgroundColor: "#222", padding: "10px", width: "350px", borderRadius: "10px"}}>
                <FlowerLines flowers={flowers} removeFlower={removeFlower}/>
            </div>
            
        </div>
    );
}