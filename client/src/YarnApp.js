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
    setFlowers(flowers.filter(f => f !== flower));
  }

  const addFlower = (flower) => {
    setFlowers([...flowers, flower]);
  }

  if (!colors) return null;

  return (
    <div>
      <ColorsEntry colors={colors}/>
      <FlowerGenerator colors={colors} setColors={setColors} addFlower={addFlower} />
      <WorkingFlowerList flowers={flowers} removeFlower={removeFlower}/>
    </div>
    
  );
}

export default YarnApp;
