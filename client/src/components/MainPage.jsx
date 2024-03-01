import '../App.css';
import AvailableImages from '../AvailableImages';
import RotatingImage from './RotatingImage';
import React from "react";

function MainPage({state}) {

  let image = AvailableImages.images[state.image - 1];
  let speed = AvailableImages.speeds[state.speed - 1] || {};
  let brightness = AvailableImages.brightness[state.brightness - 1] || {};
  let fadingTimer = AvailableImages.fadingTimer[state.fadingTimer - 1] || {};

  let classNames = [speed.className, "fullSize", brightness.className, fadingTimer.className];

  return (
    <div className="App">
      <RotatingImage image={image} size="fullSize" classNames={classNames}/>
    </div>
  );
}

export default MainPage;
