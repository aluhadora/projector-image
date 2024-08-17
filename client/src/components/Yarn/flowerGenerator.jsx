import { useState } from "react";

function FlowerLine({color}) {
    return <div><span style={{width: "100px", display: "inline-block"}}>{color.name} </span><span> {color.weight.toFixed(2)}</span></div>
}

function FlowerLines({colors}) {
    return colors.sort((a,b) => b.weight - a.weight).map(c => <FlowerLine color={c}/>);
}

function generateFlower(colors, setColors) {
    console.log("generateFlower", colors, setColors);

    // pick a random color based on the weights from the state
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

    // petalColor.weight = 1;

    // colors.forEach(c => {
    //     if (c !== petalColor) {
    //         c.weight *= 1.01;
    //     }
    // });

    // instead of mutating the colors object build a new object to set Colors to
    // let newWeightedColors = colors.map(c => ({...c, weight: c.name === petalColor.name ? 1 : c.weight * 1.01}));
    // setColors(newWeightedColors);

    return {
        petalColor: petalColor.name,
        middleColor: middleColor.name
    };
}

function acceptFlower(colors, setColors, workingFlower, setWorkingFlower, addFlower) {
    let newWeightedColors = colors.map(c => ({...c, weight: c.name === workingFlower.petalColor.name ? 1 : c.weight * 1.01}));
    setColors(newWeightedColors);
    addFlower(workingFlower);
    setWorkingFlower(null);
}

function WorkingFlower({workingFlower, acceptClick, rejectClick, doneClick}) {
    if (!workingFlower) return null;

    return <div>
        <div style={{backgroundColor: "#333", borderRadius: "10px", margin: "10px", padding: "10px"}}>{workingFlower.petalColor}:{workingFlower.middleColor}</div>
        <button onClick={acceptClick}>Accept</button>
        <button onClick={rejectClick}>Reject</button>
        <button onClick={doneClick}>Done</button>
    </div>
}

export default function FlowerGenerator({colors, setColors, addFlower}) {
    const [workingFlower, setWorkingFlower] = useState(null);
    
    const generateClick = () => {
        setWorkingFlower(generateFlower(colors, setColors));
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
            <div style={{backgroundColor: "#111", padding: "10px", width: "550px", margin: "10px", borderRadius: "10px"}}>
                <FlowerLines colors={colors}/>
            </div>
            <div style={{backgroundColor: "#111", padding: "10px", width: "550px", margin: "10px", borderRadius: "10px"}}>
                {!workingFlower && <button onClick={generateClick}>Generate</button>}
                <WorkingFlower workingFlower={workingFlower} acceptClick={acceptClick} rejectClick={generateClick} doneClick={doneClick} />
            </div>
            
        </div>
    );
}