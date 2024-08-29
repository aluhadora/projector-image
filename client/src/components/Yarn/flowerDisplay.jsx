import { useState } from 'react';
import ColorSquare from './colorSquare';
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

                {removeFlower && <div className="workingButton delete" onClick={() => removeFlower(flower)}></div>}
                {replaceFlower && <div className="workingButton add" onClick={() => replaceFlower(flower)}></div>}
            </div>
        </>
    );
}

function EditFlower({flower, saveFlowerClick, canShiftFlower, shiftFlower}) {
    
    canShiftFlower = canShiftFlower || (() => false);

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
                <button className="detailButton upButton" disabled={!canShiftFlower(flower, -1)} onClick={() => shiftFlower(flower, -1)}></button>
                <button className="detailButton downButton" disabled={!canShiftFlower(flower, 1)} onClick={() => shiftFlower(flower, 1)}></button>
            </div>
        </>
    );
}


export default function FlowerDisplay({flower, removeFlower, replaceFlower, persistFlowers, canShiftFlower, shiftFlower}) {
    const [editing, setEditing] = useState(flower.editing);
    
    const saveFlowerClick = () => {
        flower.editing = false;
        setEditing(false);
        if (persistFlowers) persistFlowers();
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