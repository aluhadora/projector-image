import { useState } from "react";
import FlowerDisplay from "./flowerDisplay";
import "../Yarn.css"

function generatePetalColor(colors) {
    let totalWeight = colors.reduce((acc, c) => acc + c.weight, 0);
    let random = Math.random() * totalWeight;
    let weight = 0;
    let petalColor = colors.find(c => {
        weight += c.weight;
        return weight >= random;
    });

    return petalColor.name;
}

function generateMiddleColor(colors, petalColorName) {
    const filteredColors = colors.filter(c => c.name !== petalColorName);

    let totalWeight = filteredColors.reduce((acc, c) => acc + c.defaultMiddleWeight, 0);
    let random = Math.random() * totalWeight;
    let weight = 0;
    let middleColor = filteredColors.find(c => {
        weight += c.defaultMiddleWeight;
        return weight >= random;
    });

    return middleColor.name;
}

function generateFlower(colors) {
    const petalColor = generatePetalColor(colors);
    const middleColor = generateMiddleColor(colors, petalColor);
    
    return {
        petalColor: petalColor,
        middleColor: middleColor
    };
}

function acceptFlower(colors, setColors, workingFlower, setWorkingFlower, addFlower) {
    let newWeightedColors = colors.map(c => ({...c, weight: c.name === workingFlower.petalColor ? c.defaultPetalWeight : c.weight * 1.33}));
    setColors(newWeightedColors);
    addFlower(workingFlower);
    setWorkingFlower(null);
    return newWeightedColors;
}

function WorkingFlower({workingFlower, acceptClick, rejectClick, doneClick}) {
    if (!workingFlower) return null;

    return <div>
        <FlowerDisplay flower={workingFlower}/>
        <div style={{height:"10px"}}></div>
        <button onClick={acceptClick}>Accept</button>
        <button onClick={rejectClick}>Reject</button>
        <button onClick={doneClick}>Done</button>
    </div>
}

export default function FlowerGenerator({colors, setColors, addFlower}) {
    const [workingFlower, setWorkingFlower] = useState(null);
    
    const generateClick = () => {
        setWorkingFlower(generateFlower(colors));
    }

    const acceptClick = () => {
        const newColors = acceptFlower(colors, setColors, workingFlower, setWorkingFlower, addFlower);
        setWorkingFlower(generateFlower(newColors || colors))
    }

    const doneClick = () => {
        setWorkingFlower(null);
    }

    return (
        <div style={{color: "white"}}>
            <div className="section">
                <h1>Flower Generator</h1>
                {!workingFlower && <button onClick={generateClick}>Generate</button>}
                <WorkingFlower workingFlower={workingFlower} acceptClick={acceptClick} rejectClick={generateClick} doneClick={doneClick} />
            </div>
            
        </div>
    );
}