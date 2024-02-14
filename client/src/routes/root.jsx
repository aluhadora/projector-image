import '../App.css';
import { useState, useEffect } from 'react';
import AvailableImages from '../AvailableImages';
import RotatingImage from '../components/RotatingImage';
import React from "react";
import io from "socket.io-client";
const socket = io.connect("/");

function Root() {
  const [index, setIndex] = useState(0);

  function updateImage(data) {
    setIndex(data.index);
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("Received message: ", data);
      updateImage(data);
    });
  }, [socket]);

  let image = AvailableImages.images[index];

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => updateImage(data));
  }, []);


  return (
    <div className="App">
      <RotatingImage image={image}/>
    </div>
  );
}

export default Root;
