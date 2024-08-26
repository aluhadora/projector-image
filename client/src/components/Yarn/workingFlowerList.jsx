import { useState } from "react";
import FlowerDisplay from "./flowerDisplay";
import "./Yarn.css"

function FlowerLine({flower, removeFlower, replaceFlower, persistFlowers}) {
    return <FlowerDisplay flower={flower} removeFlower={removeFlower} replaceFlower={replaceFlower} persistFlowers={persistFlowers} />
}

function FlowerLines({flowers, removeFlower, replaceFlower, persistFlowers}) {
    return flowers.map(c => <FlowerLine flower={c} removeFlower={removeFlower} replaceFlower={replaceFlower} persistFlowers={persistFlowers}/>);
}

export default function WorkingFlowerList({title, defaultShow, flowers, removeFlower, replaceFlower, persistFlowers}) {
    const [show, setShow] = useState(defaultShow);
    if (!flowers) return null;

const styles = {
    container: {
      display: 'flex',
      justifyContent: 'space-between', // Space between the h1 and h4
      alignItems: 'flex-end', // Aligns the bottom of h1 and h4
      maxWidth: "455px"
    },
    h1: {
      margin: 0, // Reset margin to avoid misalignment
      display: "flex",
    },
    h4: {
      margin: 0, // Reset margin to avoid misalignment
      display: "flex",
    },
  };        

    return (
        <div className="section">
            <div style={styles.container}>
                <h1 style={styles.h1} onClick={() => setShow(!show)}>{title}</h1>
                {show && <h4 style={styles.h4}>{flowers.length}</h4>}
            </div>
            {/* <p>{flowers.length}</p> */}
            {show && <div className="detailSection">
                <FlowerLines flowers={flowers} removeFlower={removeFlower} replaceFlower={replaceFlower} persistFlowers={persistFlowers}/>
            </div>}
            
        </div>
    );
}