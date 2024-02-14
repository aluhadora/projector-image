import '../App.css';
import { useState, useEffect } from 'react';
import AvailableImages from '../AvailableImages';
import React from "react";
import io from "socket.io-client";
import SelectionItem from '../components/SelectionItem';
const socket = io.connect("/");

function Selector() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("Received message: ", data);
      updateIndex(data);
    });
  }, [socket]);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => updateIndex(data));
  }, []);

  function sendMessage(destinationIndex) {
    socket.emit("send_message", { message: "Switch image", index: destinationIndex });
    setIndex(destinationIndex);
  }

  function updateIndex(data) {
    setIndex(data.index);
  }

  const List = ({ images }) => (
    <ul>
        {images.map(item => (
            <li key={item.index} data={item.index} onClick={() => sendMessage(item.index)}>
            <SelectionItem image={item} selected={item.index == index}/></li>
        ))}
  </ul>
  );

  return (
    <div color='white' width="200px">
      <List images={AvailableImages.images} />
    </div>
  );
}

export default Selector;
