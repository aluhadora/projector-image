import './Selector.css';
import AvailableImages from '../../AvailableImages';
import React from "react";
import SelectionList from './SelectionList';
import MainPage from '../MainPage';

function Selector({sendMessage, state, actions, showBrightness, imagesOnly = false}) {

  const [allowedChoice, setAllowedChoice] = React.useState(null);
  const [showPreview, setShowPreview] = React.useState(false);

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

  const items = [...Array(5).keys()].map((i) => {
    return {id: i, display: `Choice ${i+1}`, smallsrc: "images/icons/refresh.png", action: () => setAllowedChoice(i+1)};
  });

  actions = [...actions, {display: showPreview ? "Hide Preview" : "Show Preview", smallsrc: "images/icons/up.png", action: () => setShowPreview(!showPreview)}];


  const imageLists = Object.keys(groups).map((groupName, id ) => {
    const group = {header: groupName, items: groups[groupName]};

    return (
      <SelectionList 
        key={id}
        header={group.header} 
        items={group.items} 
        onClickItem={item => decrementAndSend({imageId: item.id})} 
        selectedPredicate={(item) => item.id === state.imageId}/>
    );
  });

  return (
    <div>
      {showPreview && !imagesOnly && <MainPage state={state} />}

      <div className='Selector'>
        {imageLists}
        {!imagesOnly && <SelectionList 
          header="Speeds" 
          items={AvailableImages.speeds} 
          onClickItem={item => sendMessage({speedId: item.id})}
          overrideImage={"images/icons/rotating_arrows_small.jpg"}
          selectedPredicate={(item) => item.id === state.speedId}/>}
        {showBrightness && !imagesOnly && <SelectionList 
          header="Brightness" 
          items={AvailableImages.brightness} 
          onClickItem={item => sendMessage({brightnessId: item.id})}
          overrideImage={"images/icons/brightness.png"}
          selectedPredicate={(item) => item.id === state.brightnessId}/>}
        {showBrightness && !imagesOnly && <SelectionList 
          header="Fading Timer" 
          items={AvailableImages.fadingTimer} 
          onClickItem={item => sendMessage({fadingTimerId: item.id})}
          overrideImage={"images/icons/brightness.png"}
          selectedPredicate={(item) => item.id === state.fadingTimerId}/>}
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
    </div>

  );
}

export default Selector;
