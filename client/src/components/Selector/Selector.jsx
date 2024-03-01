import './Selector.css';
import AvailableImages from '../../AvailableImages';
import React from "react";
import SelectionList from './SelectionList';

function Selector({socket, state, setState}) {

  function sendMessage(data) {
    data.message = "Selector message sent."
    socket.emit("send_message",  {...state, ...data});
    setState({...state, ...data});
  }

  return (
    <div className='Selector'>
      <SelectionList 
        header="Images" 
        items={AvailableImages.images} 
        onClickItem={item => sendMessage({image: item.id})} 
        selectedPredicate={(item) => item.id === state.image}/>
      <SelectionList 
        header="Speeds" 
        items={AvailableImages.speeds} 
        onClickItem={item => sendMessage({speed: item.id})}
        overrideImage={"images/rotating_arrows_small.jpg"}
        selectedPredicate={(item) => item.id === state.speed}/>
      <SelectionList 
        header="Brightness" 
        items={AvailableImages.brightness} 
        onClickItem={item => sendMessage({brightness: item.id})}
        overrideImage={"images/rotating_arrows_small.jpg"}
        selectedPredicate={(item) => item.id === state.brightness}/>
      <SelectionList 
        header="Fading Timer" 
        items={AvailableImages.fadingTimer} 
        onClickItem={item => sendMessage({fadingTimer: item.id})}
        overrideImage={"images/rotating_arrows_small.jpg"}
        selectedPredicate={(item) => item.id === state.fadingTimer}/>
      <SelectionList 
        header="Actions" 
        items={[{display: "Refresh Clients", smallsrc: "images/refresh.png"}]} 
        onClickItem={_ => sendMessage({refresh: true})} 
        selectedPredicate={_ => false}/>
    </div>
  );
}

export default Selector;
