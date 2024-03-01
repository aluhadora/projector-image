import './App.css';
import { useState } from 'react';
import React from "react";
import MainPage from "./components/MainPage";
import Selector from './components/Selector/Selector';

function OfflineApp() {
  const [state, setState] = useState({});

  if (!state || !state.image) {
    setState({image: 1, speed: 1, brightness: 1, fadingTimer: 1, showSelector: false});
  }

  function sendMessage(data) {
    setState({...state, ...data});
  }

  const actions = [
    { 
      display: "Close Selector",
      smallsrc: "images/up.png",
      action: () => sendMessage({showSelector: false})
    },
    { 
      display: "Go online",
      smallsrc: "images/right.png",
      action: () => window.location.href = '/selector'
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
