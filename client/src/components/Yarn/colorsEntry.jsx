import { useState } from "react";
import NumericInput from 'react-numeric-input';
import "./Yarn.css"

function ColorLines({colors, persistColors}) {
    console.log("Color Lines", colors);

    if (!colors) return null;
    const lines = colors.map(c => <ColorLine key={colors.indexOf(c)} color={c} persistColors={persistColors} />);

    return <div>
        {lines}
    </div>
}

function ShowColorLine({color}) {
    
    return <>
        <div className="weightField">
            {color.name}
        </div>
        <div style={{backgroundColor: color.hex}} className="colorSquare"/>
        <div className="weightField" style={{paddingLeft: "15px"}}>
            {color.defaultPetalWeight.toFixed(2)} / {color.defaultMiddleWeight.toFixed(2)}
        </div>
    </>
}

function EditColorLine({color, saveColorClick}) {
    
    const rowStyle = { height: "35px" };
    const labelStyle = { width: "175px" };
    const headerStyle = { height: "50px", fontSize: "25px" };

    return <>
        <div>
            <div style={headerStyle}>
                <div className="weightField" style={labelStyle}>
                    {color.name}
                </div>
                <input type="color" className="bigColorSquare" value={color.hex} onChange={e => color.hex = e.target.value} />
            </div>
            <div style={rowStyle}>
                <div className="weightField" style={labelStyle}>Default Petal Weight</div>   
                <NumericInput className="numberInput" step={0.1} precision={2} value={color.defaultPetalWeight} onChange={value => color.defaultPetalWeight = value}/>
            </div>
            <div style={rowStyle}>
                <div className="weightField" style={labelStyle}>Default Middle Weight</div>        
                <NumericInput className="numberInput" step={0.1} precision={2} value={color.defaultMiddleWeight} onChange={value => color.defaultMiddleWeight = value}/>     
            </div>
            <div style={rowStyle}>
                <div className="weightField" style={labelStyle}>Current Petal Weight</div>
                <NumericInput className="numberInput" step={0.1} precision={2} value={color.weight} onChange={value => color.weight = value}/>
            </div>
            <div style={{paddingTop: "10px"}}>
                <button className="detailButton" onClick={saveColorClick}>Save</button>
            </div>
        </div>
    </>
}


function ColorLine({color, persistColors}) {
    const [editing, setEditing] = useState(false);

    const saveColorClick = () => {
        setEditing(false);
        persistColors();
    }

    return <div className="flowerDisplay" onDoubleClick={() => setEditing(true)}>
        {editing 
            ? <EditColorLine color={color} saveColorClick={saveColorClick} />
            : <ShowColorLine color={color} />
        }
    </div>
    
}

export default function ColorsEntry({colors, persistColors}) {
    const [show, setShow] = useState(false);

    if (!colors) return null;

    // const reset = () => {
    //     resetState();
    //     setShow(false);
    // }
    
    if (show) {
        return <div className="section">
            <ColorLines colors={colors} persistColors={persistColors} />
            {/* <button onClick={() => reset()}>Reset State</button> */}
            <div style={{paddingTop: 10}}>
            <button onClick={() => setShow(false)}>Close</button>
            </div>
        </div>
    }
    else {
        return <button onClick={() => setShow(true)}>Edit Colors</button>
    }
}