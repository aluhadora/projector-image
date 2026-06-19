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
import buildActions from './actions';
const socket = io.connect("/");

function App() {
  const [state, setState] = useState({});

  function isDirty(data, state) {
    let dirty = false;
    for (let key in data) {
      if (data[key] !== state[key]) {
        dirty = true;
        break;
      }
    }

    return dirty;
  }

  function sendMessage(data) {
    data.message = "Selector message sent."
    socket.emit("send_message",  {...state, ...data});
    console.log("Sending", {...state, ...data});
    setState({...state, ...data});
  }

  const receivedState = useCallback((data) => {
    if (data.refresh) window.location.reload();
    if (!isDirty(data, state)) return;
    
    console.log("received", data, "from state", state);
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

  const callbacks = {stuff: p => console.log(p)};

  const actions = buildActions(state, sendMessage, callbacks);
 
  return (
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<MainPage state={state} callbacks={callbacks} />} />
        <Route path="/selector" element={<Selector callbacks={callbacks} state={state} sendMessage={sendMessage} actions={actions} showBrightness={true}/>} />
        <Route path="/reducedselector" element={<Selector state={state} sendMessage={sendMessage} actions={actions} showBrightness={false} imagesOnly={true}/>} />
      </Routes>
    </React.StrictMode>
  );
}

export default App;
