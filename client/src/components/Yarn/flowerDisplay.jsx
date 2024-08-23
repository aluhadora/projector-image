import defaultColors from './defaultColors.json';

export default function FlowerDisplay({flower, removeFlower, replaceFlower}) {
    if (!flower) return null;

    const petalHex = defaultColors.find(c => c.name === flower.petalColor).hex;
    const middleHex = defaultColors.find(c => c.name === flower.middleColor).hex;

    return (
        <div className="flowerDisplay">
            <div className="flowerText">
                <span style={{marginRight: "5px"}}>{flower.petalColor}</span>  
                <span>/</span>  
                <span style={{marginLeft: "5px", marginRight: "20px"}}>{flower.middleColor}</span>
            </div>
            <div style={{display: "inline-block", float: "right"}}>
                <div style={{backgroundColor: petalHex, borderRadius: "10px", marginLeft: "5px", marginRight: "5px", height: "25px", width: "25px", display: "inline-block"}}></div>
                <div style={{backgroundColor: middleHex, borderRadius: "10px", marginLeft: "5px", marginRight: "5px", height: "25px", width: "25px", display: "inline-block"}}></div>
                {removeFlower && <div style={{backgroundImage: "url(images/icons/delete.png)", backgroundSize: "cover", borderRadius: "10px", marginLeft: "10px", marginRight: "5px", height: "25px", width: "25px", display: "inline-block"}} onClick={() => removeFlower(flower)}></div>}
                {replaceFlower && <div style={{backgroundImage: "url(images/icons/add.png)", backgroundSize: "cover", borderRadius: "10px", marginLeft: "10px", marginRight: "5px", height: "25px", width: "25px", display: "inline-block"}} onClick={() => replaceFlower(flower)}></div>}
            </div>
            

        </div>
    );
}