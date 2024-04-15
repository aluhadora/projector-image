import * as THREE from 'three';

var lights = {}

export function init(scene) {
	lights.ambient = new THREE.AmbientLight( 0xffffff, .00 );
	lights.point = new THREE.DirectionalLight( 0xffffff, 1 );
	lights.point.castShadow = true;
	lights.ambient.position.set(15, 15, 15);
	lights.point.position.set(50, 10, 15);
	
	scene.add(lights.ambient);
	scene.add(lights.point);
}

export function show() {
	lights.point.intensity = 1;
	lights.ambient.intensity = 0.01;
}

export function hide() {
	lights.point.intensity = 0;
	lights.ambient.intensity = 0;
}