import * as THREE from 'three';
import * as planet from './planet';
import AvailableImages from '../../AvailableImages.js';

export function init(scene) {

	const solarSystem = {orbits: [], planets: [], lights: {}};

	function addOrbitLine(radius) {
		var geometry = new THREE.RingGeometry(radius, radius + 0.05, 100);
		var material = new THREE.MeshBasicMaterial( { color: 0x666666 } );
		var circle = new THREE.Mesh( geometry, material );
		solarSystem.orbits.push(circle);
	}

	AvailableImages.planets.forEach(p => {
		if (p.type === 'moon') return;

		addOrbitLine(p.simpleDistance);
		solarSystem.planets.push(planet.init(AvailableImages.images.find(i => i.planetId === p.id), scene, p));
	});

	solarSystem.lights.sunLight = new THREE.PointLight(0xffffff, 5, 0, 0);
	solarSystem.lights.sunLight.position.set(0, 0, 0);
	solarSystem.lights.sunLight.castShadow = true;
	solarSystem.lights.ambientLight = new THREE.AmbientLight(0xffffff, 0.1);

	solarSystem.show = () => show(solarSystem, scene);
	solarSystem.hide = () => hide(solarSystem, scene);
	solarSystem.animation = (time, speedTicks) => animation(solarSystem, time, speedTicks);
	solarSystem.shouldShowStarfield = true;
	solarSystem.sideCamera = true;

	return solarSystem;
}

function animation(solarSystem, time, speedTicks) {
	solarSystem.planets.forEach(p => p.animation(time, speedTicks));
}

function hide(solarSystem, scene) {
	if (!scene) return;
	solarSystem.planets.forEach(p => p.hide());
	solarSystem.orbits.forEach(o => scene.remove(o));
	scene.remove(solarSystem.lights.sunLight);
	scene.remove(solarSystem.lights.ambientLight);
}

function show(solarSystem, scene) {
	solarSystem.planets.forEach(p => p.show());
	solarSystem.orbits.forEach(o => scene.add(o));
	scene.add(solarSystem.lights.sunLight);
	scene.add(solarSystem.lights.ambientLight);
}