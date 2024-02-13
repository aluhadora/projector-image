import './App.css';
import { useState } from 'react';
import AvailableImages from './AvailableImages';
import RotatingImage from './components/RotatingImage';
import React from "react";

function App() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(index + 1 >= AvailableImages.images.length ? 0 : index + 1);
    setIndex((index + 1) % AvailableImages.images.length);
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
