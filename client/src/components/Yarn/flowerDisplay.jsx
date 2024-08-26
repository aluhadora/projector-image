import { useState } from 'react';
import defaultColors from './defaultColors.json';
import ColorSquare from './colorSquare';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import FlowerDropDown from './flowerDropDown';


function ShowOnlyFlower({flower, removeFlower, replaceFlower}) {
    return (
        <>
            <div className="flowerText">
                <span style={{marginRight: "5px"}}>{flower.petalColor}</span>  
                <span>/</span>  
                <span style={{marginLeft: "5px", marginRight: "20px"}}>{flower.middleColor}</span>
            </div>
            <div style={{display: "inline-block", float: "right"}}>
                <ColorSquare flower={flower} isPetal={true}/>
                <ColorSquare flower={flower} isPetal={false}/>
                {removeFlower && <div style={{backgroundImage: "url(images/icons/delete.png)", backgroundSize: "cover", borderRadius: "10px", marginLeft: "10px", marginRight: "5px", height: "25px", width: "25px", display: "inline-block"}} onClick={() => removeFlower(flower)}></div>}
                {replaceFlower && <div style={{backgroundImage: "url(images/icons/add.png)", backgroundSize: "cover", borderRadius: "10px", marginLeft: "10px", marginRight: "5px", height: "25px", width: "25px", display: "inline-block"}} onClick={() => replaceFlower(flower)}></div>}
            </div>
        </>
    );
}

function EditFlower({flower, saveFlowerClick, canShiftFlower, shiftFlower}) {
    
    console.log("EditFlower", flower, saveFlowerClick, canShiftFlower, shiftFlower);

    return (
        <>
            <div style={{paddingLeft: "5px"}}>
                <FlowerDropDown flower={flower} isPetal={true} />
            </div>

            <div style={{paddingLeft: "5px"}}>
                <FlowerDropDown flower={flower} isPetal={false} /> 
            </div>

            <div style={{paddingTop: "10px"}}>
                <button className="detailButton" onClick={saveFlowerClick}>Save</button>
                <button className="detailButton" disabled={!canShiftFlower(flower, -1)} onClick={() => shiftFlower(flower, -1)}>🢁</button>
                <button className="detailButton" disabled={!canShiftFlower(flower, 1)} onClick={() => shiftFlower(flower, 1)}>🢃</button>
            </div>
        </>
    );
}


export default function FlowerDisplay({flower, removeFlower, replaceFlower, persistFlowers, canShiftFlower, shiftFlower}) {
    const [editing, setEditing] = useState(flower.editing);
    
    const saveFlowerClick = () => {
        flower.editing = false;
        setEditing(false);
        persistFlowers();
    }

    const toggleEditing = () => {
        flower.editing = !editing;
        setEditing(!editing);
    }

    if (!flower) return null;

    return <div className="flowerDisplay" onDoubleClick={() => toggleEditing()}>
        {(flower.editing)
            ? <EditFlower flower={flower} saveFlowerClick={saveFlowerClick} canShiftFlower={canShiftFlower} shiftFlower={shiftFlower} />
            : <ShowOnlyFlower flower={flower} removeFlower={removeFlower} replaceFlower={replaceFlower} />
        }
    </div>
    
    

}