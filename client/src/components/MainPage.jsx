import '../App.css';
import AvailableImages from '../AvailableImages';
import RotatingImage from './RotatingImage';
import React from "react";

function MainPage({state}) {

  let image = AvailableImages.images[state.image - 1];
  let speed = AvailableImages.speeds[state.speed - 1];

  return (
    <div className="App">
      <RotatingImage image={image} speed={speed ? speed.className : "medium"}/>
    </div>
  );
}

export default MainPage;
