import defaultColors from './defaultColors.json';
import './Yarn.css';

export default function ColorSquare({flower, isPetal}) {
    const colorHex = defaultColors.find(c => c.name === (isPetal ? flower.petalColor: flower.middleColor)).hex;
    
    if (!flower) return null;

    return <div style={{backgroundColor: colorHex}}
                className="colorSquare"/>
}