import FlowerDisplay from "./flowerDisplay";
import "./Yarn.css"

function FlowerLine({flower, removeFlower}) {
    return <FlowerDisplay flower={flower} removeFlower={removeFlower} />
}

function FlowerLines({flowers, removeFlower}) {
    return flowers.map(c => <FlowerLine flower={c} removeFlower={removeFlower}/>);
}

export default function FlowerHistoryList({flowers, removeFlower}) {
    if (!flowers) return null;

    return (
        <div className="section">
            <h1>Working List</h1>
            <div className="detailSection">
                <FlowerLines flowers={flowers} removeFlower={removeFlower}/>
            </div>
            
        </div>
    );
}