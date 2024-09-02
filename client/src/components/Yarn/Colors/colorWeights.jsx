import { useState } from "react";
import "../Yarn.css"
import ColorsEntry from "./colorsEntry";

function ColorLine({color, flowers}) {
    const totalCount = flowers.filter(f => f.petalColor === color.name).length;
    const uncompletedCount = flowers.filter(f => f.petalColor === color.name && !f.complete).length;
    return <div style={{width: 450}}>
        <span className="weightField">{color.name} </span>
        <span className="weightField"> {color.weight.toFixed(2)}</span>
        <span className="weightField">{uncompletedCount}/{totalCount}</span>
        {/* <span className="weightField">{color.defaultPetalWeight.toFixed(2)}/{color.defaultMiddleWeight.toFixed(2)}</span> */}
    </div>
}

function LegendLine() {
    return <div style={{marginBottom: "5px", width: 450}}>
        <span className="weightField">Color</span>
        <span className="weightField">Weight</span>
        <span className="weightField">Working/Total</span>
        {/* <span className="weightField">Default Petal/Middle Weights</span> */}
    </div>
}

function ColorLines({colors, showWeights, setShowWeights, flowers, persistColors}) {
    var lines = colors.sort((a,b) => b.weight - a.weight).map(c => <ColorLine color={c} flowers={flowers} />);


    return <div className="section">
        <h1 onClick={() => setShowWeights(!showWeights)}>Color Weights</h1>
        {showWeights && <LegendLine />}
        {showWeights && lines}
        {showWeights && <ColorsEntry colors={colors} persistColors={persistColors} />}
    </div>
}

export default function ColorWeights({colors, flowers, persistColors}) {
    const [showWeights, setShowWeights] = useState(false);
    
    return (
        <div style={{color: "white"}}>
            <ColorLines colors={colors} showWeights={showWeights} setShowWeights={setShowWeights} flowers={flowers} persistColors={persistColors}/>
        </div>
    );
}