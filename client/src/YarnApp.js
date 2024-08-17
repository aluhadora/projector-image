import './App.css';
import { useState } from 'react';
import React from "react";
import MainPage from "./components/MainPage";
import Selector from './components/Selector/Selector';
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

function YarnApp() {
  const [colors, setColors] = useState(getStoredState());
  const [flowers, setFlowers] = useState([]);

  const removeFlower = (flower) => {
    // create a new array with all the flowers except the one we want to remove
    setFlowers(flowers.map(f => f === flower ? {...f, complete: true} : f));
  }

  const replaceFlower = (flower) => {
    setFlowers(flowers.map(f => f === flower ? {...f, complete: false} : f));
  }

  const addFlower = (flower) => {
    setFlowers([...flowers, flower]);
  }

  if (!colors) return null;

  return (
    <div style={{overflowX: "hidden"}}>
      <ColorsEntry colors={colors}/>
      <FlowerGenerator colors={colors} setColors={setColors} addFlower={addFlower} />
      <WorkingFlowerList title="Working List" defaultShow={true} flowers={flowers.filter(f => !f.complete)} removeFlower={removeFlower}/>
      <WorkingFlowerList title="Completed List" defaultShow={false} flowers={flowers.filter(f => f.complete)} replaceFlower={replaceFlower}/>
    </div>
    
  );
}

export default YarnApp;
