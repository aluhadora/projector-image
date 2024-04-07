import '../App.css';
import AvailableImages from '../AvailableImages';
import Planet from './Planet';
import RotatingImage from './RotatingImage';
import React from "react";

function ComponentFromType({image, size, speed, classnames}) {
  if (!image.type) {
    return <RotatingImage image={image} size="fullSize" classNames={classnames}/>
  }
  if (image.type === "planet") return <Planet image={image} speed={speed} />;
}

function MainPage({state}) {

  let image = AvailableImages.images[state.image - 1];
  let speed = AvailableImages.speeds[state.speed - 1] || {};
  let brightness = AvailableImages.brightness[state.brightness - 1] || {};
  let fadingTimer = AvailableImages.fadingTimer[state.fadingTimer - 1] || {};

  let classNames = [speed.className, "fullSize", brightness.className, fadingTimer.className];
  

  return (
    <div className="App">
      <ComponentFromType image={image} size="fullSize" speed={speed} classnames={classNames}/>
    </div>
  );
}

export default MainPage;
