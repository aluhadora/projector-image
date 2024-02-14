import '../App.css';
import AvailableImages from '../AvailableImages';
import RotatingImage from './RotatingImage';
import React from "react";

function MainPage({state}) {

  let image = AvailableImages.images[state.index];
  let speed = AvailableImages.speeds[state.speed];

  return (
    <div className="App">
      <RotatingImage image={image} speed={speed ? speed.className : "medium"}/>
    </div>
  );
}

export default MainPage;
