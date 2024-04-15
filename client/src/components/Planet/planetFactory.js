import * as planet from './planet';
import AvailableImages from '../../AvailableImages.json';
import * as lights from './lights';

export function init(scene) {
	const planet = {};

	planet.animation = (time, speedTicks) => animation(planet, time, speedTicks);
	planet.hide = () => hide(planet);
	planet.show = (image) => show(planet, scene, image);
	planet.shouldShowStarfield = true;
	lights.init(scene);

	return planet;
}

export function animation(planet, time, speedTicks) {
	const objectPlanet = planet.objectPlanet;
	if (!objectPlanet) return;
	objectPlanet.animation(time, speedTicks);
}

export function hide(planet) {
	const objectPlanet = planet.objectPlanet;
	if (!objectPlanet) return;
	objectPlanet.hide();
	lights.hide();
	
}

export function show(ourPlanet, scene, image) {
	const info = AvailableImages.planets.find(p => p.id === image.planetId);

	const objectPlanet = ourPlanet.objectPlanet;
	if (objectPlanet) objectPlanet.hide();

	const overrideInfo = {simpleRadius: 10, axialTilt: 315, simpleDistance: 0, dayDuration: 5};
	ourPlanet.objectPlanet = planet.init(image, scene, {...info, ...overrideInfo});
	ourPlanet.objectPlanet.show()
	lights.show();
}