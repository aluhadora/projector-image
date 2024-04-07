import './Selector.css';
import AvailableImages from '../../AvailableImages';
import React from "react";
import SelectionList from './SelectionList';

function Selector({sendMessage, state, actions, showBrightness, imagesOnly = false}) {

  const [allowedChoice, setAllowedChoice] = React.useState(null);

  let groups = {};
  AvailableImages.images.forEach((item) => {
    if (!groups[item.group]) groups[item.group] = [];
    groups[item.group].push(item);
  });

  const decrementAndSend = (message) => {
    sendMessage(message);
    setAllowedChoice(allowedChoice - 1);
  }

  if (allowedChoice === 0) return null;

  // const actions = [
  //   {
  //     display: "Refresh Clients",
  //     smallsrc: "images/refresh.png",
  //     action: () => sendMessage({refresh: true}),
  //   },
  //   { 
  //     display: "Go Offline",
  //     smallsrc: "images/refresh.png",
  //     action: () => window.location.href = '/offline'
  //   }
  // ];

  // {!imagesOnly && <SelectionList 
  //   header="Actions" 
  //   items={actions} 
  //   onClickItem={(item) => item.action()} 
  //   selectedPredicate={_ => false}/>}

  const items = [...Array(5).keys()].map((i) => {
    return {id: i, display: `Choice ${i+1}`, smallsrc: "images/refresh.png", action: () => setAllowedChoice(i+1)};
  });


  const imageLists = Object.keys(groups).map((groupName, id ) => {
    const group = {header: groupName, items: groups[groupName]};

    return (
      <SelectionList 
        key={id}
        header={group.header} 
        items={group.items} 
        onClickItem={item => decrementAndSend({image: item.id})} 
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
      {!imagesOnly && <SelectionList 
        header="Speeds" 
        items={AvailableImages.speeds} 
        onClickItem={item => sendMessage({speed: item.id})}
        overrideImage={"images/rotating_arrows_small.jpg"}
        selectedPredicate={(item) => item.id === state.speed}/>}
      {showBrightness && !imagesOnly && <SelectionList 
        header="Brightness" 
        items={AvailableImages.brightness} 
        onClickItem={item => sendMessage({brightness: item.id})}
        overrideImage={"images/brightness.png"}
        selectedPredicate={(item) => item.id === state.brightness}/>}
      {showBrightness && !imagesOnly && <SelectionList 
        header="Fading Timer" 
        items={AvailableImages.fadingTimer} 
        onClickItem={item => sendMessage({fadingTimer: item.id})}
        overrideImage={"images/brightness.png"}
        selectedPredicate={(item) => item.id === state.fadingTimer}/>}
      {!imagesOnly && <SelectionList 
        header="Actions" 
        items={actions} 
        onClickItem={(item) => item.action()} 
        selectedPredicate={_ => false}/>}
      {imagesOnly && allowedChoice === null && <SelectionList 
        header="Choices"
        items={items}
        onClickItem={(item) => item.action()}
        selectedPredicate={_ => false}/>}
    </div>
  );
}

export default Selector;
