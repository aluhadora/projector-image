import * as planet from './planet';
import AvailableImages from '../../AvailableImages.json';
import * as lights from './lights';

export function init(scene, state) {
	const planet = {};

	planet.animation = (time, speedTicks) => animation(planet, time, speedTicks);
	planet.hide = () => hide(planet);
	planet.show = (image, state) => show(planet, scene, image, state);
	planet.shouldShowStarfield = true;
	planet.moons = [];
	lights.init(scene);

	return planet;
}

function animation(planet, time, speedTicks) {
	const objectPlanet = planet.objectPlanet;
	if (!objectPlanet) return;
	objectPlanet.animation(time, speedTicks);
	planet.moons.forEach(m => m.animation(time, speedTicks));
}

function hide(planet) {
	const objectPlanet = planet.objectPlanet;
	if (!objectPlanet) return;
	objectPlanet.hide();
	lights.hide();
	planet.moons.forEach(m => m.hide());
	
}

// function show(ourPlanet, scene, image) {
// 	const info = AvailableImages.planets.find(p => p.id === image.planetId);
// 	const moonInfos = AvailableImages.planets.filter(p => p.parentPlanet === image.planetId);

// 	const objectPlanet = ourPlanet.objectPlanet;
// 	ourPlanet.moons.forEach(m => m.hide());
// 	if (objectPlanet) objectPlanet.hide(); 	

// 	const titanOverrideInfo = {simpleRadius: 1, axialTilt: 0, simpleDistance: 15, dayDuration: 5};
// 	const moons = moonInfos.map(m => planet.init(AvailableImages.images.find(i => i.planetId === m.id), scene, {...m, ...titanOverrideInfo}));

// 	ourPlanet.moons = moons;
// 	ourPlanet.moons.forEach(m => m.show());

// 	const overrideInfo = {simpleRadius: 5, axialTilt: 315, simpleDistance: 0, dayDuration: 5};
// 	ourPlanet.objectPlanet = planet.init(image, scene, {...info, ...overrideInfo});
// 	ourPlanet.objectPlanet.show()
// 	lights.show();
// }

function showMoons(ourPlanet, scene, image) {
	const moonInfos = AvailableImages.planets.filter(p => p.parentPlanet === image.planetId);

	const moonOverrideInfo = {simpleRadius: 1, axialTilt: 0, simpleDistance: 15, dayDuration: 5, yearDuration: 60};
	const moons = moonInfos.map(m => planet.init(AvailableImages.images.find(i => i.planetId === m.id), scene, {...m, ...moonOverrideInfo}));

	ourPlanet.moons = moons;
	ourPlanet.moons.forEach(m => m.show());
}

function show(ourPlanet, scene, image, state) {
	const info = AvailableImages.planets.find(p => p.id === image.planetId);

	const objectPlanet = ourPlanet.objectPlanet;
	ourPlanet.moons.forEach(m => m.hide());
	if (objectPlanet) objectPlanet.hide(); 	

	const overrideInfo = {simpleRadius: state.showMoons ? 5 : 10, axialTilt: 315, simpleDistance: 0, dayDuration: 5};
	// const overrideInfo = {simpleRadius: state.showMoons ? 5 : 10, simpleDistance: 0, dayDuration: 5};
	ourPlanet.objectPlanet = planet.init(image, scene, {...info, ...overrideInfo});
	ourPlanet.objectPlanet.show()
	lights.show();

	if (state.showMoons) showMoons(ourPlanet, scene, image);
}