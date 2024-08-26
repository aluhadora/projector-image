import './App.css';
import { useState } from 'react';
import React from "react";
import ColorsEntry from './components/Yarn/colorsEntry';
import defaultColors from './components/Yarn/defaultColors.json';
import FlowerGenerator from './components/Yarn/flowerGenerator';
import WorkingFlowerList from './components/Yarn/workingFlowerList';
import ColorWeights from './components/Yarn/colorWeights';

function buildDefaultState() {
  console.log("buildDefaultState");
  const state = defaultColors;
  state.forEach(c => c.weight = 1);
  return state;
}

function getStoredState() {
  var colors = JSON.parse(localStorage.getItem('yarnColors')) || buildDefaultState();
  defaultColors.forEach(c => {
    if (!colors.find(c2 => c2.name === c.name)) {
      colors.push(c);
    }
  });

  colors.forEach(c => {
    const matchingDefault = defaultColors.find(c2 => c2.name === c.name);

    c.defaultPetalWeight = matchingDefault.defaultPetalWeight;
    c.defaultMiddleWeight = matchingDefault.defaultMiddleWeight;
    if (!c.weight) c.weight = c.defaultPetalWeight;
  });

  return colors;
  
}

function saveColorsLocal(colors, setColors) {
  localStorage.setItem('yarnColors', JSON.stringify(colors));
  setColors(colors);
}

function saveFlowersLocal(flowers, setFlowers) {
  localStorage.setItem('yarnFlowers', JSON.stringify(flowers));
  setFlowers(flowers);
}

function YarnApp() {
  const [colors, setColors] = useState(getStoredState());
  const [flowers, setFlowers] = useState(JSON.parse(localStorage.getItem('yarnFlowers')) || []);

  const removeFlower = (flower) => {
    saveFlowersLocal(flowers.map(f => f === flower ? {...f, complete: true} : f), setFlowers);
  }

  const replaceFlower = (flower) => {
    saveFlowersLocal(flowers.map(f => f === flower ? {...f, complete: false} : f), setFlowers);
  }

  const addFlower = (flower) => {
    saveFlowersLocal([...flowers, flower], setFlowers);
  }

  const persistFlowers = () => {
    saveFlowersLocal(flowers, setFlowers);
  }

  const deleteFlower = (flower) => {
    saveFlowersLocal(flowers.filter(f => f !== flower), setFlowers);
  }

  const resetState = () => {
    saveColorsLocal(buildDefaultState(), setColors);
    saveFlowersLocal([], setFlowers);
  }


  if (!colors) return null;

  return (
    <div style={{overflowX: "hidden"}}>
      <ColorsEntry colors={colors} resetState={resetState} />
      <ColorWeights colors={colors} setColors={colors => saveColorsLocal(colors, setColors)} addFlower={addFlower} flowers={flowers} />
      <FlowerGenerator colors={colors} setColors={colors => saveColorsLocal(colors, setColors)} addFlower={addFlower} />
      <WorkingFlowerList title="Working List" defaultShow={true} flowers={flowers.filter(f => !f.complete)} removeFlower={removeFlower} persistFlowers={persistFlowers}/>
      <WorkingFlowerList title="Completed List" defaultShow={false} flowers={flowers.filter(f => f.complete)} replaceFlower={replaceFlower} persistFlowers={persistFlowers}/>
    </div>
    
  );
}

export default YarnApp;
