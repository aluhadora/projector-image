import '../App.css';
import AvailableImages from '../AvailableImages';
import Planet from './Planet';
import RotatingImage from './RotatingImage';
import React from "react";

function ComponentFromType({image, speed, classnames, brightness, show3d, state}) {
  // console.log("ComponentFromType", image, show3d, state, classnames)
  if (!show3d) {
    return <RotatingImage image={image} size="fullSize" classNames={classnames}/>
  }
  return <Planet state={state} image={image} speed={speed} brightness={brightness} classNames={classnames} />;
}

function MainPage({state}) {

  let image = AvailableImages.images.find(i => i.id === state.imageId) || {};
  let speed = AvailableImages.speeds.find(s => s.id === state.speedId) || {};
  let brightness = AvailableImages.brightness.find(b => b.id === state.brightnessId) || {};
  let fadingTimer = AvailableImages.fadingTimer.find(f => f.id === state.fadingTimerId) || {};

  let classNames = [speed.className, "fullSize", brightness.className, fadingTimer.className];
  
  return (
    <div className="App">
      <ComponentFromType state={state} show3d={state.show3d} image={image} size="fullSize" speed={speed} classnames={classNames} brightness={brightness}/>
    </div>
  );
}

export default MainPage;
