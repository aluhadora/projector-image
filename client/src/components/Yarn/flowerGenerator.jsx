import { useState } from "react";
import FlowerDisplay from "./flowerDisplay";
import "./Yarn.css"

function FlowerLine({color}) {
    return <div><span style={{width: "100px", display: "inline-block"}}>{color.name} </span><span> {color.weight.toFixed(2)}</span></div>
}

function FlowerLines({colors, showWeights, setShowWeights}) {
    var lines = colors.sort((a,b) => b.weight - a.weight).map(c => <FlowerLine color={c}/>);


    return <div className="section">
        <h1 onClick={() => setShowWeights(!showWeights)}>Color Weights</h1>
        {showWeights && lines}
    </div>
}

function generateFlower(colors) {
    let totalWeight = colors.reduce((acc, c) => acc + c.weight, 0);
    let random = Math.random() * totalWeight;
    let weight = 0;
    let petalColor = colors.find(c => {
        weight += c.weight;
        return weight >= random;
    });

    // pick a random middle color that isn't the same as the petal color
    const filteredColors = colors.filter(c => c.name !== petalColor.name);
    let middleColor = filteredColors[Math.floor(Math.random() * filteredColors.length)];

    return {
        petalColor: petalColor.name,
        middleColor: middleColor.name
    };
}

function acceptFlower(colors, setColors, workingFlower, setWorkingFlower, addFlower) {
    let newWeightedColors = colors.map(c => ({...c, weight: c.name === workingFlower.petalColor ? 1 : c.weight * 2}));
    setColors(newWeightedColors);
    addFlower(workingFlower);
    setWorkingFlower(null);
}

function WorkingFlower({workingFlower, acceptClick, rejectClick, doneClick}) {
    if (!workingFlower) return null;

    return <div>
        <FlowerDisplay flower={workingFlower}/>
        <button onClick={acceptClick}>Accept</button>
        <button onClick={rejectClick}>Reject</button>
        <button onClick={doneClick}>Done</button>
    </div>
}

export default function FlowerGenerator({colors, setColors, addFlower}) {
    const [workingFlower, setWorkingFlower] = useState(null);
    const [showWeights, setShowWeights] = useState(false);
    
    const generateClick = () => {
        setWorkingFlower(generateFlower(colors));
    }

    const acceptClick = () => {
        acceptFlower(colors, setColors, workingFlower, setWorkingFlower, addFlower);
        generateClick();
    }

    const doneClick = () => {
        setWorkingFlower(null);
    }

    return (
        <div style={{color: "white"}}>
            <h1>Flower Generator</h1>

            <FlowerLines colors={colors} showWeights={showWeights} setShowWeights={setShowWeights}/>
            <div className="section">
                {!workingFlower && <button onClick={generateClick}>Generate</button>}
                <WorkingFlower workingFlower={workingFlower} acceptClick={acceptClick} rejectClick={generateClick} doneClick={doneClick} />
            </div>
            
        </div>
    );
}