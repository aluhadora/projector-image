import * as THREE from 'three';
import * as planet from './planet';
import AvailableImages from '../../AvailableImages.json';

var scene;
var objectPlanet = {};

export function init(parentScene) {
	scene = parentScene;
	objectPlanet = planet.init(0, AvailableImages.images.find(i => i.planetId === 1), scene, 10);
}

export function animation(time, speedTicks) {
	objectPlanet.animation(time, speedTicks);
}

export function hide() {
	if (!scene || !objectPlanet) return;
	objectPlanet.hide();
}

export function show(image) {
	objectPlanet.hide();
	objectPlanet = planet.init(0, image, scene, 10);
	objectPlanet.show()
}