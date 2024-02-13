import './App.css';
import { useState, useEffect } from 'react';
import AvailableImages from './AvailableImages';
import RotatingImage from './components/RotatingImage';
import React from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");

function App() {
  function sendMessage() {
    socket.emit("send_message", { message: "Switch image" });
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setIndex(index + 1 >= AvailableImages.images.length ? 0 : index + 1);
    });
  }, [socket]);

  const [index, setIndex] = useState(0);

  function handleClick() {
    sendMessage();
    setIndex(index + 1 >= AvailableImages.images.length ? 0 : index + 1);
    // setIndex((index + 1) % AvailableImages.images.length);
  }

  let image = AvailableImages.images[index];


  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => console.log(data.message));
  }, []);



  return (
    <div className="App">
      <RotatingImage image={image} onClick={handleClick}/>
    </div>
  );
}

export default App;
