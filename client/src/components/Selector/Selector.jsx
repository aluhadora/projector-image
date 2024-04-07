import './Selector.css';
import AvailableImages from '../../AvailableImages';
import React from "react";
import SelectionList from './SelectionList';

function Selector({sendMessage, state, actions, showBrightness}) {

  let groups = {};
  AvailableImages.images.forEach((item) => {
    if (!groups[item.group]) groups[item.group] = [];
    groups[item.group].push(item);
  });

  const imageLists = Object.keys(groups).map((groupName, id ) => {
    const group = {header: groupName, items: groups[groupName]};
    
    return (
      <SelectionList 
        key={id}
        header={group.header} 
        items={group.items} 
        onClickItem={item => sendMessage({image: item.id})} 
        selectedPredicate={(item) => item.id === state.image}/>
    );
  });

  return (
    <div className='Selector'>
      {imageLists}
      {/* <SelectionList 
        header="Images" 
        items={AvailableImages.images} 
        onClickItem={item => sendMessage({image: item.id})} 
        selectedPredicate={(item) => item.id === state.image}/> */}
      <SelectionList 
        header="Speeds" 
        items={AvailableImages.speeds} 
        onClickItem={item => sendMessage({speed: item.id})}
        overrideImage={"images/rotating_arrows_small.jpg"}
        selectedPredicate={(item) => item.id === state.speed}/>
      {showBrightness && <SelectionList 
        header="Brightness" 
        items={AvailableImages.brightness} 
        onClickItem={item => sendMessage({brightness: item.id})}
        overrideImage={"images/brightness.png"}
        selectedPredicate={(item) => item.id === state.brightness}/>}
      {showBrightness && <SelectionList 
        header="Fading Timer" 
        items={AvailableImages.fadingTimer} 
        onClickItem={item => sendMessage({fadingTimer: item.id})}
        overrideImage={"images/brightness.png"}
        selectedPredicate={(item) => item.id === state.fadingTimer}/>}
      <SelectionList 
        header="Actions" 
        items={actions} 
        onClickItem={(item) => item.action()} 
        selectedPredicate={_ => false}/>
    </div>
  );
}

export default Selector;
