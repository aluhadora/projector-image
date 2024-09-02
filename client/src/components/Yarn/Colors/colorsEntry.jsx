import { useState } from "react";
import "../Yarn.css"
import ColorLine from "./colorLine";

function ColorLines({colors, persistColors}) {
    console.log("Color Lines", colors);

    if (!colors) return null;
    const lines = colors.map(c => <ColorLine key={colors.indexOf(c)} color={c} persistColors={persistColors} />);

    return <div>
        {lines}
    </div>
}

function exportState() {
    const colors = JSON.parse(localStorage.getItem('yarnColors'));
    const flowers = JSON.parse(localStorage.getItem('yarnFlowers'));
    const state = {colors, flowers};
    const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const a = document.createElement('a');
    a.setAttribute("href", data);
    a.setAttribute("download", "yarnState.json");
    a.click();
}

function importState () {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => { 
        const file = e.target.files[0]; 
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const state = JSON.parse(text);
            localStorage.setItem('yarnColors', JSON.stringify(state.colors));
            localStorage.setItem('yarnFlowers', JSON.stringify(state.flowers));
            window.location.reload();
        }
        reader.readAsText(file);
    }
    input.click();
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
            <button onClick={() => exportState()}>Export</button>
            <button onClick={() => importState()}>Import</button>
            </div>
        </div>
    }
    else {
        return <button onClick={() => setShow(true)}>Edit Colors</button>
    }
}