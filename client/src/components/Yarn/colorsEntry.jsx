import { useState } from "react";
import "./Yarn.css"

export default function ColorsEntry({colors, resetState}) {
    const [show, setShow] = useState(false);

    if (!colors) return null;
    const colorsText = colors.map(c => c.name).join('\n');

    const reset = () => {
        resetState();
        setShow(false);
    }
    
    if (show) {
        return <div>
            <textarea value={colorsText}/>
            <button onClick={() => reset()}>Reset State</button>
        </div>
    }
    else {
        return <button onClick={() => setShow(true)}>Edit Colors</button>
    }
}