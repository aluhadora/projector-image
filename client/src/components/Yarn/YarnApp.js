import '../../App.css';
import { useState } from 'react';
import React from "react";
import defaultColors from './defaultColors.json';
import FlowerGenerator from './Flowers/flowerGenerator';
import WorkingFlowerList from './Flowers/workingFlowerList';
import ColorWeights from './Colors/colorWeights';

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
    // const matchingDefault = defaultColors.find(c2 => c2.name === c.name);

    // c.defaultPetalWeight = matchingDefault.defaultPetalWeight;
    // c.defaultMiddleWeight = matchingDefault.defaultMiddleWeight;
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

function getSavedFlowers() {
  var flowers = JSON.parse(localStorage.getItem('yarnFlowers')) || [];
  flowers.forEach((f, i) => {f.index = i; f.editing = false;});
  return flowers;
}

function YarnApp() {
  const [colors, setColors] = useState(getStoredState());
  const [flowers, setFlowers] = useState(getSavedFlowers());

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

  const persistColors = () => {
    saveColorsLocal(colors, setColors);
  }

  const shiftFlower = (flower, shift) => {
    const index = flowers.indexOf(flower);
    if (!canShiftFlower(flower, shift)) return;
    const newFlowers = [...flowers];
    newFlowers[index] = newFlowers[index + shift];
    newFlowers[index + shift] = flower;
    newFlowers.forEach((f, i) => f.index = i);
    saveFlowersLocal(newFlowers, setFlowers);
  }

  const canShiftFlower = (flower, shift) => {
    const filteredFlowers = flowers.filter(f => !!f.complete === !!flower.complete);
    const index = filteredFlowers.indexOf(flower);
    return index + shift >= 0 && index + shift < flowers.length;
  }

  const resetState = () => {
    saveColorsLocal(buildDefaultState(), setColors);
    saveFlowersLocal([], setFlowers);
  }


  if (!colors) return null;

  return (
    <div style={{overflowX: "hidden"}}>
      <FlowerGenerator colors={colors} setColors={colors => saveColorsLocal(colors, setColors)} addFlower={addFlower} />
      <WorkingFlowerList title="Working List" defaultShow={true} flowers={flowers.filter(f => !f.complete)} removeFlower={removeFlower} persistFlowers={persistFlowers} canShiftFlower={canShiftFlower} shiftFlower={shiftFlower} />
      <WorkingFlowerList title="Completed List" defaultShow={false} flowers={flowers.filter(f => f.complete)} replaceFlower={replaceFlower} removeFlower={deleteFlower} persistFlowers={persistFlowers} canShiftFlower={canShiftFlower} shiftFlower={shiftFlower}/>
      <ColorWeights colors={colors} setColors={colors => saveColorsLocal(colors, setColors)} addFlower={addFlower} flowers={flowers} persistColors={persistColors} />
    </div>
    
  );
}

export default YarnApp;
