import './App.css';
import { useState } from 'react';
import React from "react";
import ColorsEntry from './components/Yarn/colorsEntry';
import defaultColors from './components/Yarn/defaultColors.json';
import FlowerGenerator from './components/Yarn/flowerGenerator';
import WorkingFlowerList from './components/Yarn/workingFlowerList';

function buildDefaultState() {
  console.log("buildDefaultState");
  const state = defaultColors;
  state.forEach(c => c.weight = 1);
  return state;
}

function getStoredState() {
  return JSON.parse(localStorage.getItem('yarnColors')) || buildDefaultState();
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
    // create a new array with all the flowers except the one we want to remove
    saveFlowersLocal(flowers.map(f => f === flower ? {...f, complete: true} : f), setFlowers);
  }

  const replaceFlower = (flower) => {
    saveFlowersLocal(flowers.map(f => f === flower ? {...f, complete: false} : f), setFlowers);
  }

  const addFlower = (flower) => {
    saveFlowersLocal([...flowers, flower], setFlowers);
  }

  const resetState = () => {
    saveColorsLocal(buildDefaultState(), setColors);
    saveFlowersLocal([], setFlowers);
  }


  if (!colors) return null;

  return (
    <div style={{overflowX: "hidden"}}>
      <ColorsEntry colors={colors} resetState={resetState} />
      <FlowerGenerator colors={colors} setColors={colors => saveColorsLocal(colors, setColors)} addFlower={addFlower} />
      <WorkingFlowerList title="Working List" defaultShow={true} flowers={flowers.filter(f => !f.complete)} removeFlower={removeFlower}/>
      <WorkingFlowerList title="Completed List" defaultShow={false} flowers={flowers.filter(f => f.complete)} replaceFlower={replaceFlower}/>
    </div>
    
  );
}

export default YarnApp;
