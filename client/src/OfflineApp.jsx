import './App.css';
import { useState } from 'react';
import React from "react";
import MainPage from "./components/MainPage";
import Selector from './components/Selector/Selector';

function OfflineApp() {
  const [state, setState] = useState({imageId: 1, speedId: 1, brightnessId: 1, fadingTimerId: 1, show3d: true, pointLight: true, showStarfield: true, showSelector: true});

  function sendMessage(data) {
    setState({...state, ...data});
  }

  const actions = [
    { 
      display: "Close Selector",
      smallsrc: "images/icons/up.png",
      action: () => sendMessage({showSelector: false})
    },
    { 
      display: "Go online",
      smallsrc: "images/icons/right.png",
      action: () => window.location.href = '/selector'
    },
    {
      display: state.show3d ? "Turn off 3d" : "Turn on 3d",
      smallsrc: "images/icons/right.png",
      action: () => sendMessage({show3d: !state.show3d})
    },
    {
      display: state.pointLight ? "Switch to ambient" : "Switch to point light",
      smallsrc: "images/icons/right.png",
      action: () => sendMessage({pointLight: !state.pointLight})
    },
    {
      display: state.inverted ? "Turn off inverted" : "Turn on inverted",
      smallsrc: "images/icons/right.png",
      action: () => sendMessage({inverted: !state.inverted})
    },
    {
      display: state.showStarfield ? "Hide Starfield" : "Show Starfield",
      smallsrc: "images/icons/right.png",
      action: () => sendMessage({showStarfield: !state.showStarfield})
    },
    {
      display: state.showMoons ? "Hide Moons" : "Show Moons",
      smallsrc: "images/icons/right.png",
      action: () => sendMessage({showMoons: !state.showMoons})
    },
    {
      display: "Go to yarn app",
      smallsrc: "images/icons/right.png",
      action: () => window.location.href = '/yarn'
    },
    {
      display: "Go to quiz app",
      smallsrc: "images/icons/right.png",
      action: () => window.location.href = '/quiz'
    }
  ];

  return (
    <div>
      <div onClick={() => sendMessage({showSelector: !state.showSelector})}>
        <MainPage state={state} />
      </div>
      {state.showSelector && <Selector state={state} sendMessage={sendMessage} actions={actions}/>}
    </div>
    
  );
}

export default OfflineApp;
