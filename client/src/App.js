import './App.css';
import { useState, useEffect, useCallback } from 'react';
import React from "react";
import MainPage from "./components/MainPage";
import OfflineApp from "./OfflineApp";
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
    if (data.image !== state.image) return true;
    if (data.speed !== state.speed) return true;
    if (data.brightness !== state.brightness) return true;
    if (data.fadingTimer !== state.fadingTimer) return true;
    
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
      smallsrc: "images/refresh.png",
      action: () => sendMessage({refresh: true}),
    },
    { 
      display: "Go Offline",
      smallsrc: "images/refresh.png",
      action: () => window.location.href = '/offline'
    }
  ];
  

  return (
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<MainPage state={state} />} />
        <Route path="/selector" element={<Selector state={state} sendMessage={sendMessage} actions={actions} showBrightness={true}/>} />
      </Routes>
    </React.StrictMode>
  );
}

export default App;
