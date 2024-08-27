import { useState } from 'react';
import defaultColors from './defaultColors.json';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import "./Yarn.css"


function ColorOption({color}) {
    return <div className="colorOption">
                <div className="flowerText">
                    <span style={{marginRight: "5px"}}>{color.name}</span>  
                </div>
                <div style={{display: "inline-block", float: "right"}}>
                    <div style={{backgroundColor: color.hex}} className="colorSquare" />
                </div>
    </div>
}

export default function FlowerDropDown({flower, isPetal}) {
    const [workingFlower, setWorkingFlower] = useState(flower);
    const [query, setQuery] = useState('')

    const filteredColors =
      query === ''
        ? defaultColors
        : defaultColors.filter((color) => {
            return color.name.toLowerCase().includes(query.toLowerCase())
          })    
    
    if (!flower) return null;

    const setColor = (color) => {
        if (!color) return;
        
        if (isPetal) {
            flower.petalColor = color;
            setWorkingFlower({...flower, petalColor: color});
        } else {
            flower.middleColor = color;
            setWorkingFlower({...flower, middleColor: color});
        }
    }

    const colorName = isPetal ? workingFlower.petalColor : workingFlower.middleColor;

    const defaultHex = defaultColors.find(c => c.name === colorName).hex;

    return <Combobox value={colorName} onChange={(e) => setColor(e)} onClose={() => setQuery('')}>
            <ComboboxInput
                className="comboInput"
                aria-label="Assignee"
                onChange={(event) => setQuery(event.target.value)} 
            />
            <ComboboxOptions anchor="bottom" className="border empty:invisible">
                {filteredColors.map((color) => (
                    <ComboboxOption key={defaultColors.indexOf(color)} value={color.name} className="data-[focus]:bg-blue-100">
                        {<ColorOption color={color} />}
                    </ComboboxOption>
                ))}
            </ComboboxOptions>
            <ComboboxButton className="comboButton">
                <div style={{backgroundColor: defaultHex}} className="colorSquare comboPreview" />
                <div className='comboButtonButton' />
            </ComboboxButton>

        </Combobox>;
}