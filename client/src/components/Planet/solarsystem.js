import * as THREE from 'three';
import * as planet from './planet';
import AvailableImages from '../../AvailableImages.json';

var scene;
var meshes = {};
var planets = [];
var lights = {};

export function init(parentScene) {

	scene = parentScene;

	function addOrbitLine(radius) {
		var geometry = new THREE.RingGeometry(radius, radius + 0.05, 100);
		var material = new THREE.MeshBasicMaterial( { color: 0x666666 } );
		var circle = new THREE.Mesh( geometry, material );
		meshes.orbits = meshes.orbits || [];
		meshes.orbits.push(circle);
	}

	AvailableImages.planets.forEach(p => {
		if (p.type === 'moon') return;

		addOrbitLine(p.simpleDistance);
		// planets.push(planet.init(p.simpleDistance, AvailableImages.images.find(i => i.planetId === p.id), scene, p.simpleRadius || 1, Math.PI * p.axialTilt / 180));
		planets.push(planet.init(AvailableImages.images.find(i => i.planetId === p.id), scene, p));
	});

	lights.sunLight = new THREE.PointLight(0xffffff, 5, 0, 0);
	lights.sunLight.position.set(0, 0, 0);
	lights.sunLight.castShadow = true;
	lights.ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
}

export function animation(time, speedTicks) {
	planets.forEach(p => p.animation(time, speedTicks));
}

export function hide() {
	if (!scene) return;
	planets.forEach(p => p.hide());
	meshes.orbits.forEach(o => scene.remove(o));
	scene.remove(lights.sunLight);
	scene.remove(lights.ambientLight);
}

export function show() {
	planets.forEach(p => p.show());
	meshes.orbits.forEach(o => scene.add(o));
	scene.add(lights.sunLight);
	scene.add(lights.ambientLight);
}