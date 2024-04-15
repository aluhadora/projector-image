import * as planet from './planet';
import AvailableImages from '../../AvailableImages.json';

var scene;
var objectPlanet;

export function init(parentScene) {
	scene = parentScene;
}

export function animation(time, speedTicks) {
	if (!objectPlanet) return;
	objectPlanet.animation(time, speedTicks);
}

export function hide() {
	if (!scene || !objectPlanet) return;
	objectPlanet.hide();
}

export function show(image) {
	if (objectPlanet) objectPlanet.hide();
	const info = AvailableImages.planets.find(p => p.id === image.planetId);
	objectPlanet = planet.init(image, scene, {...info, ...{simpleRadius: 10, axialTilt: 315, simpleDistance: 0, dayDuration: info.dayDuration * 5}});
	objectPlanet.show()
}