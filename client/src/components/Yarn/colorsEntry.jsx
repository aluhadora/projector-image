import { useState } from "react";

export default function ColorsEntry(colors) {
    const [show, setShow] = useState(false);

    if (!colors) return null;
    console.log(colors);
    const colorsText = colors.colors.map(c => c.name).join('\n');
    
    if (show) {
        return <div>
            <textarea defaultValue={colorsText}/>
            <button onClick={() => setShow(false)}>Save Colors</button>
        </div>
    }
    else {
        return <button onClick={() => setShow(true)}>Edit Colors</button>
    }
}