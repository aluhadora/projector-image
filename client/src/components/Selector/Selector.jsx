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
        onClickItem={sendMessage} 
        selectedPredicate={(item) => item.index === state.index}/>
      <SelectionList 
        header="Speeds" 
        items={AvailableImages.speeds} 
        onClickItem={item => sendMessage({speed: item.index})}
        overrideImage={"images/rotating_arrows_small.jpg"}
        speed={(item) => item.className}
        selectedPredicate={(item) => item.index === state.speed}/>
      <SelectionList 
        header="Actions" 
        items={[{alt: "Refresh Clients", smallsrc: "images/refresh.png"}]} 
        onClickItem={_ => sendMessage({refresh: true})} 
        selectedPredicate={(item) => item.index === state.index}/>
    </div>
  );
}

export default Selector;
