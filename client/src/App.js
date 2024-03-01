import './App.css';
import { useState, useEffect, useCallback } from 'react';
import React from "react";
import MainPage from "./components/MainPage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Selector from './components/Selector/Selector';
import io from "socket.io-client";
const socket = io.connect("/");

function App() {
  const [state, setState] = useState({});

  function isDirty(data, state) {
    if (data.image != state.image) return true;
    if (data.speed != state.speed) return true;
    if (data.brightness != state.brightness) return true;
    if (data.fadingTimer != state.fadingTimer) return true;
    
    return false;
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
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage state={state} />,
    },
    {
      path: "/selector",
      element: <Selector state={state} setState={setState} socket={socket} />,
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
