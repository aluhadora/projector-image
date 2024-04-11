import './App.css';
import { useState, useEffect, useCallback } from 'react';
import React from "react";
import MainPage from "./components/MainPage";
import {
  Route,
  Routes,
} from "react-router-dom";
import Selector from './components/Selector/Selector';
import io from "socket.io-client";
const socket = io.connect("/");

function App() {
  const [state, setState] = useState({});

  function isDirty(data, state) {
    if (data.imageId !== state.imageId) return true;
    if (data.speedId !== state.speedId) return true;
    if (data.brightnessId !== state.brightnessId) return true;
    if (data.fadingTimerId !== state.fadingTimerId) return true;
    if (data.show3d !== state.show3d) return true;
    if (data.pointLight !== state.pointLight) return true;
    if (data.showStarfield !== state.showStarfield) return true;
    
    return false;
  }

  function sendMessage(data) {
    data.message = "Selector message sent."
    socket.emit("send_message",  {...state, ...data});
    setState({...state, ...data});
  }

  const receivedState = useCallback((data) => {
    if (data.refresh) window.location.reload();
    if (!isDirty(data, state)) return;
    
    console.log("received", state, data);
    setState({...state, ...data});

  }, [state]);

  useEffect(() => {
    socket.on("receive_message", receivedState);
    return () => socket.off("receive_message", receivedState);
  }, [receivedState]);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => receivedState(data));
  }, [receivedState]);

  const actions = [
    {
      display: "Refresh Clients",
      smallsrc: "images/icons/refresh.png",
      action: () => sendMessage({refresh: true}),
    },
    { 
      display: "Go Offline",
      smallsrc: "images/icons/right.png",
      action: () => window.location.href = '/offline'
    },
    { 
      display: "Go reduced",
      smallsrc: "images/icons/right.png",
      action: () => window.location.href = '/reducedselector'
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
      display: state.showStarfield ? "Hide Starfield" : "Show Starfield",
      smallsrc: "images/icons/right.png",
      action: () => sendMessage({showStarfield: !state.showStarfield})
    }

  ];
  

  return (
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<MainPage state={state} />} />
        <Route path="/selector" element={<Selector state={state} sendMessage={sendMessage} actions={actions} showBrightness={true}/>} />
        <Route path="/reducedselector" element={<Selector state={state} sendMessage={sendMessage} actions={actions} showBrightness={false} imagesOnly={true}/>} />
      </Routes>
    </React.StrictMode>
  );
}

export default App;
